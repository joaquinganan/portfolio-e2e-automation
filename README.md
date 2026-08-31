# Portfolio E2E Automation

[![Playwright Tests](https://github.com/joaquinganan/portfolio-e2e-automation/actions/workflows/playwright.yml/badge.svg)](https://github.com/joaquinganan/portfolio-e2e-automation/actions/workflows/playwright.yml)

End-to-end automation for [joaquinganan.dev](https://joaquinganan.dev), built with Playwright and JavaScript. The project demonstrates reliable cross-browser testing, responsive validation, reusable fixtures, failure diagnostics, and continuous integration.

## Current coverage

- Portfolio homepage title and critical content
- Navigation to intro, expertise, experience, work, impact, and contact sections
- Section visibility after in-page navigation
- External-link destinations without depending on third-party websites
- Back-to-top behavior
- Horizontal-overflow and critical-content checks on mobile viewports

## Tech stack

- JavaScript and Node.js
- Playwright Test
- GitHub Actions
- Page/component object pattern
- Environment-specific configuration with dotenv

## Browser matrix

| Project | Coverage |
| --- | --- |
| `chromium-desktop` | Navigation and content in Desktop Chrome |
| `firefox-desktop` | Navigation and content in Desktop Firefox |
| `webkit-desktop` | Navigation and content in Desktop Safari |
| `mobile-chrome` | Responsive checks using Pixel 7 |
| `mobile-safari` | Responsive checks using iPhone 15 |

The mobile projects intentionally run only `responsive.spec.js`; this keeps feedback focused and avoids duplicating the entire desktop regression suite.

## Project structure

```text
portfolio-e2e-automation/
├── .github/workflows/       # GitHub Actions workflow
├── crib-notes/              # Personal Playwright reference notes
├── fixtures/                # Custom Playwright fixtures
├── pages/                   # Portfolio page/component objects
├── tests/                   # Navigation and responsive specifications
├── utils/                   # Centralized test data
├── .env.example             # Safe environment template
└── playwright.config.js     # Browsers, diagnostics, and runtime configuration
```

## Getting started

Prerequisites: Node.js LTS, npm, and Git.

```bash
git clone https://github.com/joaquinganan/portfolio-e2e-automation.git
cd portfolio-e2e-automation
npm ci
npx playwright install
```

Create the local environment file:

```bash
cp .env.example .env.local
```

Update `BASE_URL` in `.env.local` if your portfolio runs on a different local URL.

## Commands

| Command | Purpose |
| --- | --- |
| `npm run test:local` | Local smoke suite |
| `npm run test:local:full` | Complete suite against the local URL |
| `npm run test:prod:smoke` | Production smoke suite |
| `npm run test:prod` | Complete production suite |
| `npm run test:regression` | Production tests tagged `@regression` |
| `npm run test:responsive` | Production responsive suite |
| `npm run test:list` | List production test executions without running them |
| `npm run test:ui` | Open Playwright UI mode locally |
| `npm run report` | Open the latest HTML report |

## Diagnostics

The framework records:

- Trace on the first retry
- Screenshot on failure
- Video retained on failure
- HTML report
- GitHub Actions annotations in CI

`BASE_URL` is validated when the configuration loads, so missing environment setup fails immediately with a useful message.

## Continuous integration

GitHub Actions runs the production suite on:

- Pushes to `main`
- Pull requests targeting `main`
- A daily 06:00 UTC schedule
- Manual workflow dispatch

The workflow caches npm dependencies and retains the HTML report for 14 days. Failed runs also upload traces, screenshots, videos, and error context from `test-results/`.

## Roadmap

- Add automated accessibility checks with `@axe-core/playwright`
- Validate the downloadable résumé
- Add Spanish-language coverage
- Add visual regression checks for critical sections
- Introduce API health checks if the portfolio gains backend endpoints

## Author

**Joaquín Gañán**

- [Portfolio](https://joaquinganan.dev)
- [GitHub](https://github.com/joaquinganan)

## License

This project is licensed under the ISC License.
