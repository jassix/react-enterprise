const ANSI = {
  reset: "\u001B[0m",
  dim: "\u001B[2m",
  bold: "\u001B[1m",
  green: "\u001B[32m",
  yellow: "\u001B[33m",
  red: "\u001B[31m",
  cyan: "\u001B[36m",
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
