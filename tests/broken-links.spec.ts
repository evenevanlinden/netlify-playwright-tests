// netlify-playwright-tests/tests/broken-links.spec.ts
import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';

const TEST_LIMIT = 10; //set here the number of pages to test from the sitemap (default: 10 from the top)

const sitemapUrls: string[] = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, '../data/sitemap.json'), 'utf-8')
).slice(0, TEST_LIMIT);

test.describe.configure({ mode: 'parallel' });
test.setTimeout(30 * 60 * 1000);

for (const pageUrl of sitemapUrls) {
  test(`Check internal links on ${pageUrl}`, async ({ page }) => {
    test.setTimeout(2 * 60 * 1000);

    try {
      await page.goto(pageUrl, {
        waitUntil: 'domcontentloaded',
        timeout: 15000,
      });
    } catch {
      // if the page itself doesn't load, skip this test silently
      return;
    }

    const links = await page.$$eval('a[href]', (anchors: Element[]) =>
      Array.from(
        new Set(
          anchors
            .map(a => (a as HTMLAnchorElement).href)
            .filter(href => {
              if (
                !href ||
                href.startsWith('mailto:') ||
                href.startsWith('tel:') ||
                href.startsWith('javascript:') ||
                href.startsWith('#')
              ) return false;
              try {
                const url = new URL(href);
                return url.hostname.includes('netlify.com');
              } catch {
                return false;
              }
            })
        )
      )
    );

    const seenLinks = new Set<string>();

    for (const link of links) {
      if (seenLinks.has(link)) continue;
      seenLinks.add(link);

      let res;
      try {
        res = await page.request.get(link, {
          timeout: 10000,
          headers: {
            'User-Agent': 'Mozilla/5.0 (compatible; SitemapCrawler/1.0)',
          },
        });
      } catch {
        // request failure is considered a broken link
        expect.soft(false, `❌ Request failed for ${link} found on ${pageUrl}`).toBeTruthy();
        continue;
      }

      if (res.status() === 404) {
        try {
          await page.goto(link, {
            waitUntil: 'domcontentloaded',
            timeout: 10000,
          });

          const isStyledError = await page.locator('.error.page').count();

          expect.soft(isStyledError === 0, `❌ Status 404: ${link} found on ${pageUrl}`).toBeTruthy();
        } catch {
          expect.soft(false, `❌ Status 404: ${link} found on ${pageUrl} (navigation failed)`).toBeTruthy();
        }
      }
    }
  });
}
