export const CANCELLED = Symbol("cancelled");
export type Cancelled = typeof CANCELLED;

export function isCancelled<T>(value: T | Cancelled): value is Cancelled {
  return value === CANCELLED;
}

export interface TextOpts {
  readonly message: string;
  readonly placeholder?: string;
  readonly initialValue?: string;
  readonly validate?: (input: string) => string | undefined;
}

export interface SelectOption<T> {
  readonly value: T;
  readonly label: string;
  readonly hint?: string;
}

export interface SelectOpts<T> {
  readonly message: string;
  readonly options: readonly SelectOption<T>[];
  readonly initialValue?: T;
}

export interface MultiSelectOpts<T> {
  readonly message: string;
  readonly options: readonly SelectOption<T>[];
  readonly initialValues?: readonly T[];
  readonly required?: boolean;
}

export interface ConfirmOpts {
  readonly message: string;
  readonly initialValue?: boolean;
}

export interface PrompterLog {
  message(text: string): void;
  info(text: string): void;
  step(text: string): void;
  success(text: string): void;
  warn(text: string): void;
  error(text: string): void;
}

export interface Prompter {
  readonly isTty: boolean;
  readonly log: PrompterLog;
  intro(message: string): void;
  outro(message: string): void;
  note(body: string, title?: string): void;
  text(opts: TextOpts): Promise<string | Cancelled>;
  select<T>(opts: SelectOpts<T>): Promise<T | Cancelled>;
  multiselect<T>(opts: MultiSelectOpts<T>): Promise<readonly T[] | Cancelled>;
  confirm(opts: ConfirmOpts): Promise<boolean | Cancelled>;
  cancel(message?: string): never;
}
