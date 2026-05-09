import { tasks } from "@clack/prompts";
import type { TaskRunner, TaskSpec } from "~/application/ports/task-runner";

export class ClackTaskRunner implements TaskRunner {
  async runSequential(taskList: readonly TaskSpec[]): Promise<void> {
    if (!process.stdout.isTTY) {
      for (const t of taskList) {
        process.stdout.write(`${t.title}\n`);
        const message = await t.run();
        if (typeof message === "string") process.stdout.write(`  ${message}\n`);
      }
      return;
    }
    await tasks(
      taskList.map((t) => ({
        title: t.title,
        task: async () => {
          const out = await t.run();
          return typeof out === "string" ? out : t.title;
        },
      })),
    );
  }
}
