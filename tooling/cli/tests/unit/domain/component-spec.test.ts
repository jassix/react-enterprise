import { describe, expect, test } from "bun:test";
import { componentName, parseSpec } from "~/domain/component-spec";

describe("parseSpec", () => {
  test("shadcn:<name> resolves to default styles URL", () => {
    const result = parseSpec("shadcn:button");
    expect(result.isOk()).toBe(true);
    const spec = result.unwrap();
    expect(spec.source).toBe("shadcn");
    if (spec.source === "shadcn") {
      expect(spec.name).toBe("button");
      expect(spec.url).toBe("https://ui.shadcn.com/r/styles/default/button.json");
    }
  });

  test("@shadcn/<name> resolves to the same URL", () => {
    const result = parseSpec("@shadcn/dialog");
    expect(result.isOk()).toBe(true);
    const spec = result.unwrap();
    if (spec.source === "shadcn") {
      expect(spec.name).toBe("dialog");
      expect(spec.url).toBe("https://ui.shadcn.com/r/styles/default/dialog.json");
    }
  });

  test("absolute https URL passes through", () => {
    const result = parseSpec("https://example.com/foo.json");
    expect(result.isOk()).toBe(true);
    const spec = result.unwrap();
    expect(spec.source).toBe("url");
    if (spec.source === "url") {
      expect(spec.url).toBe("https://example.com/foo.json");
    }
  });

  test("empty input fails", () => {
    const result = parseSpec("");
    expect(result.isErr()).toBe(true);
    expect(result.unwrapErr().kind).toBe("empty");
  });

  test("whitespace-only input fails", () => {
    const result = parseSpec("   ");
    expect(result.isErr()).toBe(true);
    expect(result.unwrapErr().kind).toBe("empty");
  });

  test("unrecognized input fails", () => {
    const result = parseSpec("nope");
    expect(result.isErr()).toBe(true);
    expect(result.unwrapErr().kind).toBe("unrecognized");
  });

  test("non-json URL fails as unrecognized", () => {
    const result = parseSpec("https://example.com/foo");
    expect(result.isErr()).toBe(true);
    expect(result.unwrapErr().kind).toBe("unrecognized");
  });

  test("name with whitespace fails as invalid-name", () => {
    const result = parseSpec("shadcn:bad name");
    expect(result.isErr()).toBe(true);
    expect(result.unwrapErr().kind).toBe("invalid-name");
  });

  test("name with slash fails as invalid-name", () => {
    const result = parseSpec("shadcn:bad/name");
    expect(result.isErr()).toBe(true);
    expect(result.unwrapErr().kind).toBe("invalid-name");
  });

  test("name with traversal fails as invalid-name", () => {
    const result = parseSpec("shadcn:..");
    expect(result.isErr()).toBe(true);
    expect(result.unwrapErr().kind).toBe("invalid-name");
  });

  test("hyphenated names accepted", () => {
    const result = parseSpec("shadcn:dashboard-01");
    expect(result.isOk()).toBe(true);
  });
});

describe("componentName", () => {
  test("returns shadcn name for shadcn spec", () => {
    const spec = parseSpec("shadcn:button").unwrap();
    expect(componentName(spec)).toBe("button");
  });

  test("derives name from URL for url spec", () => {
    const spec = parseSpec("https://example.com/some/dialog.json").unwrap();
    expect(componentName(spec)).toBe("dialog");
  });
});
