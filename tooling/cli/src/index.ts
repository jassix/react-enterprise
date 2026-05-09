#!/usr/bin/env bun
import { composeCli } from "~/composition";
import { runCli } from "~/presentation/router";

process.exit(await runCli(process.argv.slice(2), composeCli()));
