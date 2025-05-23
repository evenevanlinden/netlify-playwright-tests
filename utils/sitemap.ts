// netlify-playwright-tests\utils\sitemap.ts
import { APIRequestContext } from '@playwright/test';
import { parseStringPromise } from 'xml2js';

export async function fetchSitemapUrls(request: APIRequestContext, sitemapUrl: string, limit = Infinity): Promise<string[]> {
  const res = await request.get(sitemapUrl);
  if (res.status() !== 200) throw new Error(`Failed to fetch sitemap: ${sitemapUrl}`);

  const xml = await res.text();
  const parsed = await parseStringPromise(xml);
  const urls: string[] = parsed.urlset.url.map((u: any) => u.loc[0]);
  return urls.slice(0, limit);
}
