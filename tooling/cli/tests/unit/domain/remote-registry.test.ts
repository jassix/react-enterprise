import { describe, expect, test } from "bun:test";
import { mergeWithCatalog, parseRemoteCatalog, searchCatalog } from "~/domain/remote-registry";

const sample = [
  {
    name: "@bundui",
    url: "https://bundui.io/r/{name}.json",
    homepage: "https://bundui.io",
    description: "150+ Tailwind/shadcn components",
  },
  {
    name: "@aceternity",
    url: "https://ui.aceternity.com/registry/{name}.json",
    homepage: "https://ui.aceternity.com",
    description: "Animated, interactive components",
  },
  {
    name: "@cult-ui",
    url: "https://cult-ui.com/r/{name}.json",
    description: "Curated headless components animated with Framer Motion",
  },
];

describe("parseRemoteCatalog", () => {
  test("accepts the shadcn catalog shape", () => {
    const r = parseRemoteCatalog(sample);
    expect(r.isOk()).toBe(true);
    expect(r.unwrap()).toHaveLength(3);
  });

  test("rejects entries with bad namespace", () => {
    const r = parseRemoteCatalog([{ name: "no-at", url: "https://x/{name}.json" }]);
    expect(r.isErr()).toBe(true);
  });

  test("rejects entries with bad url", () => {
    const r = parseRemoteCatalog([{ name: "@x", url: "not-a-url" }]);
    expect(r.isErr()).toBe(true);
  });

  test("rejects non-array payload", () => {
    const r = parseRemoteCatalog({ something: "else" });
    expect(r.isErr()).toBe(true);
  });
});

describe("mergeWithCatalog", () => {
  test("catalog entries become registries", () => {
    const merged = mergeWithCatalog({ registries: {} }, sample);
    expect(merged.registries["@bundui"]).toBe("https://bundui.io/r/{name}.json");
    expect(merged.registries["@aceternity"]).toBe("https://ui.aceternity.com/registry/{name}.json");
  });

  test("local entries take precedence over catalog", () => {
    const local = { registries: { "@bundui": "https://my-fork/r/{name}.json" } };
    const merged = mergeWithCatalog(local, sample);
    expect(merged.registries["@bundui"]).toBe("https://my-fork/r/{name}.json");
  });

  test("skips catalog entries without {name} placeholder", () => {
    const merged = mergeWithCatalog({ registries: {} }, [
      { name: "@bad", url: "https://bad/static.json" },
      { name: "@good", url: "https://good/{name}.json" },
    ]);
    expect(merged.registries["@bad"]).toBeUndefined();
    expect(merged.registries["@good"]).toBeDefined();
  });
});

describe("searchCatalog", () => {
  test("matches by namespace", () => {
    expect(searchCatalog(sample, "bundui")).toHaveLength(1);
  });

  test("matches by description", () => {
    const matches = searchCatalog(sample, "framer motion");
    expect(matches[0]?.name).toBe("@cult-ui");
  });

  test("matches case-insensitively", () => {
    expect(searchCatalog(sample, "ANIMATED")).toHaveLength(2);
  });

  test("empty query returns all", () => {
    expect(searchCatalog(sample, "")).toHaveLength(3);
  });

  test("no matches returns empty", () => {
    expect(searchCatalog(sample, "xyzzy-no-such-thing")).toHaveLength(0);
  });
});
