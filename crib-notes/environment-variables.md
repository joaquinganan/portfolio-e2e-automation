# Environment Variables in Playwright

## What Are Environment Variables?
- Environment variables allow applications to run in different environments such as **dev**, **staging**, and **production**.
- Each environment usually has different URLs, credentials, or settings.
- Hardcoding values (like URLs or credentials) is bad practice.
- Environment variables allow you to switch environments easily and reuse the same test code.

---

## Using `baseURL` in Playwright
- Playwright provides a built-in `baseURL` option inside the `use` block.
- Instead of hardcoding full URLs in tests:
  - Define `baseURL` once in `playwright.config.ts`.
  - Use `/` or relative paths inside tests.
- This removes duplication and centralizes configuration.
- Tests continue to work exactly the same after refactoring.

---

## Switching Base URLs with Projects
- You can define different environments using **projects**.
- Projects don’t have to represent browsers only; they can represent environments.
- Each project can define its own `baseURL`.
- Running tests with a specific project automatically switches the environment.
- Example use cases:
  - `dev` project → dev URL
  - `staging` project → staging URL
  - `prod` project → production URL

---

## Custom Environment Variables with Test Options
- You cannot define arbitrary environment variables directly in `playwright.config.ts`.
- To support custom variables (e.g., URLs outside `baseURL`):
  1. Create a `test-options.ts` file.
  2. Extend Playwright’s `test` with custom fixtures.
  3. Define placeholders for environment variables (e.g., `globalUrl`).
  4. Import and register these test options in `playwright.config.ts`.
  5. Use the extended `test` object in your tests.
- This approach allows different values per environment while keeping tests clean.
- The test options file acts as a **central registry** for all environment variables used in the framework.

---

## Using `.env` Files and `process.env`
- You can store environment variables in a `.env` file.
- Common use cases:
  - URLs
  - Usernames
  - Passwords
- Format:
  - No quotes
  - `KEY=value`
- Add `.env` to `.gitignore` to protect sensitive data.

### Enabling `.env` Support
- Install the `dotenv` package.
- Enable it in `playwright.config.ts` using `require('dotenv').config()`.
- Access values via `process.env.VARIABLE_NAME`.

---

## Passing Environment Variables via Command Line
- Environment variables can also be passed directly when running tests.
- This overrides values without modifying code or `.env` files.
- Useful for CI/CD pipelines or quick environment switches.

---

## Using NPM Scripts for Environments
- You can define different scripts in `package.json`.
- Each script can pass different environment variables.
- Example use cases:
  - `test:dev`
  - `test:staging`
- This makes environment switching simple and repeatable.

---

## Using Conditional Logic (Ternary Operators)
- You can dynamically assign `baseURL` using `process.env` and ternary operators.
- Example logic:
  - If `DEV=1` → use dev URL
  - Else if `STAGING=1` → use staging URL
  - Else → use default URL
- This approach works without using projects.
- Environment selection is controlled entirely from the command line.

---

## Handling Credentials Securely
- Credentials should never be hardcoded.
- Store usernames and passwords in `.env` files.
- Access them using `process.env`.
- Keep `.env` out of version control.
- This is standard practice for both local development and CI environments.

---

## Key Takeaways
- Playwright supports environment variables in multiple ways:
  - `baseURL`
  - Projects
  - Custom test options
  - `.env` files
  - Command-line variables
  - NPM scripts
- Choose the approach based on flexibility, security, and project size.
- Environment variables keep tests clean, reusable, and secure.
