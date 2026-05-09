import { bunCheck } from "~/application/checks/bun";
import type { CheckRunner } from "~/application/checks/context";
import { lefthookCheck } from "~/application/checks/lefthook";
import { mcpCheck } from "~/application/checks/mcp";
import { skillsCheck } from "~/application/checks/skills";
import { toolingCheck } from "~/application/checks/tooling";

export const defaultChecks: readonly CheckRunner[] = [
  bunCheck,
  skillsCheck,
  mcpCheck,
  lefthookCheck,
  toolingCheck,
];
