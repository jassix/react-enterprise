import { describe, expect, test } from "bun:test";

import { map, pipe } from "./fp";
import { match } from "./match";
import { Err, None, Ok, Some } from "./result";
import { object, parse, string } from "./schema";

// Smoke tests: each subpath re-exports its upstream library's surface.

describe("@repo/std subpaths", () => {
  test("fp re-exports Remeda", () => {
    expect(typeof pipe).toBe("function");
    expect(typeof map).toBe("function");
    expect(pipe(2, (x: number) => x + 1)).toBe(3);
  });

  test("match re-exports ts-pattern", () => {
    const result = match({ type: "a" as const })
      .with({ type: "a" }, () => "ok")
      .exhaustive();
    expect(result).toBe("ok");
  });

  test("result re-exports oxide.ts", () => {
    expect(Ok(1).isOk()).toBe(true);
    expect(Err("e").isErr()).toBe(true);
    expect(Some(1).isSome()).toBe(true);
    expect(None.isNone()).toBe(true);
  });

  test("schema re-exports Valibot", () => {
    const Schema = object({ name: string() });
    expect(parse(Schema, { name: "x" })).toEqual({ name: "x" });
  });
});
