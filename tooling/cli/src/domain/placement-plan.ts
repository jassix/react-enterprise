import { join } from "~/domain/path";

export type PlacementPlan =
  | {
      readonly kind: "primitive";
      readonly category: string;
      readonly absDir: string;
      readonly componentName: string;
    }
  | {
      readonly kind: "block";
      readonly absDir: string;
      readonly componentName: string;
    };

export function primitiveAbsDir(rootDir: string, category: string, name: string): string {
  return join(rootDir, "packages/ui/primitives/src/ui", category, name);
}

export function blockAbsDir(rootDir: string, name: string): string {
  return join(rootDir, "packages/ui/blocks/src", name);
}

export function primitivePlacement(
  rootDir: string,
  category: string,
  name: string,
): PlacementPlan {
  return {
    kind: "primitive",
    category,
    absDir: primitiveAbsDir(rootDir, category, name),
    componentName: name,
  };
}

export function blockPlacement(rootDir: string, name: string): PlacementPlan {
  return {
    kind: "block",
    absDir: blockAbsDir(rootDir, name),
    componentName: name,
  };
}
