// netlify-playwright-tests/tests/form-validation.spec.ts
import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';

// helper function to generate unique valid emails
function generateValidEmail(): string {
  const timestamp = Date.now();
  return `qa.automation.${timestamp}@gmail.com`;
}

test.describe('Lead Capture Form Validation', () => {
  test('should validate newsletter form behavior', async ({ page }) => {
    const homePage = new HomePage(page);

    // navigate to the home page
    await homePage.goto();

    // verify the newsletter form is present
    await expect(homePage.emailInput).toBeVisible();
    await expect(homePage.subscribeButton).toBeVisible();

    // test form validation with invalid emails
    const invalidEmails = [
      'plainaddress',
      'missingatsign.com',
      'missingdomain@',
      '@missingusername.com',
      'name@.com',
      'name@domain..com',
      'name@domain,com',
    ];

    for (const email of invalidEmails) {
      await homePage.submitNewsletter(email);
      await expect.soft(page).not.toHaveURL(/.*thanks-for-signing-up.*/);
      await expect.soft(homePage.emailInput).toHaveClass(/error/);
    }

    // test form submission with a valid email
    const validEmail = generateValidEmail();
    await homePage.submitNewsletter(validEmail);
    await expect(page).toHaveURL(/.*thanks-for-signing-up.*/);
  });
});
