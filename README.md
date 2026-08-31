# Portfolio E2E Automation

[![Playwright Tests](https://github.com/joaquinganan/portfolio-e2e-automation/actions/workflows/playwright.yml/badge.svg)](https://github.com/joaquinganan/portfolio-e2e-automation/actions/workflows/playwright.yml)

End-to-end test automation project for [joaquinganan.dev](https://joaquinganan.dev), built with [Playwright](https://playwright.dev/) and JavaScript.

The project is designed to validate the portfolio's core user journeys, navigation, content, and responsive behavior across desktop and mobile browsers. It also serves as a practical QA automation portfolio demonstrating cross-browser testing, maintainable test architecture, failure diagnostics, and continuous integration.

> **Project status:** Initial framework setup. The Playwright configuration and CI pipeline are available; portfolio-specific test suites and page objects are under development.

## Test coverage

Planned coverage includes:

- Homepage content and critical UI elements
- Navigation between portfolio sections
- Work, experience, expertise, and contact sections
- External links and downloadable resources
- Responsive behavior on desktop and mobile viewports
- Cross-browser compatibility
- Basic accessibility and UI validation

The repository currently contains Playwright's starter example tests. Portfolio-specific test files are scaffolded for navigation and responsive testing.

## Tech stack

- JavaScript
- Node.js
- Playwright Test
- GitHub Actions
- Page Object Model (planned structure)

## Browser matrix

Tests are configured to run against:

| Project | Browser or device |
| --- | --- |
| `chromium-desktop` | Desktop Chrome |
| `firefox-desktop` | Desktop Firefox |
| `webkit-desktop` | Desktop Safari |
| `Mobile Chrome` | Pixel 5 |
| `Mobile Safari` | iPhone 13 |

Desktop projects use a `1500 × 720` viewport.

## Project structure

```text
portfolio-e2e-automation/
├── .github/workflows/       # GitHub Actions CI workflow
├── fixtures/                # Custom Playwright fixtures
├── pages/                   # Page objects and section models
├── tests/                   # End-to-end test specifications
├── utils/                   # Helpers and reusable test data
├── playwright.config.js     # Playwright configuration
├── cli-commands.md          # Useful Playwright CLI commands
└── environment-variables.md # Environment variable notes
```

Some scaffolded files are currently empty and will be implemented as the test suite grows.

## Prerequisites

Install the following before running the project:

- [Node.js](https://nodejs.org/) LTS
- npm
- Git

## Getting started

Clone the repository:

```bash
git clone https://github.com/joaquinganan/portfolio-e2e-automation.git
cd portfolio-e2e-automation
```

Install project dependencies:

```bash
npm ci
```

Install the Playwright browsers:

```bash
npx playwright install
```

On Linux or in a CI environment, install the required system dependencies as well:

```bash
npx playwright install --with-deps
```

## Running the tests

Run the complete test suite:

```bash
npx playwright test
```

Run tests in headed mode:

```bash
npx playwright test --headed
```

Run tests with the Playwright UI:

```bash
npx playwright test --ui
```

Run a specific browser project:

```bash
npx playwright test --project=chromium-desktop
```

Run a specific test file:

```bash
npx playwright test tests/navigation.spec.js
```

Open the latest HTML report:

```bash
npx playwright show-report
```

Additional examples are available in [cli-commands.md](./cli-commands.md).

## Configuration and diagnostics

The base URL is configured as:

```text
https://joaquinganan.dev
```

The framework captures useful diagnostics when failures occur:

- Trace on the first retry
- Screenshot on failure
- Video retained on failure
- HTML report
- GitHub Actions annotations

Tests run fully in parallel. In CI, failed tests receive up to two retries and execution uses two workers.

## Continuous integration

The GitHub Actions workflow runs automatically on:

- Pushes to `main` or `master`
- Pull requests targeting `main` or `master`

The workflow installs dependencies and Playwright browsers, executes the full suite, and uploads the HTML report as an artifact for 30 days.

## Roadmap

- Replace the starter example with portfolio-specific tests
- Implement reusable page and section objects
- Add navigation and responsive test suites
- Add custom fixtures and centralized test data
- Validate contact and external-link behavior
- Add accessibility checks
- Add smoke and regression tags
- Expand CI execution and reporting

## Author

**Joaquín Gañán**

- Portfolio: [joaquinganan.dev](https://joaquinganan.dev)
- GitHub: [@joaquinganan](https://github.com/joaquinganan)

## License

This project currently uses the ISC license as declared in `package.json`.
