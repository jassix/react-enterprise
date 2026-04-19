/* eslint-disable */
import type { ConditionalValue } from '../types/index';
import type { DistributiveOmit, Pretty } from '../types/system-types';

interface CommandVariant {
  /**
 * @default "md"
 */
size: "sm" | "md" | "lg"
}

type CommandVariantMap = {
  [key in keyof CommandVariant]: Array<CommandVariant[key]>
}

type CommandSlot = "root" | "inputWrapper" | "input" | "list" | "empty" | "group" | "groupLabel" | "item" | "itemIndicator" | "shortcut" | "separator" | "root" | "inputWrapper" | "input" | "list" | "empty" | "group" | "groupLabel" | "item" | "itemIndicator" | "shortcut" | "separator"

export type CommandVariantProps = {
  [key in keyof CommandVariant]?: ConditionalValue<CommandVariant[key]> | undefined
}

export interface CommandRecipe {
  __slot: CommandSlot
  __type: CommandVariantProps
  (props?: CommandVariantProps): Pretty<Record<CommandSlot, string>>
  raw: (props?: CommandVariantProps) => CommandVariantProps
  variantMap: CommandVariantMap
  variantKeys: Array<keyof CommandVariant>
  splitVariantProps<Props extends CommandVariantProps>(props: Props): [CommandVariantProps, Pretty<DistributiveOmit<Props, keyof CommandVariantProps>>]
  getVariantProps: (props?: CommandVariantProps) => CommandVariantProps
}

/**
 * Luma command palette — searchable action list
 */
export declare const command: CommandRecipe