import { describe, expect, test } from "bun:test";
import {
  listNamespaces,
  parseRegistryConfig,
  resolveRegistryUrl,
  validateRegistryEntry,
} from "~/domain/registry-config";

describe("parseRegistryConfig", () => {
  test("accepts a valid config", () => {
    const r = parseRegistryConfig({
      registries: { "@bundui": "https://bundui.io/r/{name}.json" },
    });
    expect(r.isOk()).toBe(true);
  });

  test("rejects missing registries key", () => {
    const r = parseRegistryConfig({});
    expect(r.isErr()).toBe(true);
  });

  test("rejects non-url values", () => {
    const r = parseRegistryConfig({ registries: { "@x": "not a url" } });
    expect(r.isErr()).toBe(true);
  });
});

describe("validateRegistryEntry", () => {
  test("accepts a valid namespace + url with placeholder", () => {
    const r = validateRegistryEntry("@bundui", "https://bundui.io/r/{name}.json");
    expect(r.isOk()).toBe(true);
  });

  test("rejects namespace without leading @", () => {
    const r = validateRegistryEntry("bundui", "https://bundui.io/r/{name}.json");
    expect(r.isErr()).toBe(true);
    if (r.isErr()) expect(r.unwrapErr().kind).toBe("invalid-namespace");
  });

  test("rejects url without {name} placeholder", () => {
    const r = validateRegistryEntry("@bundui", "https://bundui.io/r/foo.json");
    expect(r.isErr()).toBe(true);
    if (r.isErr()) expect(r.unwrapErr().kind).toBe("missing-placeholder");
  });

  test("rejects malformed url", () => {
    const r = validateRegistryEntry("@bundui", "not-a-url-{name}");
    expect(r.isErr()).toBe(true);
    if (r.isErr()) expect(r.unwrapErr().kind).toBe("invalid-url");
  });
});

describe("resolveRegistryUrl", () => {
  const config = {
    registries: {
      "@bundui": "https://bundui.io/r/{name}.json",
      "@multi": "https://x.io/{name}/{name}.json",
    },
  };

  test("substitutes {name}", () => {
    expect(resolveRegistryUrl(config, "@bundui", "accordion-default")).toBe(
      "https://bundui.io/r/accordion-default.json",
    );
  });

  test("replaces all occurrences", () => {
    expect(resolveRegistryUrl(config, "@multi", "btn")).toBe(
      "https://x.io/btn/btn.json",
    );
  });

  test("returns null for unknown namespace", () => {
    expect(resolveRegistryUrl(config, "@nope", "x")).toBe(null);
  });
});

describe("listNamespaces", () => {
  test("returns sorted namespaces", () => {
    const config = {
      registries: {
        "@reui": "https://x/{name}.json",
        "@bundui": "https://y/{name}.json",
        "@kibo": "https://z/{name}.json",
      },
    };
    expect(listNamespaces(config)).toEqual(["@bundui", "@kibo", "@reui"]);
  });
});
