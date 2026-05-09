const ANSI = {
  reset: "\x1b[0m",
  dim: "\x1b[2m",
  bold: "\x1b[1m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  red: "\x1b[31m",
  cyan: "\x1b[36m",
} as const;

export type ColorKey = keyof typeof ANSI;

export interface Colors {
  readonly enabled: boolean;
  wrap(key: ColorKey, text: string): string;
  raw(key: ColorKey): string;
}

function shouldEnable(): boolean {
  if (process.env.NO_COLOR) return false;
  if (process.env.FORCE_COLOR) return true;
  return Boolean(process.stdout.isTTY);
}

export function createColors(enabled: boolean = shouldEnable()): Colors {
  if (!enabled) {
    return {
      enabled: false,
      wrap: (_key, text) => text,
      raw: () => "",
    };
  }
  return {
    enabled: true,
    wrap: (key, text) => `${ANSI[key]}${text}${ANSI.reset}`,
    raw: (key) => ANSI[key],
  };
}
