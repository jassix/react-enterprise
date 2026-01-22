import { lumeAnimations } from "./animations";
import { lumePreset } from "./preset";
import { lumeRecipes } from "./recipes";
import { lumeSemantic } from "./semantic";
import { lumeTokens } from "./tokens";
import { lumeTextStyles } from "./typography";

export namespace Lume {
	export const preset = lumePreset;
	export const tokens = lumeTokens;
	export const semantic = lumeSemantic;
	export const textStyles = lumeTextStyles;
	export const animations = lumeAnimations;
	export const recipes = lumeRecipes;
}

export default Lume;

export * from "./utilities";
export { lumeAnimations, lumePreset, lumeRecipes, lumeSemantic, lumeTextStyles, lumeTokens };

