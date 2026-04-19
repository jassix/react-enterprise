import { ark } from "@ark-ui/react/factory";
import { css, cx } from "@lume/foundation/css";
import { splitCssProps } from "@lume/foundation/jsx";
import { sidebar as sidebarRecipe } from "@lume/foundation/recipes";
import type { HTMLStyledProps } from "@lume/foundation/types";
import {
	type ComponentProps,
	type FC,
	type ReactNode,
	createContext,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useState,
} from "react";

const SIDEBAR_COOKIE_NAME = "sidebar_state";
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;
const SIDEBAR_KEYBOARD_SHORTCUT = "b";

type SidebarContextValue = {
	state: "expanded" | "collapsed";
	open: boolean;
	setOpen: (open: boolean) => void;
	openMobile: boolean;
	setOpenMobile: (open: boolean) => void;
	isMobile: boolean;
	toggleSidebar: () => void;
};

const SidebarContext = createContext<SidebarContextValue | null>(null);

export function useSidebar(): SidebarContextValue {
	const ctx = useContext(SidebarContext);
	if (!ctx) throw new Error("useSidebar must be used within <Sidebar.Provider>.");
	return ctx;
}

// Simple viewport watcher — luma imports `use-mobile` from the app. Kept
// self-contained here so consumers don't need to wire a separate hook.
function useIsMobile(breakpoint = 768): boolean {
	const [isMobile, setIsMobile] = useState(false);
	useEffect(() => {
		if (typeof window === "undefined") return;
		const media = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
		const update = () => setIsMobile(media.matches);
		update();
		media.addEventListener("change", update);
		return () => media.removeEventListener("change", update);
	}, [breakpoint]);
	return isMobile;
}

export interface SidebarProviderProps extends ComponentProps<"div"> {
	defaultOpen?: boolean;
	open?: boolean;
	onOpenChange?: (open: boolean) => void;
}

const Provider: FC<SidebarProviderProps> = ({
	defaultOpen = true,
	open: openProp,
	onOpenChange: setOpenProp,
	className,
	style,
	children,
	...props
}) => {
	const isMobile = useIsMobile();
	const [openMobile, setOpenMobile] = useState(false);
	const [internalOpen, setInternalOpen] = useState(defaultOpen);

	const open = openProp ?? internalOpen;

	const setOpen = useCallback(
		(value: boolean | ((prev: boolean) => boolean)) => {
			const next = typeof value === "function" ? value(open) : value;
			if (setOpenProp) setOpenProp(next);
			else setInternalOpen(next);
			if (typeof document !== "undefined") {
				document.cookie = `${SIDEBAR_COOKIE_NAME}=${next}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`;
			}
		},
		[open, setOpenProp],
	);

	const toggleSidebar = useCallback(() => {
		if (isMobile) setOpenMobile((v) => !v);
		else setOpen((v) => !v);
	}, [isMobile, setOpen]);

	useEffect(() => {
		const onKey = (event: KeyboardEvent) => {
			if (
				event.key === SIDEBAR_KEYBOARD_SHORTCUT
				&& (event.metaKey || event.ctrlKey)
			) {
				event.preventDefault();
				toggleSidebar();
			}
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [toggleSidebar]);

	const state: "expanded" | "collapsed" = open ? "expanded" : "collapsed";

	const value = useMemo<SidebarContextValue>(
		() => ({ state, open, setOpen, openMobile, setOpenMobile, isMobile, toggleSidebar }),
		[state, open, setOpen, openMobile, isMobile, toggleSidebar],
	);

	return (
		<SidebarContext.Provider value={value}>
			<div
				data-slot="sidebar-wrapper"
				style={style}
				{...props}
				className={cx(sidebarRecipe().wrapper, className)}
			>
				{children}
			</div>
		</SidebarContext.Provider>
	);
};

Provider.displayName = "SidebarProvider";

export interface SidebarProps
	extends
		Omit<HTMLStyledProps<"div">, keyof ComponentProps<"div">>,
		ComponentProps<"div"> {
	side?: "left" | "right";
	variant?: "sidebar" | "floating" | "inset";
	collapsible?: "offcanvas" | "icon" | "none";
}

const Root: FC<SidebarProps> = ({
	side = "left",
	variant = "sidebar",
	collapsible = "offcanvas",
	ref,
	children,
	...props
}) => {
	const { state, isMobile } = useContext(SidebarContext) ?? {
		state: "expanded",
		isMobile: false,
	} as SidebarContextValue;
	const [cssProps, restProps] = splitCssProps(props);
	const styles = sidebarRecipe();

	if (collapsible === "none" || isMobile) {
		return (
			<ark.div
				ref={ref}
				data-slot="sidebar"
				data-side={side}
				data-variant={variant}
				data-state={state}
				data-collapsible={collapsible}
				{...restProps}
				className={cx(styles.inner, css(cssProps), props.className)}
			>
				{children}
			</ark.div>
		);
	}

	return (
		<ark.div
			ref={ref}
			data-slot="sidebar"
			data-side={side}
			data-variant={variant}
			data-state={state}
			data-collapsible={state === "collapsed" ? collapsible : ""}
			{...restProps}
			className={cx(styles.root, css(cssProps), props.className)}
		>
			<div data-slot="sidebar-gap" className={styles.gap} />
			<div data-slot="sidebar-container" className={styles.container}>
				<div data-slot="sidebar-inner" className={styles.inner}>
					{children}
				</div>
			</div>
		</ark.div>
	);
};

Root.displayName = "Sidebar";

// Thin data-slot wrappers. Each shares the same shape — `splitCssProps` +
// `cx(recipe.slot, cssProps, className)` — but keeping them direct avoids
// fighting the Panda/Ark generic surface in a shared factory.
function slotWrapper<E extends keyof typeof ark>(
	Tag: E,
	slotKey: keyof ReturnType<typeof sidebarRecipe>,
	dataSlot: string,
) {
	const Component = ({ ref, className, ...props }: any) => {
		const [cssProps, restProps] = splitCssProps(props);
		const styles = sidebarRecipe();
		const Rendered = ark[Tag] as any;
		return (
			<Rendered
				ref={ref}
				data-slot={dataSlot}
				{...restProps}
				className={cx(styles[slotKey], css(cssProps), className)}
			/>
		);
	};
	return Component;
}

// Slot prop interfaces — each thin wrapper accepts the underlying element's
// props plus the same style-prop bag the styled system uses. Published so
// downstream consumers can type-only import them (e.g. for forwardRef wrappers
// or re-exports in a design system).
export interface SidebarHeaderProps
	extends Omit<HTMLStyledProps<"div">, keyof ComponentProps<"div">>,
		ComponentProps<"div"> {}
export interface SidebarFooterProps
	extends Omit<HTMLStyledProps<"div">, keyof ComponentProps<"div">>,
		ComponentProps<"div"> {}
export interface SidebarContentProps
	extends Omit<HTMLStyledProps<"div">, keyof ComponentProps<"div">>,
		ComponentProps<"div"> {}
export interface SidebarGroupProps
	extends Omit<HTMLStyledProps<"div">, keyof ComponentProps<"div">>,
		ComponentProps<"div"> {}
export interface SidebarGroupLabelProps
	extends Omit<HTMLStyledProps<"div">, keyof ComponentProps<"div">>,
		ComponentProps<"div"> {}
export interface SidebarGroupActionProps
	extends Omit<HTMLStyledProps<"button">, keyof ComponentProps<"button">>,
		ComponentProps<"button"> {}
export interface SidebarGroupContentProps
	extends Omit<HTMLStyledProps<"div">, keyof ComponentProps<"div">>,
		ComponentProps<"div"> {}
export interface SidebarMenuProps
	extends Omit<HTMLStyledProps<"ul">, keyof ComponentProps<"ul">>,
		ComponentProps<"ul"> {}
export interface SidebarMenuItemProps
	extends Omit<HTMLStyledProps<"li">, keyof ComponentProps<"li">>,
		ComponentProps<"li"> {}
export interface SidebarMenuActionProps
	extends Omit<HTMLStyledProps<"button">, keyof ComponentProps<"button">>,
		ComponentProps<"button"> {}
export interface SidebarMenuBadgeProps
	extends Omit<HTMLStyledProps<"div">, keyof ComponentProps<"div">>,
		ComponentProps<"div"> {}
export interface SidebarMenuSubProps
	extends Omit<HTMLStyledProps<"ul">, keyof ComponentProps<"ul">>,
		ComponentProps<"ul"> {}
export interface SidebarMenuSubItemProps
	extends Omit<HTMLStyledProps<"li">, keyof ComponentProps<"li">>,
		ComponentProps<"li"> {}
export interface SidebarSeparatorProps
	extends Omit<HTMLStyledProps<"div">, keyof ComponentProps<"div">>,
		ComponentProps<"div"> {}
export interface SidebarInsetProps
	extends Omit<HTMLStyledProps<"main">, keyof ComponentProps<"main">>,
		ComponentProps<"main"> {}
export interface SidebarInputProps
	extends Omit<HTMLStyledProps<"input">, keyof ComponentProps<"input">>,
		ComponentProps<"input"> {}
export interface SidebarMenuSkeletonProps
	extends Omit<HTMLStyledProps<"div">, keyof ComponentProps<"div">>,
		ComponentProps<"div"> {}

const Header: FC<SidebarHeaderProps> = slotWrapper("div", "header", "sidebar-header");
const Footer: FC<SidebarFooterProps> = slotWrapper("div", "footer", "sidebar-footer");
const Content: FC<SidebarContentProps> = slotWrapper("div", "content", "sidebar-content");
const Group: FC<SidebarGroupProps> = slotWrapper("div", "group", "sidebar-group");
const GroupLabel: FC<SidebarGroupLabelProps> = slotWrapper(
	"div",
	"groupLabel",
	"sidebar-group-label",
);
const GroupAction: FC<SidebarGroupActionProps> = slotWrapper(
	"button",
	"groupAction",
	"sidebar-group-action",
);
const GroupContent: FC<SidebarGroupContentProps> = slotWrapper(
	"div",
	"groupContent",
	"sidebar-group-content",
);
const Menu: FC<SidebarMenuProps> = slotWrapper("ul", "menu", "sidebar-menu");
const MenuItem: FC<SidebarMenuItemProps> = slotWrapper("li", "menuItem", "sidebar-menu-item");
const MenuAction: FC<SidebarMenuActionProps> = slotWrapper(
	"button",
	"menuAction",
	"sidebar-menu-action",
);
const MenuBadge: FC<SidebarMenuBadgeProps> = slotWrapper(
	"div",
	"menuBadge",
	"sidebar-menu-badge",
);
const MenuSub: FC<SidebarMenuSubProps> = slotWrapper("ul", "menuSub", "sidebar-menu-sub");
const MenuSubItem: FC<SidebarMenuSubItemProps> = slotWrapper(
	"li",
	"menuSubItem",
	"sidebar-menu-sub-item",
);
const Separator: FC<SidebarSeparatorProps> = slotWrapper(
	"div",
	"separator",
	"sidebar-separator",
);
const Inset: FC<SidebarInsetProps> = slotWrapper("main", "inset", "sidebar-inset");
const Input: FC<SidebarInputProps> = slotWrapper("input", "input", "sidebar-input");
const MenuSkeleton: FC<SidebarMenuSkeletonProps> = slotWrapper(
	"div",
	"menuSkeleton",
	"sidebar-menu-skeleton",
);

export interface SidebarMenuButtonProps
	extends
		Omit<HTMLStyledProps<"button">, keyof ComponentProps<"button">>,
		ComponentProps<"button"> {
	isActive?: boolean;
	tooltip?: ReactNode;
}

const MenuButton: FC<SidebarMenuButtonProps> = ({ isActive, ref, ...props }) => {
	const [cssProps, restProps] = splitCssProps(props);
	const styles = sidebarRecipe();

	return (
		<ark.button
			ref={ref}
			type="button"
			data-slot="sidebar-menu-button"
			data-active={isActive}
			{...restProps}
			className={cx(styles.menuButton, css(cssProps), props.className)}
		/>
	);
};

MenuButton.displayName = "SidebarMenuButton";

export interface SidebarMenuSubButtonProps
	extends
		Omit<HTMLStyledProps<"a">, keyof ComponentProps<"a">>,
		ComponentProps<"a"> {
	isActive?: boolean;
}

const MenuSubButton: FC<SidebarMenuSubButtonProps> = ({ isActive, ref, ...props }) => {
	const [cssProps, restProps] = splitCssProps(props);
	const styles = sidebarRecipe();

	return (
		<ark.a
			ref={ref}
			data-slot="sidebar-menu-sub-button"
			data-active={isActive}
			{...restProps}
			className={cx(styles.menuSubButton, css(cssProps), props.className)}
		/>
	);
};

MenuSubButton.displayName = "SidebarMenuSubButton";

export interface SidebarTriggerProps
	extends
		Omit<HTMLStyledProps<"button">, keyof ComponentProps<"button">>,
		ComponentProps<"button"> {}

const Trigger: FC<SidebarTriggerProps> = ({ ref, onClick, children, ...props }) => {
	const { toggleSidebar } = useSidebar();
	const [cssProps, restProps] = splitCssProps(props);
	const styles = sidebarRecipe();

	return (
		<ark.button
			ref={ref}
			type="button"
			aria-label="Toggle Sidebar"
			data-slot="sidebar-trigger"
			onClick={(event) => {
				onClick?.(event);
				toggleSidebar();
			}}
			{...restProps}
			className={cx(styles.trigger, css(cssProps), props.className)}
		>
			{children ?? <DefaultTriggerIcon />}
			<span
				style={{
					position: "absolute",
					width: 1,
					height: 1,
					padding: 0,
					margin: -1,
					overflow: "hidden",
					clip: "rect(0, 0, 0, 0)",
					whiteSpace: "nowrap",
					borderWidth: 0,
				}}
			>
				Toggle Sidebar
			</span>
		</ark.button>
	);
};

Trigger.displayName = "SidebarTrigger";

const DefaultTriggerIcon: FC = () => (
	<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
		<rect x="3" y="3" width="18" height="18" rx="2" />
		<path d="M9 3v18" />
	</svg>
);

export interface SidebarRailProps
	extends
		Omit<HTMLStyledProps<"button">, keyof ComponentProps<"button">>,
		ComponentProps<"button"> {}

const Rail: FC<SidebarRailProps> = ({ ref, onClick, ...props }) => {
	const { toggleSidebar } = useSidebar();
	const [cssProps, restProps] = splitCssProps(props);
	const styles = sidebarRecipe();

	return (
		<ark.button
			ref={ref}
			type="button"
			tabIndex={-1}
			aria-label="Toggle Sidebar"
			title="Toggle Sidebar"
			data-slot="sidebar-rail"
			onClick={(event) => {
				onClick?.(event);
				toggleSidebar();
			}}
			{...restProps}
			className={cx(styles.rail, css(cssProps), props.className)}
		/>
	);
};

Rail.displayName = "SidebarRail";

export const Sidebar = Object.assign(Root, {
	Provider,
	Root,
	Trigger,
	Rail,
	Inset,
	Input,
	Header,
	Footer,
	Separator,
	Content,
	Group,
	GroupLabel,
	GroupAction,
	GroupContent,
	Menu,
	MenuItem,
	MenuButton,
	MenuAction,
	MenuBadge,
	MenuSkeleton,
	MenuSub,
	MenuSubItem,
	MenuSubButton,
});
