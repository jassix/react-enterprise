import { KUBB_VERSION, PLUGINS, type PluginId, REQUIRED_KUBB_PACKAGES } from "~/domain/sdk/plugin";

export interface BuildPackageJsonOptions {
  readonly name: string;
  readonly plugins: readonly PluginId[];
}

export function buildPackageJson(opts: BuildPackageJsonOptions): string {
  const devDependencies: Record<string, string> = {};
  for (const pkg of REQUIRED_KUBB_PACKAGES) devDependencies[pkg] = KUBB_VERSION;
  for (const id of opts.plugins) {
    devDependencies[PLUGINS[id].npmPackage] = KUBB_VERSION;
  }
  devDependencies["@repo/oxlint"] = "workspace:";
  devDependencies["@repo/tsconfig"] = "workspace:";
  devDependencies["@repo/types"] = "workspace:";
  devDependencies["@types/bun"] = "catalog:";

  const pkg = {
    name: `@repo/${opts.name}-sdk`,
    version: "0.0.0",
    private: true,
    type: "module",
    main: "index.js",
    scripts: {
      generate: "kubb generate",
      lint: "oxlint -c .oxlintrc.json .",
      format: "oxfmt --write .",
      "check-types": "tsc --noEmit",
    },
    devDependencies: sortKeys(devDependencies),
    peerDependencies: {
      typescript: "catalog:",
    },
  };

  return `${JSON.stringify(pkg, null, 2)}\n`;
}

function sortKeys<T extends Record<string, string>>(obj: T): T {
  const out: Record<string, string> = {};
  for (const key of Object.keys(obj).sort()) out[key] = obj[key]!;
  return out as T;
}
