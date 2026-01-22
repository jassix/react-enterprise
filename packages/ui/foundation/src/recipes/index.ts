import { accordionRecipe } from "./accordion.recipe";
import { alertRecipe } from "./alert.recipe";
import { avatarRecipe } from "./avatar.recipe";
import { badgeRecipe } from "./badge.recipe";
import { buttonRecipe } from "./button.recipe";
import { cardRecipe } from "./card.recipe";
import { checkboxRecipe } from "./checkbox.recipe";
import { dialogRecipe } from "./dialog.recipe";
import { inputRecipe } from "./input.recipe";
import { menuRecipe } from "./menu.recipe";
import { popoverRecipe } from "./popover.recipe";
import { progressRecipe } from "./progress.recipe";
import { radioGroupRecipe } from "./radio-group.recipe";
import { selectRecipe } from "./select.recipe";
import { skeletonRecipe } from "./skeleton.recipe";
import { sliderRecipe } from "./slider.recipe";
import { switchRecipe } from "./switch.recipe";
import { tabsRecipe } from "./tabs.recipe";
import { tooltipRecipe } from "./tooltip.recipe";

export const lumeRecipes = {
	accordion: accordionRecipe,
	alert: alertRecipe,
	avatar: avatarRecipe,
	badge: badgeRecipe,
	button: buttonRecipe,
	card: cardRecipe,
	checkbox: checkboxRecipe,
	dialog: dialogRecipe,
	input: inputRecipe,
	menu: menuRecipe,
	popover: popoverRecipe,
	progress: progressRecipe,
	radioGroup: radioGroupRecipe,
	select: selectRecipe,
	skeleton: skeletonRecipe,
	slider: sliderRecipe,
	switch: switchRecipe,
	tabs: tabsRecipe,
	tooltip: tooltipRecipe,
} as const;

export {
	accordionRecipe,
	alertRecipe,
	avatarRecipe,
	badgeRecipe,
	buttonRecipe,
	cardRecipe,
	checkboxRecipe,
	dialogRecipe,
	inputRecipe,
	menuRecipe,
	popoverRecipe,
	progressRecipe,
	radioGroupRecipe,
	selectRecipe,
	skeletonRecipe,
	sliderRecipe,
	switchRecipe,
	tabsRecipe,
	tooltipRecipe
};

