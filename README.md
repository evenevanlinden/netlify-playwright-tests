# Netlify QA Automation Assessment

This repository contains an automated test suite developed as part of a QA Automation Specialist assessment using **Playwright** and **TypeScript**.

The purpose of the tests is to validate key functionalities and crawlability of the [Netlify](https://www.netlify.com/) website, demonstrating technical skills in test automation, code quality, and testing best practices.

---

## 📂 Test Cases Implemented

### 1. Lead Capture Form Validation
- Verify the presence and functionality of the newsletter subscription form on the homepage
- Test successful form submission with valid data
- Test form validation errors with invalid or missing data
- Verify appropriate user feedback after submission

### 2. Sitemap and Crawlability Verification
- Confirm the existence of the `sitemap.xml`
- Fetch and validate URLs listed in the sitemap (HTTP 200)
- Ensure no unexpected `noindex` meta tags exist
- Verify that key pages are crawlable and indexable

### 3. 404 Link Verification
- Check all links on sitemap-listed pages to ensure they do not return 404 errors

---

## 🛠 Technology Stack

- [Playwright](https://playwright.dev/) – browser automation and API testing
- TypeScript – typed scripting
- Node.js – JavaScript runtime environment

---

## 🧭 Project Structure & Approach

- **Organized by feature:** Each test file targets a specific functionality
- **Efficient use of APIRequestContext:** For fast, headless URL checks
- **Modular and DRY:** Reusable logic and helper functions
- **Readable and maintainable:** Clean assertions, meaningful comments
- **Ready to scale:** Page Object Model or similar design patterns can be adopted easily

---

## 🚀 Setup Instructions

1. Clone the repository:

   ```bash
   git clone https://github.com/evenevanlinden/netlify-playwright-tests.git
   cd netlify-playwright-tests

2. Install dependencies:
   ```bash
   npm install

3. Install Playwright browsers:
   ```bash
   npx playwright install

4. Check Node.js version:
   ```bash
   node -v
**Note:** Node.js v16 or higher is required.

## 🧪 Running the Tests

1. To run all tests:
   ```bash
   npx playwright test

2. To run a specific test file, for example sitemap crawlability:

   ```bash
   npx playwright test tests/sitemap-crawlability.spec.ts

3. View the HTML test report after running tests:

   ````bash
   npx playwright show-report

**Note:** An example static report is included in this repository under the example-report/ directory for reference purposes. You can open example-report/index.html in your browser to preview what a test          report looks like without running the suite.

## 📌 Assumptions & Limitations
🔧 **Test limits**: By default, tests are limited to checking only 10–20 pages for development speed and practicality.  
  To run tests on the entire sitemap, update the test limit in the source code (e.g., set it to `1000000` or another high number).

- Some pages may dynamically generate meta tags, which could result in false positives on noindex detection.
- Sitemap is assumed to be static and publicly accessible.
- The 404 verification test covers only pages listed in the sitemap.
- Network instability or slow responses may occasionally cause timeouts or flakiness.

## 📝 Additional Notes
- The test suite aims for maintainability and clarity rather than exhaustive coverage.
- Proper error handling and test isolation are implemented to minimize flakiness.
- Page Object Model patterns can be extended further as the project scales.

## 📫 Contact
For any questions regarding this assessment or code, please contact: evenevanlinden@gmail.com
