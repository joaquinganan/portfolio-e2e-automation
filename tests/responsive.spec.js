import { test, expect } from '../fixtures/test-fixtures';

test.beforeEach(async ({ portfolioPage }) => {
  await portfolioPage.goto();
});

test('page has no horizontal overflow @responsive', async ({ page }) => {
  const hasHorizontalOverflow = await page.evaluate(
    () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
  );

  expect(hasHorizontalOverflow).toBe(false);
});

test('critical content remains available @responsive', async ({ page, portfolioPage }) => {
  await expect(portfolioPage.portrait).toBeVisible();
  await expect(page.getByRole('link', { name: 'View selected work' })).toBeVisible();
  await expect(portfolioPage.section('work')).toBeAttached();
  await expect(portfolioPage.section('contact')).toBeAttached();
});

test('Back to top remains a compact right-aligned control @responsive', async ({
  page,
  portfolioPage,
}) => {
  await portfolioPage.backToTopLink.scrollIntoViewIfNeeded();

  const [linkBox, footerBox] = await Promise.all([
    portfolioPage.backToTopLink.boundingBox(),
    page.locator('.site-footer').boundingBox(),
  ]);

  expect(linkBox).not.toBeNull();
  expect(footerBox).not.toBeNull();
  expect(linkBox.width).toBeLessThan(footerBox.width * 0.75);
  expect(linkBox.x + linkBox.width).toBeGreaterThan(footerBox.x + footerBox.width * 0.7);
});
