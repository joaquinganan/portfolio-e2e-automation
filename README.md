# Portfolio E2E Automation

[![Playwright Tests](https://github.com/joaquinganan/portfolio-e2e-automation/actions/workflows/playwright.yml/badge.svg)](https://github.com/joaquinganan/portfolio-e2e-automation/actions/workflows/playwright.yml)

End-to-end test automation framework for [joaquinganan.dev](https://joaquinganan.dev), built with Playwright and JavaScript.

This project validates the portfolio’s main user journeys, section navigation, external links, and responsive behavior. It also demonstrates practical QA automation concepts such as reusable fixtures, Page Objects, data-driven testing, cross-browser execution, environment management, failure diagnostics, and continuous integration.

## Current coverage

- Portfolio homepage title and critical content
- Navigation to the following sections:
  - Intro
  - Expertise
  - Experience
  - Work
  - Impact
  - Contact
- URL fragment validation after section navigation
- Section visibility after navigation
- External-link destinations without opening third-party websites
- Back-to-top behavior
- Horizontal-overflow validation on mobile viewports
- Critical-content availability on mobile devices
- Cross-browser desktop coverage
- Responsive mobile coverage

## Tech stack

- JavaScript
- Node.js
- Playwright Test
- GitHub Actions
- dotenv
- cross-env
- Page Object pattern
- Custom Playwright fixtures
- Data-driven tests

## Browser matrix

| Project | Browser or device | Test coverage |
| --- | --- | --- |
| `chromium-desktop` | Desktop Chrome | Navigation and content |
| `firefox-desktop` | Desktop Firefox | Navigation and content |
| `webkit-desktop` | Desktop Safari | Navigation and content |
| `mobile-chrome` | Pixel 7 | Responsive behavior |
| `mobile-safari` | iPhone 15 | Responsive behavior |

The mobile projects intentionally execute only `responsive.spec.js`. This avoids duplicating the complete desktop regression suite while still validating the portfolio on representative mobile viewports.

## Project structure

```text
portfolio-e2e-automation/
├── .github/
│   └── workflows/
│       └── playwright.yml       # GitHub Actions workflow
├── crib-notes/                  # Personal Playwright reference notes
├── fixtures/
│   └── test-fixtures.js         # Custom Playwright fixtures
├── pages/
│   └── PortfolioPage.js         # Portfolio Page Object
├── tests/
│   ├── navigation.spec.js       # Navigation and external-link tests
│   └── responsive.spec.js       # Mobile responsive tests
├── utils/
│   └── test-data.js             # Centralized test data
├── .env.example                 # Local environment template
├── .gitignore
├── LICENSE
├── package.json
├── package-lock.json
├── playwright.config.js
└── README.md
```

## Prerequisites

Install the following before running the project:

- [Node.js](https://nodejs.org/) LTS
- npm
- Git
- Visual Studio Code, recommended

## Installation

Clone the repository:

```bash
git clone https://github.com/joaquinganan/portfolio-e2e-automation.git
cd portfolio-e2e-automation
```

Install the Node.js dependencies:

```bash
npm ci
```

Install the Playwright browsers:

```bash
npx playwright install
```

On Linux or CI environments, install the required system dependencies as well:

```bash
npx playwright install --with-deps
```

## Environment configuration

The framework supports local and production test execution.

### Local environment

The local portfolio runs at:

```text
http://localhost:5173
```

Create `.env.local` from the provided example.

On Windows PowerShell:

```powershell
Copy-Item .env.example .env.local
```

On macOS or Linux:

```bash
cp .env.example .env.local
```

The resulting `.env.local` file should contain:

```env
BASE_URL=http://localhost:5173
```

The `.env.local` file is ignored by Git and should not be committed.

Before executing local tests, start the portfolio development server from the portfolio project:

```bash
npm run dev
```

Then confirm that the application is available at:

```text
http://localhost:5173
```

### Production environment

The production portfolio is available at:

```text
https://joaquinganan.dev
```

Production commands provide the public URL directly through the npm scripts. Therefore, a local `.env.production` file is not required.

GitHub Actions also provides the production URL through the workflow environment:

```yaml
env:
  BASE_URL: https://joaquinganan.dev
```

## Running local tests

The local development server must be running before using these commands.

Run the local smoke suite:

```bash
npm run test:local
```

Run the complete local suite:

```bash
npm run test:local:full
```

Open Playwright UI mode against the local portfolio:

```bash
npm run test:ui
```

## Running production tests

The local portfolio server does not need to be running for production tests.

Run the complete production suite:

```bash
npm run test:prod
```

Run only production smoke tests:

```bash
npm run test:prod:smoke
```

Run only production regression tests:

```bash
npm run test:prod:regression
```

Run only production responsive tests:

```bash
npm run test:prod:responsive
```

List all production test executions without running them:

```bash
npm run test:prod:list
```

## Available commands

| Command | Purpose |
| --- | --- |
| `npm run test:local` | Run smoke tests against `http://localhost:5173` |
| `npm run test:local:full` | Run the complete suite against the local portfolio |
| `npm run test:ui` | Open Playwright UI mode against the local portfolio |
| `npm run test:prod` | Run the complete suite against `https://joaquinganan.dev` |
| `npm run test:prod:smoke` | Run production tests tagged `@smoke` |
| `npm run test:prod:regression` | Run production tests tagged `@regression` |
| `npm run test:prod:responsive` | Run the responsive production suite |
| `npm run test:prod:list` | List production test executions |
| `npm run report` | Open the latest Playwright HTML report |

## Running a specific browser

Run the production tests in Desktop Chrome:

```bash
npm run test:prod -- --project=chromium-desktop
```

Run the production tests in Desktop Firefox:

```bash
npm run test:prod -- --project=firefox-desktop
```

Run the production tests in Desktop Safari:

```bash
npm run test:prod -- --project=webkit-desktop
```

Run the responsive suite using the Pixel 7 project:

```bash
npm run test:prod:responsive -- --project=mobile-chrome
```

Run the responsive suite using the iPhone 15 project:

```bash
npm run test:prod:responsive -- --project=mobile-safari
```

## Running tests in headed mode

Run production tests in Chrome while displaying the browser:

```bash
npm run test:prod -- --project=chromium-desktop --headed
```

## Debugging tests

Debug all tests in a specific browser:

```bash
npm run test:prod -- --project=chromium-desktop --debug
```

Debug a test by its title:

```bash
npm run test:prod -- --project=chromium-desktop --debug -g "loads the portfolio"
```

## Playwright UI mode

Start the local portfolio server first:

```bash
npm run dev
```

Then, from the automation project, open Playwright UI mode:

```bash
npm run test:ui
```

Playwright UI mode allows you to:

- Run individual tests
- Select browser projects
- Watch every test action
- Inspect locators
- Review the execution timeline
- View screenshots
- Open traces
- Debug failed assertions

## Running tests from Visual Studio Code

Install the official Microsoft extension:

```text
Playwright Test for VSCode
```

After installing it:

1. Open the `portfolio-e2e-automation` folder in Visual Studio Code.
2. Open the Testing panel using the flask icon.
3. Allow the extension to detect `playwright.config.js`.
4. Select the browser projects you want to execute.
5. Use the play button next to a test, file, or project.
6. Use the debug button to run a test with the Playwright Inspector.

For local execution through the VS Code extension, make sure:

- `.env.local` exists.
- `BASE_URL` is set to `http://localhost:5173`.
- The local portfolio server is running.

## Test tags

The framework uses tags to organize execution.

### Smoke tests

Smoke tests validate the portfolio’s most critical functionality:

```text
@smoke
```

Run them locally:

```bash
npm run test:local
```

Run them against production:

```bash
npm run test:prod:smoke
```

### Regression tests

Regression tests provide broader functional coverage:

```text
@regression
```

Run them against production:

```bash
npm run test:prod:regression
```

### Responsive tests

Responsive tests validate mobile behavior:

```text
@responsive
```

Run them against production:

```bash
npm run test:prod:responsive
```

## Test architecture

### Page Object

`PortfolioPage.js` centralizes reusable locators and interactions:

```js
export class PortfolioPage {
  constructor(page) {
    this.page = page;
    this.homeLink = page.getByRole('link', {
      name: 'Joaquín Gañán - home',
    });
    this.portrait = page.getByRole('img', {
      name: 'Portrait of Joaquín Gañán',
    });
    this.backToTopLink = page.getByRole('link', {
      name: 'Back to top',
    });
  }

  async goto() {
    await this.page.goto('/');
  }

  navigationLink(name) {
    return this.page
      .getByRole('link', { name, exact: true })
      .first();
  }

  section(id) {
    return this.page.locator(`#${id}`);
  }

  externalLink(name) {
    return this.page
      .getByRole('link', { name, exact: true })
      .first();
  }
}
```

### Custom fixture

The custom fixture creates the Page Object and makes it available to every test:

```js
import { test as base } from '@playwright/test';
import { PortfolioPage } from '../pages/PortfolioPage';

export const test = base.extend({
  portfolioPage: async ({ page }, use) => {
    await use(new PortfolioPage(page));
  },
});

export { expect } from '@playwright/test';
```

### Data-driven navigation

Navigation data is centralized in `utils/test-data.js`:

```js
export const sectionNavigation = [
  { name: 'Expertise', id: 'expertise' },
  { name: 'Experience', id: 'experience' },
  { name: 'Work', id: 'work' },
  { name: 'Contact', id: 'contact' },
];
```

The navigation suite generates an independent test for every section:

```js
for (const { name, id } of sectionNavigation) {
  test(`${name} link opens the ${id} section @regression`, async ({
    page,
    portfolioPage,
  }) => {
    await portfolioPage.navigationLink(name).click();

    await expect(page).toHaveURL(new RegExp(`#${id}$`));
    await expect(portfolioPage.section(id)).toBeInViewport();
  });
}
```

## Diagnostics

The framework collects the following diagnostics:

- Trace on the first retry
- Screenshot when a test fails
- Video retained when a test fails
- Playwright HTML report
- GitHub Actions annotations
- Error context for failed tests

Open the latest local HTML report:

```bash
npm run report
```

## Continuous integration

The GitHub Actions workflow runs the production suite automatically on:

- Pushes to `main`
- Pull requests targeting `main`
- A daily schedule at 06:00 UTC
- Manual workflow dispatch

The CI workflow:

1. Checks out the repository.
2. Configures Node.js.
3. Restores the npm cache when available.
4. Installs project dependencies.
5. Installs Playwright browsers and system dependencies.
6. Runs the complete production suite.
7. Uploads the HTML report.
8. Uploads traces, screenshots, videos, and error context when tests fail.

GitHub Actions retains the generated artifacts for 14 days.

## Roadmap

- Add automated accessibility testing with `@axe-core/playwright`
- Validate the downloadable résumé
- Add Spanish-language coverage
- Add visual regression testing for critical sections
- Expand mobile navigation coverage
- Add API health checks if the portfolio gains backend endpoints

## Author

**Joaquín Gañán**

- Portfolio: [joaquinganan.dev](https://joaquinganan.dev)
- GitHub: [@joaquinganan](https://github.com/joaquinganan)

## License

This project is licensed under the ISC License.