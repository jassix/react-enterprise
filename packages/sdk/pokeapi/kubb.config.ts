import { defineConfig } from "@kubb/core";
import { pluginOas } from "@kubb/plugin-oas";
import { pluginTs } from "@kubb/plugin-ts";
import { pluginClient } from "@kubb/plugin-client";
import { pluginReactQuery } from "@kubb/plugin-react-query";
import { pluginZod } from "@kubb/plugin-zod";
import { pluginFaker } from "@kubb/plugin-faker";
import { pluginMsw } from "@kubb/plugin-msw";
import { pluginCypress } from "@kubb/plugin-cypress";

export default defineConfig({
  root: ".",
  input: {
    path: "./openapi/spec.yml",
  },
  output: {
    path: "./src/gen",
    clean: true,
    format: "oxfmt",
  },
  plugins: [
    pluginOas(),
    pluginTs({
      output: { path: "models" },
    }),
    pluginClient({
      output: { path: "clients" },
    }),
    pluginReactQuery({
      output: { path: "hooks" },
    }),
    pluginZod({
      output: { path: "zod" },
    }),
    pluginFaker({
      output: { path: "mocks" },
    }),
    pluginMsw({
      output: { path: "msw" },
    }),
    pluginCypress(),
  ],
});
