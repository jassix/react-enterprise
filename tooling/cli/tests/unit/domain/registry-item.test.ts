import { describe, expect, test } from "bun:test";
import { parseRegistryItem } from "~/domain/registry-item";

describe("parseRegistryItem", () => {
  test("accepts a minimal valid payload", () => {
    const result = parseRegistryItem({
      name: "button",
      type: "registry:ui",
      files: [
        {
          path: "components/ui/button.tsx",
          type: "registry:ui",
          content: "export const Button = () => null;",
        },
      ],
    });

    expect(result.isOk()).toBe(true);
    const item = result.unwrap();
    expect(item.name).toBe("button");
    expect(item.files).toHaveLength(1);
  });

  test("rejects payload missing name", () => {
    const result = parseRegistryItem({
      type: "registry:ui",
      files: [],
    });

    expect(result.isErr()).toBe(true);
    const err = result.unwrapErr();
    expect(err.kind).toBe("schema");
    if (err.kind === "schema") {
      expect(err.issues.length).toBeGreaterThan(0);
    }
  });

  test("rejects payload with unknown type", () => {
    const result = parseRegistryItem({
      name: "button",
      type: "registry:unknown",
      files: [],
    });

    expect(result.isErr()).toBe(true);
  });

  test("accepts optional fields", () => {
    const result = parseRegistryItem({
      name: "button",
      type: "registry:ui",
      title: "Button",
      description: "A button",
      dependencies: ["react"],
      registryDependencies: ["icon"],
      files: [
        {
          path: "components/ui/button.tsx",
          type: "registry:ui",
          content: "",
          target: "src/ui/button.tsx",
        },
      ],
      cssVars: {
        light: { primary: "0 0% 0%" },
        dark: { primary: "0 0% 100%" },
      },
    });

    expect(result.isOk()).toBe(true);
    const item = result.unwrap();
    expect(item.dependencies).toEqual(["react"]);
    expect(item.cssVars?.light?.primary).toBe("0 0% 0%");
  });

  test("accepts registry:block type", () => {
    const result = parseRegistryItem({
      name: "dashboard-01",
      type: "registry:block",
      files: [],
    });
    expect(result.isOk()).toBe(true);
  });

  test("rejects non-object input", () => {
    expect(parseRegistryItem("not an object").isErr()).toBe(true);
    expect(parseRegistryItem(null).isErr()).toBe(true);
    expect(parseRegistryItem(42).isErr()).toBe(true);
  });
});
