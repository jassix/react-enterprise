import { ark } from "@ark-ui/react/factory";
import { css, cx } from "@lume/foundation/css";
import { splitCssProps } from "@lume/foundation/jsx";
import { breadcrumb } from "@lume/foundation/recipes";
import type { HTMLStyledProps } from "@lume/foundation/types";
import type { ComponentProps, FC } from "react";

export interface BreadcrumbProps
  extends Omit<HTMLStyledProps<"nav">, keyof ComponentProps<"nav">>, ComponentProps<"nav"> {}

const Root: FC<BreadcrumbProps> = ({ ref, ...props }) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <ark.nav
      ref={ref}
      aria-label="breadcrumb"
      data-slot="breadcrumb"
      {...restProps}
      className={cx(breadcrumb().root, css(cssProps), props.className)}
    />
  );
};

Root.displayName = "Breadcrumb";

export interface BreadcrumbListProps
  extends Omit<HTMLStyledProps<"ol">, keyof ComponentProps<"ol">>, ComponentProps<"ol"> {}

const List: FC<BreadcrumbListProps> = ({ ref, ...props }) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <ark.ol
      ref={ref}
      data-slot="breadcrumb-list"
      {...restProps}
      className={cx(breadcrumb().list, css(cssProps), props.className)}
    />
  );
};

List.displayName = "BreadcrumbList";

export interface BreadcrumbItemProps
  extends Omit<HTMLStyledProps<"li">, keyof ComponentProps<"li">>, ComponentProps<"li"> {}

const Item: FC<BreadcrumbItemProps> = ({ ref, ...props }) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <ark.li
      ref={ref}
      data-slot="breadcrumb-item"
      {...restProps}
      className={cx(breadcrumb().item, css(cssProps), props.className)}
    />
  );
};

Item.displayName = "BreadcrumbItem";

export interface BreadcrumbLinkProps
  extends Omit<HTMLStyledProps<"a">, keyof ComponentProps<"a">>, ComponentProps<"a"> {}

const Link: FC<BreadcrumbLinkProps> = ({ ref, ...props }) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <ark.a
      ref={ref}
      data-slot="breadcrumb-link"
      {...restProps}
      className={cx(breadcrumb().link, css(cssProps), props.className)}
    />
  );
};

Link.displayName = "BreadcrumbLink";

export interface BreadcrumbPageProps
  extends Omit<HTMLStyledProps<"span">, keyof ComponentProps<"span">>, ComponentProps<"span"> {}

const Page: FC<BreadcrumbPageProps> = ({ ref, ...props }) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <ark.span
      ref={ref}
      role="link"
      aria-disabled="true"
      aria-current="page"
      data-slot="breadcrumb-page"
      {...restProps}
      className={cx(breadcrumb().page, css(cssProps), props.className)}
    />
  );
};

Page.displayName = "BreadcrumbPage";

export interface BreadcrumbSeparatorProps
  extends Omit<HTMLStyledProps<"li">, keyof ComponentProps<"li">>, ComponentProps<"li"> {}

const Separator: FC<BreadcrumbSeparatorProps> = ({ ref, children, ...props }) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <ark.li
      ref={ref}
      role="presentation"
      aria-hidden="true"
      data-slot="breadcrumb-separator"
      {...restProps}
      className={cx(breadcrumb().separator, css(cssProps), props.className)}
    >
      {children ?? <DefaultSeparatorIcon />}
    </ark.li>
  );
};

Separator.displayName = "BreadcrumbSeparator";

export interface BreadcrumbEllipsisProps
  extends Omit<HTMLStyledProps<"span">, keyof ComponentProps<"span">>, ComponentProps<"span"> {}

const Ellipsis: FC<BreadcrumbEllipsisProps> = ({ ref, children, ...props }) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <ark.span
      ref={ref}
      role="presentation"
      aria-hidden="true"
      data-slot="breadcrumb-ellipsis"
      {...restProps}
      className={cx(breadcrumb().ellipsis, css(cssProps), props.className)}
    >
      {children ?? <DefaultEllipsisIcon />}
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
        More
      </span>
    </ark.span>
  );
};

Ellipsis.displayName = "BreadcrumbEllipsis";

const DefaultSeparatorIcon: FC = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path d="M9 18l6-6-6-6" />
  </svg>
);

const DefaultEllipsisIcon: FC = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <circle cx="12" cy="12" r="10" />
    <circle cx="8" cy="12" r="1" fill="currentColor" stroke="none" />
    <circle cx="12" cy="12" r="1" fill="currentColor" stroke="none" />
    <circle cx="16" cy="12" r="1" fill="currentColor" stroke="none" />
  </svg>
);

export const Breadcrumb = Object.assign(Root, {
  Root,
  List,
  Item,
  Link,
  Page,
  Separator,
  Ellipsis,
});
