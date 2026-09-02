import { test, expect } from "../fixtures/test-fixtures";

test.beforeEach(async ({ portfolioPage }) => portfolioPage.goto());

test("Go to Lab opens the QA Automation Lab @smoke", async ({ page, portfolioPage }) => {
  await page.getByRole("link", { name: "Go to Lab", exact: true }).click();
  await expect(page).toHaveURL(/#qa-lab$/);
  await expect(portfolioPage.section("qa-lab")).toBeInViewport();
});

test("Contact me opens the contact section @smoke", async ({ page, portfolioPage }) => {
  await page.getByRole("link", { name: "Contact me", exact: true }).click();
  await expect(page).toHaveURL(/#contact$/);
  await expect(portfolioPage.section("contact")).toBeInViewport();
});
