import { background } from "./background";
import { border } from "./border";
import { caution } from "./caution";
import { critical } from "./critical";
import { focus } from "./focus";
import { foreground } from "./foreground";
import { info } from "./info";
import { interactive } from "./interactive";
import { positive } from "./positive";
import { shadow } from "./shadow";
import { surface } from "./surface";

export const colors = {
	background,
	foreground,
	surface,
	border,
	interactive,
	shadow,
	focus,

	critical,
	positive,
	caution,
	info,
} as const;
