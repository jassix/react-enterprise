export const SDK_NAME_RE = /^[a-z][a-z0-9-]*$/;

export function isValidSdkName(value: string): boolean {
  return SDK_NAME_RE.test(value);
}
