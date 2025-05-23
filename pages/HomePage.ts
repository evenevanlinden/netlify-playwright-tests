// pages/HomePage.ts
import { Locator, Page } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly subscribeButton: Locator;

  constructor(page: Page) {
    this.page = page;

    // Newsletter form elements in the footer
    this.emailInput = page.locator('footer input[type="email"]');
    this.subscribeButton = page.locator('footer input[type="submit"][value="Subscribe"]');
  }

  async goto() {
    await this.page.goto('/');
  }

  async scrollToFooter() {
    await this.page.locator('footer.site-footer').scrollIntoViewIfNeeded();
  }

  async submitNewsletter(email: string) {
    await this.scrollToFooter();
    await this.emailInput.fill(email);
    await this.subscribeButton.click();
  }
}
