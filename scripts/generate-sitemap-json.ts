// netlify-playwright-tests\scripts\generate-sitemap-json.ts
import fs from 'fs';
import path from 'path';
import { request } from '@playwright/test';
import { fetchSitemapUrls } from '../utils/sitemap';
import { SITEMAP_URL } from '../utils/constants';

(async () => {
  const apiRequest = await request.newContext();
  const urls = await fetchSitemapUrls(apiRequest, SITEMAP_URL);

  const outputPath = path.resolve(__dirname, '../data/sitemap.json');
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, JSON.stringify(urls, null, 2));

  console.log(`✅ Saved ${urls.length} URLs to sitemap.json`);
})();
