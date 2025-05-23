import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 8 * 60 * 1000,
  expect: {
    timeout: 5000,
  },
  reporter: [['html', { outputFolder: 'playwright-report', open: 'never' }]],
  use: {
    headless: true,
    baseURL: 'https://www.netlify.com',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'retain-on-failure',
  },
});