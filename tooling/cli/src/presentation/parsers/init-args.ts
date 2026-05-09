import { isValidSdkName } from "~/domain/sdk/name";

export type ClassicScaffoldType = "app" | "package" | "tooling";

const VALID_TYPES: readonly ClassicScaffoldType[] = ["app", "package", "tooling"];

export interface ClassicInitArgs {
  readonly type: ClassicScaffoldType;
  readonly name: string;
  readonly skipInstall: boolean;
}

export type ClassicInitParseResult = ClassicInitArgs | { readonly error: string };

export const CLASSIC_INIT_USAGE = "usage: repo init <app|package|tooling> <name> [--no-install]";

export function parseClassicInitArgs(argv: readonly string[]): ClassicInitParseResult {
  const positional: string[] = [];
  const flags: string[] = [];
  for (const arg of argv) {
    if (arg.startsWith("--")) flags.push(arg);
    else positional.push(arg);
  }
  const [type, name, ...extra] = positional;

  if (extra.length > 0) {
    return { error: `unexpected arguments: ${extra.join(" ")}\n${CLASSIC_INIT_USAGE}` };
  }
  if (!type || !name) {
    return { error: CLASSIC_INIT_USAGE };
  }
  if (!(VALID_TYPES as readonly string[]).includes(type)) {
    return {
      error: `invalid type "${type}" — expected one of: ${VALID_TYPES.join(", ")}`,
    };
  }
  if (!isValidSdkName(name)) {
    return {
      error: `invalid name "${name}" — must be kebab-case (lowercase letters, digits, hyphens; start with a letter)`,
    };
  }
  for (const flag of flags) {
    if (flag !== "--no-install") {
      return { error: `unknown flag: ${flag}\n${CLASSIC_INIT_USAGE}` };
    }
  }
  return {
    type: type as ClassicScaffoldType,
    name,
    skipInstall: flags.includes("--no-install"),
  };
}
