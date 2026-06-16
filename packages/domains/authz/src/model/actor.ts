import type schema from "@repo/std/schema";
import { array, object, record, string, unknown } from "@repo/std/schema";

export const ActorSchema = object({
  id: string(),
  roles: array(string()),
  attributes: record(string(), unknown()),
});
export type Actor = schema.InferOutput<typeof ActorSchema>;
