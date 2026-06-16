import type { Fetcher, FetchResponse } from "~/application/ports/fetcher";

export class BunFetcher implements Fetcher {
  async get(url: string): Promise<FetchResponse> {
    const response = await fetch(url);
    const body = await response.text();
    return {
      ok: response.ok,
      status: response.status,
      contentType: response.headers.get("content-type"),
      body,
    };
  }
}
