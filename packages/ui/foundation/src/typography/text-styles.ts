import { defineTextStyles } from "@pandacss/dev";

export const lumeTextStyles = defineTextStyles({
	display: {
		"2xl": {
			description: "Display 2XL - Largest heading for hero sections",
			value: {
				fontFamily: "{fonts.heading}",
				fontWeight: "{fontWeights.bold}",
				fontSize: "{fontSizes.9xl}",
				lineHeight: "1",
				letterSpacing: "{letterSpacing.tighter}",
			},
		},
		xl: {
			description: "Display XL - Large hero heading",
			value: {
				fontFamily: "{fonts.heading}",
				fontWeight: "{fontWeights.bold}",
				fontSize: "{fontSizes.8xl}",
				lineHeight: "1",
				letterSpacing: "{letterSpacing.tighter}",
			},
		},
		lg: {
			description: "Display LG - Hero heading",
			value: {
				fontFamily: "{fonts.heading}",
				fontWeight: "{fontWeights.bold}",
				fontSize: "{fontSizes.7xl}",
				lineHeight: "1.1",
				letterSpacing: "{letterSpacing.tight}",
			},
		},
		md: {
			description: "Display MD - Section heading",
			value: {
				fontFamily: "{fonts.heading}",
				fontWeight: "{fontWeights.bold}",
				fontSize: "{fontSizes.6xl}",
				lineHeight: "1.1",
				letterSpacing: "{letterSpacing.tight}",
			},
		},
		sm: {
			description: "Display SM - Small section heading",
			value: {
				fontFamily: "{fonts.heading}",
				fontWeight: "{fontWeights.semibold}",
				fontSize: "{fontSizes.5xl}",
				lineHeight: "1.2",
				letterSpacing: "{letterSpacing.tight}",
			},
		},
		xs: {
			description: "Display XS - Smallest display heading",
			value: {
				fontFamily: "{fonts.heading}",
				fontWeight: "{fontWeights.semibold}",
				fontSize: "{fontSizes.4xl}",
				lineHeight: "1.2",
				letterSpacing: "{letterSpacing.normal}",
			},
		},
	},

	heading: {
		h1: {
			description: "H1 - Main page heading",
			value: {
				fontFamily: "{fonts.heading}",
				fontWeight: "{fontWeights.bold}",
				fontSize: "{fontSizes.5xl}",
				lineHeight: "1.2",
				letterSpacing: "{letterSpacing.tight}",
			},
		},
		h2: {
			description: "H2 - Section heading",
			value: {
				fontFamily: "{fonts.heading}",
				fontWeight: "{fontWeights.bold}",
				fontSize: "{fontSizes.4xl}",
				lineHeight: "1.3",
				letterSpacing: "{letterSpacing.tight}",
			},
		},
		h3: {
			description: "H3 - Subsection heading",
			value: {
				fontFamily: "{fonts.heading}",
				fontWeight: "{fontWeights.semibold}",
				fontSize: "{fontSizes.3xl}",
				lineHeight: "1.3",
				letterSpacing: "{letterSpacing.normal}",
			},
		},
		h4: {
			description: "H4 - Card heading",
			value: {
				fontFamily: "{fonts.heading}",
				fontWeight: "{fontWeights.semibold}",
				fontSize: "{fontSizes.2xl}",
				lineHeight: "1.4",
				letterSpacing: "{letterSpacing.normal}",
			},
		},
		h5: {
			description: "H5 - Small heading",
			value: {
				fontFamily: "{fonts.heading}",
				fontWeight: "{fontWeights.semibold}",
				fontSize: "{fontSizes.xl}",
				lineHeight: "1.5",
				letterSpacing: "{letterSpacing.normal}",
			},
		},
		h6: {
			description: "H6 - Smallest heading",
			value: {
				fontFamily: "{fonts.heading}",
				fontWeight: "{fontWeights.medium}",
				fontSize: "{fontSizes.lg}",
				lineHeight: "1.5",
				letterSpacing: "{letterSpacing.normal}",
			},
		},
	},

	body: {
		xl: {
			description: "Body XL - Large body text",
			value: {
				fontFamily: "{fonts.body}",
				fontWeight: "{fontWeights.regular}",
				fontSize: "{fontSizes.xl}",
				lineHeight: "{lineHeight.relaxed}",
				letterSpacing: "{letterSpacing.normal}",
			},
		},
		lg: {
			description: "Body LG - Large body text for emphasis",
			value: {
				fontFamily: "{fonts.body}",
				fontWeight: "{fontWeights.regular}",
				fontSize: "{fontSizes.lg}",
				lineHeight: "{lineHeight.relaxed}",
				letterSpacing: "{letterSpacing.normal}",
			},
		},
		md: {
			description: "Body MD - Default body text",
			value: {
				fontFamily: "{fonts.body}",
				fontWeight: "{fontWeights.regular}",
				fontSize: "{fontSizes.md}",
				lineHeight: "{lineHeight.normal}",
				letterSpacing: "{letterSpacing.normal}",
			},
		},
		sm: {
			description: "Body SM - Small body text",
			value: {
				fontFamily: "{fonts.body}",
				fontWeight: "{fontWeights.regular}",
				fontSize: "{fontSizes.sm}",
				lineHeight: "{lineHeight.normal}",
				letterSpacing: "{letterSpacing.normal}",
			},
		},
		xs: {
			description: "Body XS - Extra small body text",
			value: {
				fontFamily: "{fonts.body}",
				fontWeight: "{fontWeights.regular}",
				fontSize: "{fontSizes.xs}",
				lineHeight: "{lineHeight.normal}",
				letterSpacing: "{letterSpacing.normal}",
			},
		},
	},

	label: {
		lg: {
			description: "Label LG - Large form label",
			value: {
				fontFamily: "{fonts.body}",
				fontWeight: "{fontWeights.medium}",
				fontSize: "{fontSizes.lg}",
				lineHeight: "{lineHeight.tight}",
				letterSpacing: "{letterSpacing.normal}",
			},
		},
		md: {
			description: "Label MD - Default form label",
			value: {
				fontFamily: "{fonts.body}",
				fontWeight: "{fontWeights.medium}",
				fontSize: "{fontSizes.md}",
				lineHeight: "{lineHeight.tight}",
				letterSpacing: "{letterSpacing.normal}",
			},
		},
		sm: {
			description: "Label SM - Small form label",
			value: {
				fontFamily: "{fonts.body}",
				fontWeight: "{fontWeights.medium}",
				fontSize: "{fontSizes.sm}",
				lineHeight: "{lineHeight.tight}",
				letterSpacing: "{letterSpacing.normal}",
			},
		},
		xs: {
			description: "Label XS - Extra small form label",
			value: {
				fontFamily: "{fonts.body}",
				fontWeight: "{fontWeights.medium}",
				fontSize: "{fontSizes.xs}",
				lineHeight: "{lineHeight.tight}",
				letterSpacing: "{letterSpacing.wide}",
			},
		},
	},

	caption: {
		sm: {
			description: "Caption SM - Small caption text",
			value: {
				fontFamily: "{fonts.body}",
				fontWeight: "{fontWeights.regular}",
				fontSize: "{fontSizes.sm}",
				lineHeight: "{lineHeight.tight}",
				letterSpacing: "{letterSpacing.normal}",
			},
		},
		xs: {
			description: "Caption XS - Extra small caption text",
			value: {
				fontFamily: "{fonts.body}",
				fontWeight: "{fontWeights.regular}",
				fontSize: "{fontSizes.xs}",
				lineHeight: "{lineHeight.tight}",
				letterSpacing: "{letterSpacing.normal}",
			},
		},
	},

	code: {
		inline: {
			description: "Code inline - Inline code snippet",
			value: {
				fontFamily: "{fonts.mono}",
				fontWeight: "{fontWeights.regular}",
				fontSize: "0.875em",
				lineHeight: "{lineHeight.tight}",
				letterSpacing: "{letterSpacing.normal}",
			},
		},
		block: {
			description: "Code block - Code block",
			value: {
				fontFamily: "{fonts.mono}",
				fontWeight: "{fontWeights.regular}",
				fontSize: "{fontSizes.sm}",
				lineHeight: "{lineHeight.relaxed}",
				letterSpacing: "{letterSpacing.normal}",
			},
		},
	},

	overline: {
		description: "Overline - Uppercase label text",
		value: {
			fontFamily: "{fonts.body}",
			fontWeight: "{fontWeights.semibold}",
			fontSize: "{fontSizes.xs}",
			lineHeight: "{lineHeight.tight}",
			letterSpacing: "{letterSpacing.widest}",
			textTransform: "uppercase",
		},
	},
});