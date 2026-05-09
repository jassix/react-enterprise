import type { TemplateLoader } from "~/application/ports/template-loader";
import { buildKubbConfig } from "~/domain/sdk/kubb-config";
import { buildPackageJson } from "~/domain/sdk/package-json";
import type { SdkPlan } from "~/domain/sdk/plan";

export interface AssembleSdkRequest {
  readonly plan: SdkPlan;
  readonly presetDir: string;
  readonly specFilename: string;
  readonly specContent: string;
}

export interface AssembleSdkDeps {
  readonly templateLoader: TemplateLoader;
}

export async function assembleSdk(
  req: AssembleSdkRequest,
  deps: AssembleSdkDeps,
): Promise<ReadonlyMap<string, string>> {
  const out = new Map(await deps.templateLoader.load(req.presetDir, { name: req.plan.name }));
  for (const key of [...out.keys()]) {
    if (key.startsWith("openapi/")) out.delete(key);
  }
  out.set(`openapi/${req.specFilename}`, req.specContent);
  out.set("package.json", buildPackageJson({ name: req.plan.name, plugins: req.plan.plugins }));
  out.set(
    "kubb.config.ts",
    buildKubbConfig({ plugins: req.plan.plugins, specFilename: req.specFilename }),
  );
  return out;
}
