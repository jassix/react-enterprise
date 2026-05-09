export type SpecSource =
  | { readonly kind: "file"; readonly path: string }
  | { readonly kind: "url"; readonly url: string }
  | { readonly kind: "placeholder" };
