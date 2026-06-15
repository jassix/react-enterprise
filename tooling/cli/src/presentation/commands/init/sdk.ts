import { buildSdkPlan } from "~/application/usecases/sdk/build-plan";
import type { SdkPlanInput } from "~/application/usecases/sdk/build-plan";
import { assembleSdk } from "~/application/usecases/sdk/assemble";
import { resolveSpec } from "~/application/usecases/sdk/resolve-spec";
import { scaffoldSdk } from "~/application/usecases/sdk/scaffold";
import type { CommandDeps } from "~/presentation/deps";
import { join } from "~/domain/path";
import { allRequiredPresent, parseSdkArgs } from "~/presentation/parsers/sdk-args";
import type { SdkParsedArgs } from "~/presentation/parsers/sdk-args";
import { nonInteractiveHint, showIntro, showOutro, showPlanSummary } from "~/presentation/ui/sdk";
import { renderError } from "~/presentation/ui/format-error";

export async function runInitSdk(
  argv: readonly string[],
  root: string,
  deps: CommandDeps,
): Promise<number> {
  const parsed = parseSdkArgs(argv);
  if ("error" in parsed) return renderError(deps.output, parsed.error);

  const interactive = !parsed.yes && deps.prompter.isTty;
  if (!interactive && !parsed.yes && !allRequiredPresent(parsed)) {
    return renderError(deps.output, nonInteractiveHint());
  }

  showIntro(deps.prompter);

  const input = toPlanInput(parsed);
  let plan;
  try {
    plan = await buildSdkPlan({ input, interactive }, { prompter: deps.prompter });
  } catch (error) {
    return renderError(deps.output, error instanceof Error ? error.message : String(error));
  }

  if (plan.generate && !plan.install) {
    return renderError(
      deps.output,
      `--generate requires installed dependencies; remove --no-install or drop --generate`,
    );
  }

  if (interactive && !(await showPlanSummary(deps.prompter, plan))) {
    deps.prompter.cancel("Aborted.");
  }

  const presetDir = join(root, "tooling/templates/sdk", plan.preset);

  let resolvedSpec;
  try {
    resolvedSpec = await resolveSpec(
      {
        source: plan.spec,
        cwd: process.cwd(),
        placeholderDir: presetDir,
        templateName: plan.name,
      },
      { fs: deps.fs, fetcher: deps.fetcher, templateLoader: deps.templateLoader },
    );
  } catch (error) {
    return renderError(deps.output, error instanceof Error ? error.message : String(error));
  }

  const files = await assembleSdk(
    {
      plan,
      presetDir,
      specFilename: resolvedSpec.filename,
      specContent: resolvedSpec.content,
    },
    { templateLoader: deps.templateLoader },
  );

  let result;
  try {
    result = await scaffoldSdk(
      { plan, root, files },
      {
        fs: deps.fs,
        shell: deps.shell,
        taskRunner: deps.taskRunner,
        output: deps.output,
      },
    );
  } catch (error) {
    return renderError(deps.output, error instanceof Error ? error.message : String(error));
  }

  showOutro(deps.prompter, { plan, fileCount: result.fileCount });
  return 0;
}

function toPlanInput(parsed: SdkParsedArgs): SdkPlanInput {
  return {
    name: parsed.name,
    preset: parsed.preset,
    plugins: parsed.plugins,
    spec: parsed.spec,
    install: parsed.install,
    generate: parsed.generate,
  };
}
