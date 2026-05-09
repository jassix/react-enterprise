export interface FetchResponse {
  readonly ok: boolean;
  readonly status: number;
  readonly contentType: string | null;
  readonly body: string;
}

export interface Fetcher {
  get(url: string): Promise<FetchResponse>;
}
