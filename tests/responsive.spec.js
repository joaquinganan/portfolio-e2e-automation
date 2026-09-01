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

test('mobile section links land below the sticky header with one active item @responsive', async ({
  page,
  portfolioPage,
}) => {
  await portfolioPage.navigationLink('Experience').click();

  await expect(page).toHaveURL(/#experience$/);
  await expect(page.locator('.site-nav [aria-current="location"]')).toHaveCount(1);
  await expect(portfolioPage.navigationLink('Experience')).toHaveAttribute(
    'aria-current',
    'location',
  );
  await expect(portfolioPage.section('experience')).toBeInViewport();

  const getPositions = () => page.evaluate(() => {
      const header = document.querySelector('.site-header')?.getBoundingClientRect();
      const section = document.querySelector('#experience')?.getBoundingClientRect();

      return {
        headerBottom: header?.bottom ?? 0,
        sectionTop: section?.top ?? 0,
      };
    });

  await expect
    .poll(async () => {
      const positions = await getPositions();
      return positions.sectionTop - positions.headerBottom;
    })
    .toBeLessThanOrEqual(80);

  const positions = await getPositions();
  expect(positions.sectionTop).toBeGreaterThanOrEqual(positions.headerBottom - 2);
  expect(positions.sectionTop).toBeLessThanOrEqual(positions.headerBottom + 80);
});
