import type { Output } from "~/application/ports/output";
import { createColors } from "~/infrastructure/colors";

const c = createColors();

export function renderError(output: Output, message: string): 1 {
  const lines = message.split("\n");
  const head = lines[0] ?? "";
  const rest = lines.slice(1);
  const indent = "   ";
  const body = [`${c.wrap("red", "■")}  ${c.wrap("red", c.wrap("bold", "error"))}  ${head}`];
  for (const line of rest) body.push(`${indent}${line}`);
  output.writeErr(`${body.join("\n")}\n`);
  return 1;
}
