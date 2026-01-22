import { definePreset } from "@pandacss/dev";
import { lumeAnimations } from "./animations";
import { lumeRecipes } from "./recipes";
import { lumeSemantic } from "./semantic";
import { lumeTokens } from "./tokens";
import { lumeTextStyles } from "./typography";

export const lumePreset = definePreset({
	name: "lume/foundation",
	theme: {
		recipes: {
			...lumeRecipes,
		},
		extend: {
			tokens: {
				...lumeTokens,
				durations: lumeAnimations.durations,
				easings: lumeAnimations.easings,
			},
			semanticTokens: lumeSemantic,
			textStyles: lumeTextStyles,
			recipes: lumeRecipes,
			keyframes: lumeAnimations.keyframes,
		},
	},
});
