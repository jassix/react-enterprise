import { ToggleGroup as ToggleGroupPrimitive } from "@ark-ui/react/toggle-group";
import { css, cx } from "@lume/foundation/css";
import { splitCssProps } from "@lume/foundation/jsx";
import { toggle, toggleGroup } from "@lume/foundation/recipes";
import type { HTMLStyledProps } from "@lume/foundation/types";
import { createContext, type FC, use } from "react"
import type { PropsWithChildren } from "react";

type ToggleGroupVariants = {
	orientation?: "horizontal" | "vertical";
	variant?: "default" | "outline";
	size?: "xs" | "sm" | "md" | "lg";
	attached?: boolean;
};

/**
 * Distributes group-level variants (size, variant, orientation, attached) to
 * nested `ToggleGroup.Item` instances so consumers only declare them once at
 * the Root. Items can still override per-instance by passing their own props.
 */
const ToggleGroupContext = createContext<ToggleGroupVariants>({});

export interface ToggleGroupRootProps
	extends
		
		PropsWithChildren,
		Omit<HTMLStyledProps<"div">, keyof ToggleGroupPrimitive.RootBaseProps>,
		Omit<ToggleGroupPrimitive.RootBaseProps, "orientation">,
		ToggleGroupVariants {}

const Root: FC<ToggleGroupRootProps> = ({
	orientation = "horizontal",
	variant = "default",
	size = "md",
	attached = true,
	ref,
	...props
}) => {
	const [cssProps, restProps] = splitCssProps(props);

	return (
		<ToggleGroupContext.Provider value={{ orientation, variant, size, attached }}>
			<ToggleGroupPrimitive.Root
				ref={ref}
				orientation={orientation}
				data-slot="toggle-group-root"
				{...restProps}
				className={cx(
					toggleGroup({ orientation, variant, attached }).root,
					css(cssProps),
					props.className,
				)}
			/>
		</ToggleGroupContext.Provider>
	);
};

export interface ToggleGroupItemProps
	extends
		Omit<HTMLStyledProps<"button">, keyof ToggleGroupPrimitive.ItemBaseProps>,
		ToggleGroupPrimitive.ItemBaseProps,
		Pick<ToggleGroupVariants, "variant" | "size"> {}

/**
 * Composes two recipes on the same element: `toggle.root` supplies the item's
 * visual (size, color, pressed-state wash) so items read as real Toggles, while
 * `toggleGroup.item` overlays group-only concerns (corner merging when attached,
 * border collapse in the outline variant, focus z-index elevation).
 */
const Item: FC<ToggleGroupItemProps> = ({ variant, size, ref, ...props }) => {
	const ctx = use(ToggleGroupContext);
	const resolvedVariant = variant ?? ctx.variant ?? "default";
	const resolvedSize = size ?? ctx.size ?? "md";
	const [cssProps, restProps] = splitCssProps(props);

	return (
		<ToggleGroupPrimitive.Item
			ref={ref}
			data-slot="toggle-group-item"
			{...restProps}
			className={cx(
				toggle({ variant: resolvedVariant, size: resolvedSize }).root,
				toggleGroup({
					orientation: ctx.orientation,
					variant: resolvedVariant,
					attached: ctx.attached,
				}).item,
				css(cssProps),
				props.className,
			)}
		/>
	);
};

export const ToggleGroup = Object.assign(Root, {
	Root,
	Item,
});
