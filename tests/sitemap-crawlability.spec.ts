// netlify-playwright-tests/tests/sitemap-crawlability.spec.ts
import fs from 'fs';
import path from 'path';
import { test, expect } from '@playwright/test';
import { importantUrls } from '../utils/constants'; // business-critical URLs that are always checked

const SITEMAP_URL_LIMIT = 20; //set here the number of pages to test from the sitemap (default: 20 from the top)

test('Sitemap and crawlability verification (local sitemap)', async ({ request }) => {
  const sitemapPath = path.resolve(__dirname, '../data/sitemap.json');
  const sitemapJson = fs.readFileSync(sitemapPath, 'utf-8');
  const allSitemapUrls: string[] = JSON.parse(sitemapJson);

  const filteredSitemapUrls = allSitemapUrls
    .filter((url) => !importantUrls.includes(url)) // ensure that URLs are not duplicated
    .slice(0, SITEMAP_URL_LIMIT);

  const urlsToCheck = Array.from(new Set([...importantUrls, ...filteredSitemapUrls]));
  console.log(`Checking ${urlsToCheck.length} URLs`);

  // track how many times each URL is checked
  const urlCheckCount = new Map<string, number>();

  for (const rawUrl of urlsToCheck) {
    const url = rawUrl.trim();
    if (!url.startsWith('http')) {
      console.warn(`⚠️ Skipping invalid or relative URL: ${url}`);
      continue;
    }

    urlCheckCount.set(url, (urlCheckCount.get(url) || 0) + 1);

    try {
      const response = await request.get(url, {
        maxRedirects: 5,
        timeout: 10000,
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; SitemapCrawler/1.0)',
        },
      });

      const status = response.status();
      const html = await response.text();

      // extract head content to avoid meta tags in body or comments outside head
      const headMatch = html.match(/<head[^>]*>([\s\S]*?)<\/head>/i);
      const headContent = headMatch ? headMatch[1] : '';

      // regex will ignore meta tags inside HTML comments
      const uncommentedHead = headContent.replace(/<!--[\s\S]*?-->/g, '');

      const metaMatch = uncommentedHead.match(
        /<meta[^>]*name=["']robots["'][^>]*content=["']([^"']*)["']/i
      );

      const contentValueRaw = metaMatch?.[1] || '';
      const contentValue = contentValueRaw.toLowerCase().trim();
      const hasNoIndex = contentValue.includes('noindex');

      // console.log('---');
      // console.log(`[${urlCheckCount.get(url)}] URL: ${url}`);
      // console.log(`Status: ${status}`);
      // console.log(`noindex tag found: ${hasNoIndex}`);
      // console.log(`Snippet: ${html.slice(0, 200).replace(/\n/g, ' ')}`);
      // console.log(`Meta tag content for ${url}: "${contentValue}"`);

      expect.soft(status).toBeLessThan(400);
      if (status >= 400) {
        console.warn(`❌ ${url} is not accessible (status ${status})`);
      } else {
        console.log(`✅ Accessible: ${url} (status ${status})`);
      }

      if (hasNoIndex) {
        console.warn(`⚠️ ${url} should NOT have 'noindex' meta tag (found: ${hasNoIndex})`);
      }
      expect.soft(hasNoIndex, `${url} should NOT have 'noindex' meta tag`).toBeFalsy();
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : String(error);
      console.error(`❌ Error requesting ${url}: ${message}`);
      expect.soft(false, `❌ Request failed for ${url}: ${message}`).toBeTruthy();
    }
  }

  console.log('🟢 Finished sitemap crawlability test');
});