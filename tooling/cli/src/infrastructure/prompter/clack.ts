import {
  cancel as clackCancel,
  confirm,
  intro,
  isCancel,
  log,
  multiselect,
  note,
  outro,
  select,
  text,
} from "@clack/prompts";
import { CANCELLED } from "~/application/ports/prompter";
import type {
  Cancelled,
  ConfirmOpts,
  MultiSelectOpts,
  Prompter,
  PrompterLog,
  SelectOpts,
  TextOpts,
} from "~/application/ports/prompter";

const clackLog: PrompterLog = {
  message: (t) => log.message(t),
  info: (t) => log.info(t),
  step: (t) => log.step(t),
  success: (t) => log.success(t),
  warn: (t) => log.warn(t),
  error: (t) => log.error(t),
};

export class ClackPrompter implements Prompter {
  readonly isTty: boolean = Boolean(process.stdout.isTTY);
  readonly log: PrompterLog = clackLog;

  intro(message: string): void {
    intro(message);
  }

  outro(message: string): void {
    outro(message);
  }

  note(body: string, title?: string): void {
    note(body, title);
  }

  async text(opts: TextOpts): Promise<string | Cancelled> {
    const value = await text({
      message: opts.message,
      placeholder: opts.placeholder,
      initialValue: opts.initialValue,
      validate: opts.validate ? (input: string) => opts.validate?.(input) : undefined,
    });
    return isCancel(value) ? CANCELLED : value;
  }

  async select<T>(opts: SelectOpts<T>): Promise<T | Cancelled> {
    type ClackOpt = Parameters<typeof select<T>>[0]["options"][number];
    const value = await select<T>({
      message: opts.message,
      initialValue: opts.initialValue,
      options: opts.options.map((o) => {
        const opt = { value: o.value, label: o.label } as ClackOpt;
        if (o.hint !== undefined) (opt as { hint?: string }).hint = o.hint;
        return opt;
      }),
    });
    return isCancel(value) ? CANCELLED : (value as T);
  }

  async multiselect<T>(opts: MultiSelectOpts<T>): Promise<readonly T[] | Cancelled> {
    type ClackOpt = Parameters<typeof multiselect<T>>[0]["options"][number];
    const value = await multiselect<T>({
      message: opts.message,
      required: opts.required ?? false,
      initialValues: opts.initialValues ? [...opts.initialValues] : undefined,
      options: opts.options.map((o) => {
        const opt = { value: o.value, label: o.label } as ClackOpt;
        if (o.hint !== undefined) (opt as { hint?: string }).hint = o.hint;
        return opt;
      }),
    });
    return isCancel(value) ? CANCELLED : (value as readonly T[]);
  }

  async confirm(opts: ConfirmOpts): Promise<boolean | Cancelled> {
    const value = await confirm({
      message: opts.message,
      initialValue: opts.initialValue,
    });
    return isCancel(value) ? CANCELLED : value;
  }

  cancel(message?: string): never {
    clackCancel(message ?? "Cancelled.");
    process.exit(0);
  }
}
