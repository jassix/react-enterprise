import schema, {
  array,
  date,
  integer,
  minValue,
  nonEmpty,
  nullable,
  number,
  object,
  picklist,
  pipe,
  string,
} from "@repo/std/schema";

import { CurrencySchema, MoneySchema } from "./money";

export const InvoiceIdSchema = pipe(string(), nonEmpty());
export type InvoiceId = schema.InferOutput<typeof InvoiceIdSchema>;

export const CustomerIdSchema = pipe(string(), nonEmpty());
export type CustomerId = schema.InferOutput<typeof CustomerIdSchema>;

export const LineItemSchema = object({
  id: pipe(string(), nonEmpty()),
  description: pipe(string(), nonEmpty()),
  quantity: pipe(number(), integer(), minValue(1)),
  unitPrice: MoneySchema,
});
export type LineItem = schema.InferOutput<typeof LineItemSchema>;

export const InvoiceStatusSchema = picklist(["draft", "issued", "paid", "void"]);
export type InvoiceStatus = schema.InferOutput<typeof InvoiceStatusSchema>;

export const InvoiceSchema = object({
  id: InvoiceIdSchema,
  customerId: CustomerIdSchema,
  currency: CurrencySchema,
  status: InvoiceStatusSchema,
  items: array(LineItemSchema),
  issuedAt: nullable(date()),
});
export type Invoice = schema.InferOutput<typeof InvoiceSchema>;
