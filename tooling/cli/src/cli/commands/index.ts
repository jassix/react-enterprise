import type { Command } from "../command";
import { adaptCommand } from "./adapt";
import { doctorCommand } from "./doctor";
import { createHelpCommand } from "./help";

const helpCommand = createHelpCommand(() => defaultCommands);

export const defaultCommands: readonly Command[] = [doctorCommand, adaptCommand, helpCommand];
