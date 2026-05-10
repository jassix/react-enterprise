import schema, { integer, minValue, number, object, picklist, pipe } from "@repo/std/schema";

export const CurrencySchema = picklist(["USD", "EUR", "GBP"]);
export type Currency = schema.InferOutput<typeof CurrencySchema>;

export const MoneySchema = object({
  amount: pipe(number(), integer(), minValue(0)),
  currency: CurrencySchema,
});
export type Money = schema.InferOutput<typeof MoneySchema>;
