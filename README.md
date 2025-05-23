# Netlify QA Automation Assessment

This is a Playwright + TypeScript test suite for validating parts of the Netlify website.

## Setup Instructions

```npm install```
```npx playwright install```


# Netlify Playwright QA Automation Assessment

## Overview

This repository contains an automated test suite developed as part of a QA Automation Specialist assessment using Playwright and TypeScript.

The purpose of the tests is to validate key functionalities and crawlability of the [Netlify](https://www.netlify.com/) website, demonstrating technical skills in test automation, code quality, and testing best practices.

## Test Cases Implemented

### 1. Lead Capture Form Validation
- Verify the presence and functionality of the newsletter subscription form on the home page
- Test successful form submission with valid data
- Test form validation errors with invalid or missing data
- Verify that appropriate user feedback is shown after submission

### 2. Sitemap and Crawlability Verification
- Confirm the existence of the sitemap (`/sitemap.xml`)
- Fetch URLs listed in the sitemap and verify they are accessible (HTTP 200)
- Check that pages do not contain unexpected `robots` `noindex` meta tags
- Ensure key pages are crawlable and indexable

### 3. 404 Link Verification
- Crawl through pages and check that all links lead to valid pages (no 404 errors)

## Technology Stack

- [Playwright](https://playwright.dev/) for browser automation and API requests
- TypeScript for type-safe scripting
- Node.js environment

## Project Structure and Approach

- Tests are organized by feature and use Playwright’s `test` runner
- Utilizes APIRequestContext for efficient HTTP checks without loading full pages where possible
- Employed modular functions and clear assertions following DRY principles
- Code is commented for clarity and maintainability

## Setup Instructions

1. Clone this repository:

   ```git clone https://github.com/evenevanlinden/netlify-playwright-tests.git```
   ```cd netlify-playwright-tests```

2. Install dependencies:
   ```npm install```

3. Ensure you have Node.js v16+ installed.

## Running the Tests

   To run all tests:

   ```npx playwright test```

   To run a specific test file, for example sitemap crawlability:

   ```npx playwright test tests/sitemap-crawlability.spec.ts```

   View test reports (HTML) after running tests:

   ```npx playwright show-report```

## Assumptions and Limitations
- Some pages may dynamically generate meta tags, which can lead to false positives on noindex detection.
- The sitemap is assumed to be static and publicly accessible.
- Tests rely on stable network connectivity; occasional timeouts may occur due to network latency.
- The 404 link verification covers pages found within the sitemap but does not recursively crawl the entire site.

## Additional Notes
- The test suite aims for maintainability and clarity rather than exhaustive coverage.
- Proper error handling and test isolation are implemented to minimize flakiness.
- Page Object Model patterns can be extended further as the project scales.

## Contact
For any questions regarding this assessment or code, please contact: evenevanlinden@gmail.com