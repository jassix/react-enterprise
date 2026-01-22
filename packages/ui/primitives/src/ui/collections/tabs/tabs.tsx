import { Tabs as TabsPrimitive } from "@ark-ui/react/tabs";
import { css, cx } from "@lume/foundation/css";
import { splitCssProps } from "@lume/foundation/jsx";
import { tabs } from "@lume/foundation/recipes";
import type { HTMLStyledProps } from "@lume/foundation/types";
import type { FC } from "react";

export interface TabsRootProps
	extends Omit<HTMLStyledProps<"div">, keyof TabsPrimitive.RootBaseProps>,
		TabsPrimitive.RootBaseProps {
	variant?: "line" | "enclosed" | "unstyled";
	size?: "sm" | "md" | "lg";
}

const Root: FC<TabsRootProps> = ({ variant, size, ...props }) => {
	const [cssProps, restProps] = splitCssProps(props);

	return (
		<TabsPrimitive.Root
			{...restProps}
			className={cx(tabs({ variant, size }).root, css(cssProps), props.className)}
		/>
	);
};

export interface TabsListProps
	extends Omit<HTMLStyledProps<"div">, keyof TabsPrimitive.ListBaseProps>,
		TabsPrimitive.ListBaseProps {
	variant?: "line" | "enclosed" | "unstyled";
	size?: "sm" | "md" | "lg";
}

const List: FC<TabsListProps> = ({ variant, size, ...props }) => {
	const [cssProps, restProps] = splitCssProps(props);

	return (
		<TabsPrimitive.List
			{...restProps}
			className={cx(tabs({ variant, size }).list, css(cssProps), props.className)}
		/>
	);
};

export interface TabsTriggerProps
	extends Omit<HTMLStyledProps<"button">, keyof TabsPrimitive.TriggerBaseProps>,
		TabsPrimitive.TriggerBaseProps {
	variant?: "line" | "enclosed" | "unstyled";
	size?: "sm" | "md" | "lg";
}

const Trigger: FC<TabsTriggerProps> = ({ variant, size, ...props }) => {
	const [cssProps, restProps] = splitCssProps(props);

	return (
		<TabsPrimitive.Trigger
			{...restProps}
			className={cx(tabs({ variant, size }).trigger, css(cssProps), props.className)}
		/>
	);
};

export interface TabsContentProps
	extends Omit<HTMLStyledProps<"div">, keyof TabsPrimitive.ContentBaseProps>,
		TabsPrimitive.ContentBaseProps {
	variant?: "line" | "enclosed" | "unstyled";
	size?: "sm" | "md" | "lg";
}

const Content: FC<TabsContentProps> = ({ variant, size, ...props }) => {
	const [cssProps, restProps] = splitCssProps(props);

	return (
		<TabsPrimitive.Content
			{...restProps}
			className={cx(tabs({ variant, size }).content, css(cssProps), props.className)}
		/>
	);
};

export interface TabsIndicatorProps
	extends Omit<HTMLStyledProps<"div">, keyof TabsPrimitive.IndicatorBaseProps>,
		TabsPrimitive.IndicatorBaseProps {
	variant?: "line" | "enclosed" | "unstyled";
	size?: "sm" | "md" | "lg";
}

const Indicator: FC<TabsIndicatorProps> = ({ variant, size, ...props }) => {
	const [cssProps, restProps] = splitCssProps(props);

	return (
		<TabsPrimitive.Indicator
			{...restProps}
			className={cx(tabs({ variant, size }).indicator, css(cssProps), props.className)}
		/>
	);
};

export const Tabs = Object.assign(Root, {
	Root,
	List,
	Trigger,
	Content,
	Indicator,
});

