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
  await expect(page.getByRole('link', { name: 'Explore my work' })).toBeVisible();
  await expect(portfolioPage.section('work')).toBeAttached();
  await expect(portfolioPage.section('contact')).toBeAttached();
});
