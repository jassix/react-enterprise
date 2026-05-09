import { describe, expect, test } from "bun:test";
import { buildKubbConfig } from "~/domain/sdk/kubb-config";
import { PLUGINS } from "~/domain/sdk/plugin";

describe("buildKubbConfig", () => {
  test("includes always-on imports and oas plugin call", () => {
    const out = buildKubbConfig({ plugins: [], specFilename: "spec.yml" });
    expect(out).toContain(`import { defineConfig } from "@kubb/core";`);
    expect(out).toContain(`import { pluginOas } from "@kubb/plugin-oas";`);
    expect(out).toContain(`pluginOas(),`);
  });

  test("renders ts + client + react-query in declaration order", () => {
    const out = buildKubbConfig({
      plugins: ["client", "react-query", "ts"],
      specFilename: "spec.yml",
    });
    const tsIdx = out.indexOf("pluginTs(");
    const clientIdx = out.indexOf("pluginClient(");
    const hooksIdx = out.indexOf("pluginReactQuery(");
    expect(tsIdx).toBeLessThan(clientIdx);
    expect(clientIdx).toBeLessThan(hooksIdx);
  });

  test("emits cypress without output arg", () => {
    const out = buildKubbConfig({ plugins: ["cypress"], specFilename: "spec.yml" });
    expect(out).toContain(`pluginCypress(),`);
    expect(out).not.toContain(`pluginCypress({ output:`);
  });

  test("emits other plugins with output path matching meta.outputDir", () => {
    const out = buildKubbConfig({
      plugins: ["zod", "msw", "faker"],
      specFilename: "spec.yml",
    });
    expect(out).toContain(`pluginZod({ output: { path: "${PLUGINS.zod.outputDir}" } })`);
    expect(out).toContain(`pluginMsw({ output: { path: "${PLUGINS.msw.outputDir}" } })`);
    expect(out).toContain(`pluginFaker({ output: { path: "${PLUGINS.faker.outputDir}" } })`);
  });

  test("does not import unselected plugins", () => {
    const out = buildKubbConfig({ plugins: ["ts"], specFilename: "spec.yml" });
    expect(out).not.toContain(`@kubb/plugin-zod`);
    expect(out).not.toContain(`@kubb/plugin-cypress`);
    expect(out).not.toContain(`pluginMsw`);
  });

  test("uses provided spec filename", () => {
    const out = buildKubbConfig({ plugins: ["ts"], specFilename: "spec.json" });
    expect(out).toContain(`path: "./openapi/spec.json"`);
  });
});
