import { defineSlotRecipe } from "@pandacss/dev";

/**
 * Field — luma signature: vertical column with `gap-1.5` (we round to 4) of
 * label/control/error. Label only colors critical when the field is invalid;
 * helper text is muted; error text is full critical.text.
 */
export const fieldRecipe = defineSlotRecipe({
	className: "field",
	description: "Luma field wrapper — label, control, helper, error",
	jsx: ["Field"],
	slots: ["root", "label", "requiredIndicator", "control", "helperText", "errorText"],
	base: {
		root: {
			display: "flex",
			flexDirection: "column",
			gap: "{spacing.md}", // 12 — luma `gap-3`
			width: "100%",

			// Invalid fields tint the label / helper row.
			"&[data-invalid='true']": { color: "{colors.critical.text}" },
		},

		label: {
			display: "inline-flex",
			alignItems: "center",
			gap: "{spacing.sm}",
			fontFamily: "{fonts.body}",
			fontWeight: "{fontWeights.medium}",
			fontSize: "{fontSizes.sm}",
			lineHeight: "1",
			color: "{colors.foreground}",

			_disabled: { opacity: "0.5", cursor: "not-allowed" },
		},

		requiredIndicator: {
			color: "{colors.critical.text}",
			fontSize: "inherit",
		},

		control: {
			display: "flex",
			flexDirection: "column",
			gap: "{spacing.xs}",
		},

		helperText: {
			fontSize: "{fontSizes.xs}",
			color: "{colors.foreground.tertiary}",
			lineHeight: "{lineHeight.normal}",
		},

		errorText: {
			display: "inline-flex",
			alignItems: "center",
			gap: "{spacing.xs}",
			fontSize: "{fontSizes.xs}",
			color: "{colors.critical.text}",
			lineHeight: "{lineHeight.normal}",
		},
	},
	variants: {
		orientation: {
			vertical: { root: { flexDirection: "column" } },
			horizontal: {
				root: { flexDirection: "row", alignItems: "flex-start", gap: "{spacing.lg}" },
				label: { minWidth: "8rem", paddingTop: "{spacing.sm}" },
				control: { flex: "1" },
			},
		},
		size: {
			sm: {
				label: { fontSize: "{fontSizes.xs}" },
				helperText: { fontSize: "{fontSizes.xs}" },
				errorText: { fontSize: "{fontSizes.xs}" },
			},
			md: {},
			lg: {
				label: { fontSize: "{fontSizes.md}" },
				helperText: { fontSize: "{fontSizes.sm}" },
				errorText: { fontSize: "{fontSizes.sm}" },
			},
		},
	},
	defaultVariants: {
		orientation: "vertical",
		size: "md",
	},
});
