import { isCancelled, type Prompter } from "~/application/ports/prompter";
import { isValidSdkName } from "~/domain/sdk/name";
import type { SdkPlan } from "~/domain/sdk/plan";
import { PLUGIN_IDS, PLUGINS, type PluginId } from "~/domain/sdk/plugin";
import { type PresetId, PRESET_IDS } from "~/domain/sdk/preset";
import type { SpecSource } from "~/domain/sdk/spec-source";

export interface SdkPlanInput {
  readonly name: string | undefined;
  readonly preset: PresetId | undefined;
  readonly plugins: readonly PluginId[] | undefined;
  readonly spec: SpecSource | undefined;
  readonly install: boolean | undefined;
  readonly generate: boolean | undefined;
}

export interface BuildPlanDeps {
  readonly prompter: Prompter;
}

const DEFAULT_PRESET: PresetId = "kubb";
const DEFAULT_PLUGINS: readonly PluginId[] = PLUGIN_IDS.filter((id) => PLUGINS[id].defaultSelected);
const DEFAULT_SPEC: SpecSource = { kind: "placeholder" };

export interface BuildPlanRequest {
  readonly input: SdkPlanInput;
  readonly interactive: boolean;
}

export async function buildSdkPlan(req: BuildPlanRequest, deps: BuildPlanDeps): Promise<SdkPlan> {
  if (!req.interactive) return planFromInput(req.input);

  const name = req.input.name ?? (await promptName(deps.prompter));
  const preset = req.input.preset ?? (await promptPreset(deps.prompter));
  const spec = req.input.spec ?? (await promptSpec(deps.prompter));
  const plugins = req.input.plugins ?? (await promptPlugins(deps.prompter));
  const install = req.input.install ?? (await promptInstall(deps.prompter));
  const generate = req.input.generate ?? (await promptGenerate(deps.prompter, install));
  return { name, preset, spec, plugins, install, generate };
}

function planFromInput(input: SdkPlanInput): SdkPlan {
  if (input.name === undefined) {
    throw new Error("missing required argument: <name>");
  }
  return {
    name: input.name,
    preset: input.preset ?? DEFAULT_PRESET,
    plugins: input.plugins ?? DEFAULT_PLUGINS,
    spec: input.spec ?? DEFAULT_SPEC,
    install: input.install ?? true,
    generate: input.generate ?? false,
  };
}

async function promptName(prompter: Prompter): Promise<string> {
  const value = await prompter.text({
    message: "SDK name",
    placeholder: "petstore",
    validate(input) {
      if (!input) return "Required.";
      if (!isValidSdkName(input)) {
        return "Use kebab-case: lowercase letters, digits, hyphens; starts with a letter.";
      }
      return undefined;
    },
  });
  if (isCancelled(value)) prompter.cancel();
  return value;
}

async function promptPreset(prompter: Prompter): Promise<PresetId> {
  if (PRESET_IDS.length === 1) return PRESET_IDS[0]!;
  const value = await prompter.select<PresetId>({
    message: "Preset",
    options: [{ value: "kubb", label: "kubb (OpenAPI → typed client + hooks)" }],
  });
  if (isCancelled(value)) prompter.cancel();
  return value;
}

async function promptSpec(prompter: Prompter): Promise<SpecSource> {
  const kind = await prompter.select<SpecSource["kind"]>({
    message: "OpenAPI spec source",
    options: [
      { value: "file", label: "Local file", hint: "path to a yml/json on disk" },
      { value: "url", label: "Remote URL", hint: "fetched once, snapshotted into the package" },
      { value: "placeholder", label: "Skip", hint: "use a placeholder; fill in later" },
    ],
  });
  if (isCancelled(kind)) prompter.cancel();

  if (kind === "file") {
    const path = await prompter.text({
      message: "Path to spec file",
      placeholder: "./specs/petstore.yml",
      validate: (v) => (v ? undefined : "Required."),
    });
    if (isCancelled(path)) prompter.cancel();
    return { kind: "file", path };
  }
  if (kind === "url") {
    const url = await prompter.text({
      message: "Spec URL",
      placeholder: "https://petstore3.swagger.io/api/v3/openapi.json",
      validate(v) {
        if (!v) return "Required.";
        if (!/^https?:\/\//.test(v)) return "Must start with http:// or https://";
        return undefined;
      },
    });
    if (isCancelled(url)) prompter.cancel();
    return { kind: "url", url };
  }
  return { kind: "placeholder" };
}

async function promptPlugins(prompter: Prompter): Promise<readonly PluginId[]> {
  const value = await prompter.multiselect<PluginId>({
    message: "Which kubb plugins?",
    initialValues: DEFAULT_PLUGINS,
    options: PLUGIN_IDS.map((id) => ({
      value: id,
      label: PLUGINS[id].label,
      hint: PLUGINS[id].hint,
    })),
  });
  if (isCancelled(value)) prompter.cancel();
  return value;
}

async function promptInstall(prompter: Prompter): Promise<boolean> {
  const value = await prompter.confirm({ message: "Run bun install?", initialValue: true });
  if (isCancelled(value)) prompter.cancel();
  return value;
}

async function promptGenerate(prompter: Prompter, defaultValue: boolean): Promise<boolean> {
  const value = await prompter.confirm({
    message: "Run codegen now?",
    initialValue: defaultValue,
  });
  if (isCancelled(value)) prompter.cancel();
  return value;
}
