import { isValidSdkName } from "~/domain/sdk/name";
import { isPluginId, PLUGIN_IDS, type PluginId } from "~/domain/sdk/plugin";
import { isPresetId, type PresetId } from "~/domain/sdk/preset";
import type { SpecSource } from "~/domain/sdk/spec-source";

export interface SdkParsedArgs {
  readonly name: string | undefined;
  readonly preset: PresetId | undefined;
  readonly plugins: readonly PluginId[] | undefined;
  readonly spec: SpecSource | undefined;
  readonly install: boolean | undefined;
  readonly generate: boolean | undefined;
  readonly yes: boolean;
}

export type SdkParseResult = SdkParsedArgs | { readonly error: string };

export const SDK_USAGE =
  "usage: repo init sdk [<name>] [--preset=kubb] [--spec=<path|url>] [--plugins=ts,client,...] [--generate] [--no-install] [--yes]";

export function parseSdkArgs(argv: readonly string[]): SdkParseResult {
  const positional: string[] = [];
  const flags: string[] = [];
  for (const arg of argv) {
    if (arg.startsWith("--") || arg.startsWith("-")) flags.push(arg);
    else positional.push(arg);
  }

  const [name, ...rest] = positional;
  if (rest.length > 0) {
    return { error: `unexpected arguments: ${rest.join(" ")}\n${SDK_USAGE}` };
  }
  if (name !== undefined && !isValidSdkName(name)) {
    return {
      error: `invalid name "${name}" — must be kebab-case (lowercase letters, digits, hyphens; start with a letter)`,
    };
  }

  let preset: PresetId | undefined;
  let plugins: readonly PluginId[] | undefined;
  let spec: SpecSource | undefined;
  let install: boolean | undefined;
  let generate: boolean | undefined;
  let yes = false;

  for (const flag of flags) {
    if (flag === "--no-install") {
      install = false;
      continue;
    }
    if (flag === "--install") {
      install = true;
      continue;
    }
    if (flag === "--generate") {
      generate = true;
      continue;
    }
    if (flag === "--no-generate") {
      generate = false;
      continue;
    }
    if (flag === "--yes" || flag === "-y") {
      yes = true;
      continue;
    }
    const eq = flag.indexOf("=");
    if (eq === -1) {
      return { error: `unknown flag: ${flag}\n${SDK_USAGE}` };
    }
    const key = flag.slice(0, eq);
    const value = flag.slice(eq + 1);
    if (key === "--preset") {
      if (!isPresetId(value)) {
        return { error: `unknown preset "${value}" — available: kubb` };
      }
      preset = value;
      continue;
    }
    if (key === "--plugins") {
      const ids = value
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
      for (const id of ids) {
        if (!isPluginId(id)) {
          return {
            error: `unknown plugin "${id}" — available: ${PLUGIN_IDS.join(", ")}`,
          };
        }
      }
      plugins = ids as readonly PluginId[];
      continue;
    }
    if (key === "--spec") {
      if (!value) return { error: `--spec requires a value\n${SDK_USAGE}` };
      spec = /^https?:\/\//i.test(value)
        ? { kind: "url", url: value }
        : { kind: "file", path: value };
      continue;
    }
    return { error: `unknown flag: ${key}\n${SDK_USAGE}` };
  }

  return { name, preset, plugins, spec, install, generate, yes };
}

export function allRequiredPresent(p: SdkParsedArgs): boolean {
  return p.name !== undefined && p.spec !== undefined;
}
