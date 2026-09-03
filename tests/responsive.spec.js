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

test('Back to top becomes a compact fixed control after scrolling @responsive', async ({
  page,
  portfolioPage,
}) => {
  await expect(portfolioPage.backToTopButton).not.toHaveClass(/is-visible/);
  await expect(portfolioPage.backToTopButton).toHaveAttribute('tabindex', '-1');
  await page.evaluate(() => window.scrollTo(0, 500));
  await expect(portfolioPage.backToTopButton).toHaveClass(/is-visible/);
  await expect(portfolioPage.backToTopButton).toHaveAttribute('tabindex', '0');

  const [buttonBox, viewport] = await Promise.all([
    portfolioPage.backToTopButton.boundingBox(),
    page.evaluate(() => ({ width: window.innerWidth, height: window.innerHeight })),
  ]);

  expect(buttonBox).not.toBeNull();
  expect(buttonBox.width).toBeLessThanOrEqual(52);
  expect(buttonBox.x + buttonBox.width).toBeGreaterThan(viewport.width - 80);
  expect(buttonBox.y + buttonBox.height).toBeGreaterThan(viewport.height - 80);
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
      const section = document.querySelector('#experience .section-label')?.getBoundingClientRect();

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
    .toBeLessThanOrEqual(48);

  const positions = await getPositions();
  expect(positions.sectionTop).toBeGreaterThanOrEqual(positions.headerBottom - 2);
  expect(positions.sectionTop).toBeLessThanOrEqual(positions.headerBottom + 48);
});
