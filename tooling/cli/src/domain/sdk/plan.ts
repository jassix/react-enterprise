import type { PluginId } from "~/domain/sdk/plugin";
import type { PresetId } from "~/domain/sdk/preset";
import type { SpecSource } from "~/domain/sdk/spec-source";

export interface SdkPlan {
  readonly name: string;
  readonly preset: PresetId;
  readonly plugins: readonly PluginId[];
  readonly spec: SpecSource;
  readonly install: boolean;
  readonly generate: boolean;
}
