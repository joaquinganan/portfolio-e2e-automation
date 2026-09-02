import { test, expect } from "../fixtures/test-fixtures";

test.beforeEach(async ({ portfolioPage }) => portfolioPage.goto());

test("expertise cards expand and can return to a fully collapsed state @regression", async ({ page }) => {
  const strategy = page.getByRole("button", { name: "Quality strategy" });
  await expect(strategy).toHaveAttribute("aria-expanded", "false");
  await strategy.click();
  await expect(strategy).toHaveAttribute("aria-expanded", "true");
  await expect(page.locator("#expertise-detail-0")).toContainText("Risk-based QA");
  await strategy.click();
  await expect(strategy).toHaveAttribute("aria-expanded", "false");
});

test("selecting an expertise card closes the previously selected card @regression", async ({ page }) => {
  const strategy = page.getByRole("button", { name: "Quality strategy" });
  const integration = page.getByRole("button", { name: "Backend & integration" });
  await strategy.click();
  await integration.click();
  await expect(strategy).toHaveAttribute("aria-expanded", "false");
  await expect(integration).toHaveAttribute("aria-expanded", "true");
});

test("language switch updates document language and primary navigation @regression", async ({ page, portfolioPage }) => {
  await portfolioPage.languageButton.click();
  await expect(page.locator("html")).toHaveAttribute("lang", "es");
  await expect(page.getByRole("link", { name: "Experiencia", exact: true })).toBeVisible();
  await expect(page.getByRole("link", { name: "Ir al Lab", exact: true })).toBeVisible();
});

test("QA Lab tabs can all be closed and reopened @regression", async ({ page }) => {
  const selected = page.getByRole("tab", { selected: true });
  await expect(selected).toHaveCount(1);
  await selected.click();
  await expect(page.getByRole("tab", { selected: true })).toHaveCount(0);
  await page.getByRole("tab", { name: /^Overview/ }).click();
  await expect(page.getByRole("tab", { selected: true })).toHaveAccessibleName(/Overview/);
});

test("QA Lab chooses its default panel from the live run state @regression", async ({ page }) => {
  const runButton = page.getByRole("button", { name: /Run production suite|Suite in progress/ });
  await expect(runButton).toBeVisible();
  const expectedPanel = (await runButton.textContent())?.includes("in progress")
    ? /Live progress/
    : /Test distribution/;
  await expect(page.getByRole("tab", { selected: true })).toHaveAccessibleName(expectedPanel);
});
