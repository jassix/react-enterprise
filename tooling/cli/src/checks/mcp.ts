import { join } from "~/util/path";
import * as v from "@repo/std/schema";
import {
	type Check,
	type CheckContext,
	type CheckOutcome,
	fail,
	ok,
	warn,
} from "~/core/check";

const McpServerSchema = v.object({
	command: v.string(),
	args: v.optional(v.array(v.string())),
	env: v.optional(v.record(v.string(), v.string())),
	type: v.optional(v.string()),
});

const McpConfigSchema = v.object({
	mcpServers: v.record(v.string(), McpServerSchema),
});

type McpConfig = v.InferOutput<typeof McpConfigSchema>;

const MCP_PATHS = [
	".mcp.json",
	join(".cursor", "mcp.json"),
	join(".codex", "mcp.json"),
] as const;

type LoadedConfig =
	| { kind: "missing" }
	| { kind: "invalid"; detail: string }
	| { kind: "ok"; config: McpConfig };

async function loadConfig(absPath: string): Promise<LoadedConfig> {
	const file = Bun.file(absPath);
	if (!(await file.exists())) return { kind: "missing" };
	let json: unknown;
	try {
		json = await file.json();
	} catch (e) {
		return { kind: "invalid", detail: `parse error: ${(e as Error).message}` };
	}
	const parsed = v.safeParse(McpConfigSchema, json);
	if (!parsed.success) {
		return {
			kind: "invalid",
			detail: parsed.issues.map((i) => i.message).join("; "),
		};
	}
	return { kind: "ok", config: parsed.output };
}

function configOutcome(rel: string, loaded: LoadedConfig): CheckOutcome {
	if (loaded.kind === "missing") {
		return warn(
			rel,
			`${rel} not found`,
			`create ${rel} with an mcpServers object`,
		);
	}
	if (loaded.kind === "invalid") {
		return fail(
			rel,
			`${rel} failed to parse: ${loaded.detail}`,
			`fix the JSON and schema of ${rel}`,
		);
	}
	const names = Object.keys(loaded.config.mcpServers);
	return ok(rel, `${names.length} server(s): ${names.join(", ")}`);
}

function consistencyOutcome(
	configs: ReadonlyMap<string, McpConfig>,
): CheckOutcome | null {
	if (configs.size < 2) return null;
	const entries = [...configs.entries()];
	const referenceEntry = entries[0] as [string, McpConfig];
	const reference = new Set(Object.keys(referenceEntry[1].mcpServers));

	const drifted: string[] = [];
	for (const [rel, cfg] of entries.slice(1)) {
		const names = new Set(Object.keys(cfg.mcpServers));
		const missingHere = [...reference].filter((n) => !names.has(n));
		const extraHere = [...names].filter((n) => !reference.has(n));
		if (missingHere.length || extraHere.length) {
			drifted.push(
				`${rel} differs (missing: ${missingHere.join(",") || "—"}, extra: ${
					extraHere.join(",") || "—"
				})`,
			);
		}
	}

	if (drifted.length === 0) {
		return ok(
			"consistency",
			`all ${configs.size} MCP configs declare the same servers`,
		);
	}
	return warn(
		"consistency",
		`MCP configs drifted: ${drifted.join("; ")}`,
		"reconcile servers across .mcp.json / .cursor/mcp.json / .codex/mcp.json",
	);
}

function serverCommandsOutcome(
	configs: ReadonlyMap<string, McpConfig>,
): CheckOutcome | null {
	const commands = new Set<string>();
	for (const cfg of configs.values()) {
		for (const server of Object.values(cfg.mcpServers)) {
			commands.add(server.command);
		}
	}
	if (commands.size === 0) return null;

	const missing: string[] = [];
	for (const cmd of commands) {
		if (!Bun.which(cmd)) missing.push(cmd);
	}

	if (missing.length === 0) {
		return ok("server commands", `all on PATH: ${[...commands].join(", ")}`);
	}
	return fail(
		"server commands",
		`missing on PATH: ${missing.join(", ")}`,
		"install the missing binaries (e.g. node/npx via a Node version manager)",
	);
}

export const mcpCheck: Check = {
	id: "mcp",
	section: "mcp",
	async run(ctx: CheckContext): Promise<CheckOutcome[]> {
		const outcomes: CheckOutcome[] = [];
		const configs = new Map<string, McpConfig>();

		for (const rel of MCP_PATHS) {
			const loaded = await loadConfig(join(ctx.root, rel));
			outcomes.push(configOutcome(rel, loaded));
			if (loaded.kind === "ok") configs.set(rel, loaded.config);
		}

		const consistency = consistencyOutcome(configs);
		if (consistency) outcomes.push(consistency);

		const serverCommands = serverCommandsOutcome(configs);
		if (serverCommands) outcomes.push(serverCommands);

		return outcomes;
	},
};
