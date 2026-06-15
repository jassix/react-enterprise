import { match } from "@repo/std/match";
import {
  addRegistry,
  loadRegistryConfig,
  removeRegistry,
  saveRegistryConfig,
} from "~/application/usecases/registry-config";
import { loadCatalogOrEmpty, loadRemoteCatalog } from "~/application/usecases/remote-catalog";
import { listNamespaces } from "~/domain/registry-config";
import type { RegistryConfig } from "~/domain/registry-config";
import { searchCatalog } from "~/domain/remote-registry";
import { createColors } from "~/infrastructure/colors";
import type { Command } from "~/presentation/command";
import type { CommandDeps } from "~/presentation/deps";
import { renderError } from "~/presentation/ui/format-error";

const USAGE = [
  "usage: repo registry <list|add|remove|search|refresh> [args]",
  "  repo registry list",
  "  repo registry add @<namespace> <url-template-with-{name}>",
  "  repo registry remove @<namespace>",
  "  repo registry search <query>",
  "  repo registry refresh",
].join("\n");

export function createRegistryCommand(deps: CommandDeps): Command {
  return {
    name: "registry",
    summary: "manage component registries used by `repo add`",
    async run(argv) {
      let rootDir: string;
      try {
        rootDir = await deps.locator.locate(process.cwd());
      } catch (error) {
        return renderError(deps.output, error instanceof Error ? error.message : String(error));
      }

      const sub = argv[0];
      if (!sub) {
        deps.output.writeOut(`${USAGE}\n`);
        return 1;
      }

      const loaded = await loadRegistryConfig(deps.fs, rootDir);
      if (loaded.isErr()) {
        const e = loaded.unwrapErr();
        return renderError(
          deps.output,
          e.kind === "invalid"
            ? `invalid registries.json: ${e.messages.join("; ")}`
            : `failed to read registries.json: ${String(e.cause)}`,
        );
      }
      const config = loaded.unwrap();

      if (sub === "list") return runList(deps, config, rootDir);
      if (sub === "add") return runAdd(deps, rootDir, config, argv.slice(1));
      if (sub === "remove" || sub === "rm") return runRemove(deps, rootDir, config, argv.slice(1));
      if (sub === "search") return runSearch(deps, rootDir, argv.slice(1));
      if (sub === "refresh") return runRefresh(deps, rootDir);

      deps.output.writeOut(`${USAGE}\n`);
      return 1;
    },
  };
}

async function runList(deps: CommandDeps, config: RegistryConfig, rootDir: string): Promise<0> {
  const c = createColors();
  const bold = (t: string) => c.wrap("bold", t);
  const dim = (t: string) => c.wrap("dim", t);
  const cyan = (t: string) => c.wrap("cyan", t);

  const catalog = await loadCatalogOrEmpty({ fs: deps.fs, fetcher: deps.fetcher }, rootDir);
  const customCount = listNamespaces(config).length;

  deps.prompter.intro(`${cyan(bold("repo registry"))}  ${dim("known component registries")}`);

  const localLines: string[] = [
    `${cyan("@shadcn")}  ${dim("https://ui.shadcn.com/r/styles/default/{name}.json")}  ${dim("(builtin)")}`,
  ];
  for (const ns of listNamespaces(config)) {
    const url = config.registries[ns];
    localLines.push(`${cyan(ns)}  ${dim(url ?? "")}  ${dim("(local)")}`);
  }
  deps.prompter.note(localLines.join("\n"), "Local + builtin");

  if (catalog.length > 0) {
    deps.prompter.note(
      `${dim(`${catalog.length} registries from shadcn catalog (cached). Search with:`)} ${cyan("repo registry search <query>")}`,
      "Remote catalog",
    );
  } else {
    deps.prompter.note(
      `${dim("No catalog cache yet. Run")} ${cyan("repo registry refresh")} ${dim("to fetch from shadcn.")}`,
      "Remote catalog",
    );
  }

  deps.prompter.outro(
    `${c.wrap("green", bold("✓"))}  ${dim(`${customCount} local + 1 builtin + ${catalog.length} catalog`)}`,
  );
  return 0;
}

async function runAdd(
  deps: CommandDeps,
  rootDir: string,
  config: RegistryConfig,
  args: readonly string[],
): Promise<number> {
  const namespace = args[0];
  const urlTemplate = args[1];
  if (!namespace || !urlTemplate) {
    deps.output.writeOut(`${USAGE}\n`);
    return 1;
  }
  if (namespace === "@shadcn") {
    return renderError(deps.output, "@shadcn is reserved (builtin)");
  }

  const updated = addRegistry(config, namespace, urlTemplate);
  if (updated.isErr()) {
    const detail = match(updated.unwrapErr())
      .with(
        { kind: "invalid-namespace" },
        ({ namespace: ns }) => `invalid namespace '${ns}' — must match @<lowercase-ident>`,
      )
      .with({ kind: "missing-placeholder" }, () => `url template must contain '{name}' placeholder`)
      .with({ kind: "invalid-url" }, ({ url }) => `invalid url template: ${url}`)
      .exhaustive();
    return renderError(deps.output, detail);
  }

  const saved = await saveRegistryConfig(deps.fs, rootDir, updated.unwrap());
  if (saved.isErr()) {
    return renderError(
      deps.output,
      `failed to save registries.json: ${String(saved.unwrapErr().cause)}`,
    );
  }

  const c = createColors();
  deps.output.writeOut(
    `${c.wrap("green", "✓")} added ${c.wrap("cyan", namespace)} → ${c.wrap("dim", urlTemplate)}\n`,
  );
  return 0;
}

async function runRemove(
  deps: CommandDeps,
  rootDir: string,
  config: RegistryConfig,
  args: readonly string[],
): Promise<number> {
  const namespace = args[0];
  if (!namespace) {
    deps.output.writeOut(`${USAGE}\n`);
    return 1;
  }
  if (namespace === "@shadcn") {
    return renderError(deps.output, "@shadcn is reserved (builtin)");
  }

  const { config: next, removed } = removeRegistry(config, namespace);
  if (!removed) {
    return renderError(deps.output, `namespace not found: ${namespace}`);
  }

  const saved = await saveRegistryConfig(deps.fs, rootDir, next);
  if (saved.isErr()) {
    return renderError(
      deps.output,
      `failed to save registries.json: ${String(saved.unwrapErr().cause)}`,
    );
  }

  const c = createColors();
  deps.output.writeOut(`${c.wrap("green", "✓")} removed ${c.wrap("cyan", namespace)}\n`);
  return 0;
}

async function runSearch(
  deps: CommandDeps,
  rootDir: string,
  args: readonly string[],
): Promise<number> {
  const query = args.join(" ").trim();
  if (query.length === 0) {
    deps.output.writeOut("usage: repo registry search <query>\n");
    return 1;
  }

  const c = createColors();
  const bold = (t: string) => c.wrap("bold", t);
  const dim = (t: string) => c.wrap("dim", t);
  const cyan = (t: string) => c.wrap("cyan", t);

  const catalog = await loadCatalogOrEmpty({ fs: deps.fs, fetcher: deps.fetcher }, rootDir);
  if (catalog.length === 0) {
    return renderError(
      deps.output,
      "no catalog cache. Run `repo registry refresh` first (needs network).",
    );
  }

  const matches = searchCatalog(catalog, query).slice(0, 25);
  deps.prompter.intro(
    `${cyan(bold("repo registry search"))}  ${dim(`'${query}' — ${matches.length} of ${catalog.length}`)}`,
  );

  if (matches.length === 0) {
    deps.prompter.outro(c.wrap("yellow", "no matches"));
    return 0;
  }

  const lines: string[] = [];
  for (const entry of matches) {
    lines.push(cyan(bold(entry.name)));
    if (entry.description) lines.push(`  ${dim(truncate(entry.description, 100))}`);
    lines.push(`  ${dim(entry.url)}`);
    if (entry.homepage) lines.push(`  ${dim(entry.homepage)}`);
    lines.push("");
  }
  deps.prompter.note(lines.join("\n").trimEnd(), "Matches");
  deps.prompter.outro(
    `${c.wrap("green", "✓")}  ${dim("install with")} ${cyan("repo add <namespace>/<name>")}`,
  );
  return 0;
}

async function runRefresh(deps: CommandDeps, rootDir: string): Promise<number> {
  const c = createColors();
  const bold = (t: string) => c.wrap("bold", t);
  const dim = (t: string) => c.wrap("dim", t);
  const cyan = (t: string) => c.wrap("cyan", t);

  deps.prompter.intro(`${cyan(bold("repo registry refresh"))}  ${dim("fetching shadcn catalog…")}`);
  const r = await loadRemoteCatalog({ fs: deps.fs, fetcher: deps.fetcher }, rootDir, {
    forceRefresh: true,
  });
  if (r.isErr()) {
    const e = r.unwrapErr();
    const detail =
      e.kind === "invalid-payload"
        ? `invalid catalog payload: ${e.messages.join("; ")}`
        : `transport error: ${String(e.cause)}`;
    return renderError(deps.output, detail);
  }
  const catalog = r.unwrap();
  deps.prompter.outro(
    `${c.wrap("green", bold("✓"))}  ${dim(`${catalog.length} registries cached`)}`,
  );
  return 0;
}

function truncate(s: string, max: number): string {
  return s.length <= max ? s : `${s.slice(0, max - 1)}…`;
}
