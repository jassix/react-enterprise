#!/usr/bin/env bun
import { runCli } from "~/cli/cli";
import { defaultCommands } from "~/cli/commands";

process.exit(await runCli(process.argv.slice(2), defaultCommands));
