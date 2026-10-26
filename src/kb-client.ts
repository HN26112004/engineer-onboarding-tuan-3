export interface KbArticle {
  id: string;
  title: string;
  url: string;
}

export class KbApiClient {
  constructor(private readonly baseUrl: string) {}

  async searchArticles(query: string): Promise<KbArticle[]> {
    const url = `${this.baseUrl}/articles?query=${encodeURIComponent(query)}`;
    const response = await fetch(url, { method: 'GET' });

    if (!response.ok) {
      throw new Error(`KB API Error: ${response.status} ${response.statusText}`);
    }

    return (await response.json()) as KbArticle[];
  }
}