import { test, expect } from "../fixtures/test-fixtures";

test.beforeEach(async ({ portfolioPage }) => portfolioPage.goto());

test("QA Lab header CTA remains available and lands below the sticky header @responsive", async ({ page, portfolioPage }) => {
  const labLink = page.getByRole("link", { name: "Go to Lab", exact: true });
  await expect(labLink).toBeVisible();
  await labLink.click();
  await expect(page).toHaveURL(/#qa-lab$/);
  await expect(portfolioPage.section("qa-lab")).toBeInViewport();
});

test("contact secondary actions remain horizontal and touch friendly @responsive", async ({ page, portfolioPage }) => {
  const contact = portfolioPage.section("contact");
  const linkedIn = contact.getByRole("link", { name: "LinkedIn" });
  const github = contact.getByRole("link", { name: "GitHub" });
  await contact.scrollIntoViewIfNeeded();
  const [linkedInBox, githubBox] = await Promise.all([linkedIn.boundingBox(), github.boundingBox()]);
  expect(linkedInBox).not.toBeNull();
  expect(githubBox).not.toBeNull();
  expect(Math.abs(linkedInBox.y - githubBox.y)).toBeLessThanOrEqual(4);
  expect(linkedInBox.height).toBeGreaterThanOrEqual(44);
  expect(githubBox.height).toBeGreaterThanOrEqual(44);
});
