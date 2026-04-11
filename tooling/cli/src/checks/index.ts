import type { Check } from "~/core/check";
import { bunCheck } from "./bun";
import { lefthookCheck } from "./lefthook";
import { mcpCheck } from "./mcp";
import { skillsCheck } from "./skills";
import { toolingCheck } from "./tooling";

export const defaultChecks: readonly Check[] = [
	bunCheck,
	skillsCheck,
	mcpCheck,
	lefthookCheck,
	toolingCheck,
];
