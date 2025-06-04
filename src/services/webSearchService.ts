export class WebSearchService {
  static async search(query: string): Promise<string[]> {
    const url = `https://api.duckduckgo.com/?q=${encodeURIComponent(query)}&format=json&no_redirect=1`;
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`Web search failed with status ${res.status}`);
      const data = await res.json();
      const results: string[] = [];
      if (Array.isArray(data.RelatedTopics)) {
        for (const item of data.RelatedTopics.slice(0, 3)) {
          if (item.Text) results.push(item.Text);
          else if (Array.isArray(item.Topics)) {
            for (const sub of item.Topics.slice(0, 1)) {
              if (sub.Text) results.push(sub.Text);
            }
          }
        }
      }
      return results;
    } catch (err) {
      console.error('WebSearchService.search error:', err);
      return [];
    }
  }
}
