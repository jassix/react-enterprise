import { PLUGINS, type PluginId } from "~/domain/sdk/plugin";

export interface BuildKubbConfigOptions {
  readonly plugins: readonly PluginId[];
  readonly specFilename: string;
}

export function buildKubbConfig(opts: BuildKubbConfigOptions): string {
  const sortedPlugins = [...opts.plugins].sort(comparePluginId);
  const imports = [
    `import { defineConfig } from "@kubb/core";`,
    `import { pluginOas } from "@kubb/plugin-oas";`,
    ...sortedPlugins.map((id) => {
      const meta = PLUGINS[id];
      return `import { ${meta.importName} } from "${meta.npmPackage}";`;
    }),
  ];

  const pluginCalls = [
    `    pluginOas(),`,
    ...sortedPlugins.map((id) => {
      const meta = PLUGINS[id];
      if (meta.omitOutputArg) return `    ${meta.importName}(),`;
      return `    ${meta.importName}({ output: { path: "${meta.outputDir}" } }),`;
    }),
  ];

  return [
    imports.join("\n"),
    "",
    "export default defineConfig({",
    `  root: ".",`,
    `  input: {`,
    `    path: "./openapi/${opts.specFilename}",`,
    `  },`,
    `  output: {`,
    `    path: "./src/gen",`,
    `    clean: true,`,
    `    format: "oxfmt",`,
    `  },`,
    `  plugins: [`,
    pluginCalls.join("\n"),
    `  ],`,
    `});`,
    "",
  ].join("\n");
}

const PLUGIN_ORDER: readonly PluginId[] = [
  "ts",
  "client",
  "react-query",
  "zod",
  "faker",
  "msw",
  "cypress",
];

function comparePluginId(a: PluginId, b: PluginId): number {
  return PLUGIN_ORDER.indexOf(a) - PLUGIN_ORDER.indexOf(b);
}
