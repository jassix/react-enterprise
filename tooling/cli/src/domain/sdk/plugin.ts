export type PluginId = "ts" | "client" | "react-query" | "zod" | "faker" | "msw" | "cypress";

export const PLUGIN_IDS = [
  "ts",
  "client",
  "react-query",
  "zod",
  "faker",
  "msw",
  "cypress",
] as const satisfies readonly PluginId[];

export interface PluginMeta {
  readonly id: PluginId;
  readonly label: string;
  readonly hint: string;
  readonly defaultSelected: boolean;
  readonly npmPackage: string;
  readonly importName: string;
  readonly outputDir: string;
  readonly omitOutputArg?: boolean;
}

export const PLUGINS: Readonly<Record<PluginId, PluginMeta>> = {
  ts: {
    id: "ts",
    label: "TypeScript types",
    hint: "request / response models",
    defaultSelected: true,
    npmPackage: "@kubb/plugin-ts",
    importName: "pluginTs",
    outputDir: "models",
  },
  client: {
    id: "client",
    label: "HTTP client",
    hint: "fetch-based typed client",
    defaultSelected: true,
    npmPackage: "@kubb/plugin-client",
    importName: "pluginClient",
    outputDir: "clients",
  },
  "react-query": {
    id: "react-query",
    label: "React Query hooks",
    hint: "useQuery / useMutation per endpoint",
    defaultSelected: true,
    npmPackage: "@kubb/plugin-react-query",
    importName: "pluginReactQuery",
    outputDir: "hooks",
  },
  zod: {
    id: "zod",
    label: "Zod schemas",
    hint: "runtime validators",
    defaultSelected: false,
    npmPackage: "@kubb/plugin-zod",
    importName: "pluginZod",
    outputDir: "zod",
  },
  faker: {
    id: "faker",
    label: "Faker mocks",
    hint: "fixture factories",
    defaultSelected: false,
    npmPackage: "@kubb/plugin-faker",
    importName: "pluginFaker",
    outputDir: "mocks",
  },
  msw: {
    id: "msw",
    label: "MSW handlers",
    hint: "request mocking for tests",
    defaultSelected: false,
    npmPackage: "@kubb/plugin-msw",
    importName: "pluginMsw",
    outputDir: "msw",
  },
  cypress: {
    id: "cypress",
    label: "Cypress specs",
    hint: "endpoint smoke tests",
    defaultSelected: false,
    npmPackage: "@kubb/plugin-cypress",
    importName: "pluginCypress",
    outputDir: "cypress",
    omitOutputArg: true,
  },
};

export const REQUIRED_KUBB_PACKAGES = [
  "@kubb/agent",
  "@kubb/cli",
  "@kubb/core",
  "@kubb/plugin-oas",
] as const;

export const KUBB_VERSION = "^4.37.5";

export function isPluginId(value: string): value is PluginId {
  return (PLUGIN_IDS as readonly string[]).includes(value);
}
