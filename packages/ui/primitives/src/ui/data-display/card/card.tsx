import { ark } from "@ark-ui/react/factory";
import { css, cx } from "@lume/foundation/css";
import { splitCssProps } from "@lume/foundation/jsx";
import { card } from "@lume/foundation/recipes";
import type { HTMLStyledProps } from "@lume/foundation/types";
import type { ComponentProps, FC } from "react";

type CardVariantProps = {
	size?: "sm" | "md";
	interactive?: boolean;
};

export interface CardProps
	extends
		Omit<HTMLStyledProps<"div">, keyof ComponentProps<"div">>,
		ComponentProps<"div">,
		CardVariantProps {}

const Root: FC<CardProps> = ({ size, interactive, ref, ...props }) => {
	const [cssProps, restProps] = splitCssProps(props);

	return (
		<ark.div
			ref={ref}
			data-slot="card"
			data-size={size ?? "md"}
			{...restProps}
			className={cx(
				card({ size, interactive }).root,
				css(cssProps),
				props.className,
			)}
		/>
	);
};

Root.displayName = "Card";

export interface CardHeaderProps extends ComponentProps<"div"> {
	size?: CardVariantProps["size"];
}

const Header: FC<CardHeaderProps> = ({ size, className, ...props }) => (
	<div
		data-slot="card-header"
		{...props}
		className={cx(card({ size }).header, className)}
	/>
);

Header.displayName = "CardHeader";

export interface CardTitleProps extends ComponentProps<"div"> {
	size?: CardVariantProps["size"];
}

const Title: FC<CardTitleProps> = ({ size, className, ...props }) => (
	<div
		data-slot="card-title"
		{...props}
		className={cx(card({ size }).title, className)}
	/>
);

Title.displayName = "CardTitle";

export interface CardDescriptionProps extends ComponentProps<"div"> {
	size?: CardVariantProps["size"];
}

const Description: FC<CardDescriptionProps> = ({ size, className, ...props }) => (
	<div
		data-slot="card-description"
		{...props}
		className={cx(card({ size }).description, className)}
	/>
);

Description.displayName = "CardDescription";

export interface CardActionProps extends ComponentProps<"div"> {
	size?: CardVariantProps["size"];
}

const Action: FC<CardActionProps> = ({ size, className, ...props }) => (
	<div
		data-slot="card-action"
		{...props}
		className={cx(card({ size }).action, className)}
	/>
);

Action.displayName = "CardAction";

export interface CardContentProps extends ComponentProps<"div"> {
	size?: CardVariantProps["size"];
}

const Content: FC<CardContentProps> = ({ size, className, ...props }) => (
	<div
		data-slot="card-content"
		{...props}
		className={cx(card({ size }).content, className)}
	/>
);

Content.displayName = "CardContent";

export interface CardFooterProps extends ComponentProps<"div"> {
	size?: CardVariantProps["size"];
}

const Footer: FC<CardFooterProps> = ({ size, className, ...props }) => (
	<div
		data-slot="card-footer"
		{...props}
		className={cx(card({ size }).footer, className)}
	/>
);

Footer.displayName = "CardFooter";

export const Card = Object.assign(Root, {
	Root,
	Header,
	Title,
	Description,
	Action,
	Content,
	Footer,
});
