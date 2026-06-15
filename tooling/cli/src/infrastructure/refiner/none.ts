import { Ok } from "@repo/std/result";
import type { Result } from "@repo/std/result";
import type { Refiner, RefinerError, RefinerOutput } from "~/application/ports/refiner";
import type { PlacementPlan } from "~/domain/placement-plan";
import type { RefinementContext } from "~/domain/refinement-context";

export class NoneRefiner implements Refiner {
  async refine(context: RefinementContext): Promise<Result<RefinerOutput, RefinerError>> {
    const files = context.source.map((f) => ({
      path: targetPath(context.target, f.path),
      content: f.content,
    }));
    return Ok({ files });
  }
}

function targetPath(target: PlacementPlan, sourcePath: string): string {
  const base = sourcePath.split("/").pop() ?? sourcePath;
  if (target.kind === "primitive") {
    return `packages/ui/primitives/src/ui/${target.category}/${target.componentName}/${base}`;
  }
  return `packages/ui/blocks/src/${target.componentName}/${base}`;
}
