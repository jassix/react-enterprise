export type PresetId = "kubb";

export const PRESET_IDS = ["kubb"] as const satisfies readonly PresetId[];

export function isPresetId(value: string): value is PresetId {
  return (PRESET_IDS as readonly string[]).includes(value);
}
