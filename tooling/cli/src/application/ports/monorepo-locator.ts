export interface MonorepoLocator {
  locate(start: string): Promise<string>;
}
