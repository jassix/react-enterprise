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

  test("returns name for registry spec", () => {
    const spec = parseSpec("@bundui/accordion-default", {
      registries: { "@bundui": "https://bundui.io/r/{name}.json" },
    }).unwrap();
    expect(componentName(spec)).toBe("accordion-default");
  });
});

describe("parseSpec with custom registries", () => {
  const config = {
    registries: {
      "@bundui": "https://bundui.io/r/{name}.json",
      "@reui": "https://reui.io/r/{name}.json",
    },
  };

  test("@bundui/<name> resolves via config", () => {
    const result = parseSpec("@bundui/accordion-default", config);
    expect(result.isOk()).toBe(true);
    const spec = result.unwrap();
    expect(spec.source).toBe("registry");
    if (spec.source === "registry") {
      expect(spec.namespace).toBe("@bundui");
      expect(spec.name).toBe("accordion-default");
      expect(spec.url).toBe("https://bundui.io/r/accordion-default.json");
    }
  });

  test("@reui/<name> resolves via config", () => {
    const result = parseSpec("@reui/dialog", config);
    expect(result.isOk()).toBe(true);
    const spec = result.unwrap();
    if (spec.source === "registry") {
      expect(spec.url).toBe("https://reui.io/r/dialog.json");
    }
  });

  test("unknown namespace fails with known list", () => {
    const result = parseSpec("@nope/dialog", config);
    expect(result.isErr()).toBe(true);
    const err = result.unwrapErr();
    expect(err.kind).toBe("unknown-namespace");
    if (err.kind === "unknown-namespace") {
      expect(err.namespace).toBe("@nope");
      expect(err.known).toContain("@bundui");
      expect(err.known).toContain("@reui");
    }
  });

  test("custom registry name with bad chars fails as invalid-name", () => {
    const result = parseSpec("@bundui/bad name", config);
    expect(result.isErr()).toBe(true);
    expect(result.unwrapErr().kind).toBe("invalid-name");
  });

  test("@shadcn/ remains builtin even when other registries are configured", () => {
    const result = parseSpec("@shadcn/button", config);
    expect(result.isOk()).toBe(true);
    expect(result.unwrap().source).toBe("shadcn");
  });
});
