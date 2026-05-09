export type TemplateVars = Readonly<Record<string, string>>;

export interface TemplateLoader {
  load(absDir: string, vars: TemplateVars): Promise<ReadonlyMap<string, string>>;
}
