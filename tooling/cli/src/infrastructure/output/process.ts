import type { Output } from "~/application/ports/output";

export class ProcessOutput implements Output {
  writeOut(text: string): void {
    process.stdout.write(text);
  }

  writeErr(text: string): void {
    process.stderr.write(text);
  }
}
