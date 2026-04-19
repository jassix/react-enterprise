import { ark } from "@ark-ui/react/factory";
import { css, cx } from "@lume/foundation/css";
import { splitCssProps } from "@lume/foundation/jsx";
import { alert } from "@lume/foundation/recipes";
import type { HTMLStyledProps } from "@lume/foundation/types";
import type { ComponentProps, FC } from "react";

type AlertVariantProps = {
	variant?: "default" | "destructive" | "subtle" | "solid" | "outline";
	status?: "info" | "positive" | "caution" | "critical";
};

export interface AlertProps
	extends
		Omit<HTMLStyledProps<"div">, keyof ComponentProps<"div">>,
		ComponentProps<"div">,
		AlertVariantProps {}

const Root: FC<AlertProps> = ({ status, variant, ref, ...props }) => {
	const [cssProps, restProps] = splitCssProps(props);

	return (
		<ark.div
			ref={ref}
			data-slot="alert"
			role="alert"
			{...restProps}
			className={cx(alert({ status, variant }).root, css(cssProps), props.className)}
		/>
	);
};

Root.displayName = "Alert";

export interface AlertTitleProps extends ComponentProps<"div"> {}

const Title: FC<AlertTitleProps> = ({ className, ...props }) => (
	<div
		data-slot="alert-title"
		{...props}
		className={cx(alert().title, className)}
	/>
);

Title.displayName = "AlertTitle";

export interface AlertDescriptionProps extends ComponentProps<"div"> {}

const Description: FC<AlertDescriptionProps> = ({ className, ...props }) => (
	<div
		data-slot="alert-description"
		{...props}
		className={cx(alert().description, className)}
	/>
);

Description.displayName = "AlertDescription";

export interface AlertActionProps extends ComponentProps<"div"> {}

const Action: FC<AlertActionProps> = ({ className, ...props }) => (
	<div
		data-slot="alert-action"
		{...props}
		className={cx(alert().action, className)}
	/>
);

Action.displayName = "AlertAction";

export const Alert = Object.assign(Root, {
	Root,
	Title,
	Description,
	Action,
});
