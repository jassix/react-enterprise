import { ark } from "@ark-ui/react/factory";
import { css, cx } from "@lume/foundation/css";
import { splitCssProps } from "@lume/foundation/jsx";
import { buttonGroup } from "@lume/foundation/recipes";
import type { HTMLStyledProps } from "@lume/foundation/types";
import type { ComponentProps, FC } from "react";

type GroupVariants = {
	orientation?: "horizontal" | "vertical";
};

export interface ButtonGroupRootProps
	extends
		Omit<HTMLStyledProps<"div">, keyof ComponentProps<"div">>,
		ComponentProps<"div">,
		GroupVariants {}

const Root: FC<ButtonGroupRootProps> = ({ orientation = "horizontal", ref, ...props }) => {
	const [cssProps, restProps] = splitCssProps(props);

	return (
		<ark.div
			ref={ref}
			role="group"
			data-slot="button-group"
			data-orientation={orientation}
			{...restProps}
			className={cx(
				buttonGroup({ orientation }).root,
				css(cssProps),
				props.className,
			)}
		/>
	);
};

Root.displayName = "ButtonGroup";

export interface ButtonGroupTextProps
	extends
		Omit<HTMLStyledProps<"div">, keyof ComponentProps<"div">>,
		ComponentProps<"div">,
		GroupVariants {}

const Text: FC<ButtonGroupTextProps> = ({ orientation, ref, ...props }) => {
	const [cssProps, restProps] = splitCssProps(props);

	return (
		<ark.div
			ref={ref}
			data-slot="button-group-text"
			{...restProps}
			className={cx(buttonGroup({ orientation }).text, css(cssProps), props.className)}
		/>
	);
};

Text.displayName = "ButtonGroupText";

export interface ButtonGroupSeparatorProps
	extends
		Omit<HTMLStyledProps<"div">, keyof ComponentProps<"div">>,
		ComponentProps<"div">,
		GroupVariants {}

const Separator: FC<ButtonGroupSeparatorProps> = ({ orientation, ref, ...props }) => {
	const [cssProps, restProps] = splitCssProps(props);

	return (
		<ark.div
			ref={ref}
			aria-hidden
			data-slot="button-group-separator"
			data-orientation={orientation ?? "vertical"}
			{...restProps}
			className={cx(
				buttonGroup({ orientation }).separator,
				css(cssProps),
				props.className,
			)}
		/>
	);
};

Separator.displayName = "ButtonGroupSeparator";

export const ButtonGroup = Object.assign(Root, {
	Root,
	Text,
	Separator,
});
