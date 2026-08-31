import { test, expect } from '../fixtures/test-fixtures';
import { externalLinks, sectionNavigation } from '../utils/test-data';

test.beforeEach(async ({ portfolioPage }) => {
  await portfolioPage.goto();
});

test('loads the portfolio homepage @smoke', async ({ page, portfolioPage }) => {
  await expect(page).toHaveTitle(/Joaquín Gañán \| Senior QA Engineer/);
  await expect(portfolioPage.portrait).toBeVisible();
});

test('home link returns to the intro section @smoke', async ({ page, portfolioPage }) => {
  await portfolioPage.homeLink.click();

  await expect(page).toHaveURL(/#intro$/);
  await expect(portfolioPage.section('intro')).toBeInViewport();
});

for (const { name, id } of sectionNavigation) {
  test(`${name} link opens the ${id} section @regression`, async ({
    page,
    portfolioPage,
  }) => {
    await portfolioPage.navigationLink(name).click();

    await expect(page).toHaveURL(new RegExp(`#${id}$`));
    await expect(portfolioPage.section(id)).toBeInViewport();
  });
}

test('Explore my work opens the impact section @smoke', async ({
  page,
  portfolioPage,
}) => {
  await page.getByRole('link', { name: 'Explore my work' }).click();

  await expect(page).toHaveURL(/#impact$/);
  await expect(portfolioPage.section('impact')).toBeInViewport();
});

for (const { name, href } of externalLinks) {
  test(`${name} has the correct external destination @regression`, async ({
    portfolioPage,
  }) => {
    const link = portfolioPage.externalLink(name);

    await expect(link).toHaveAttribute('href', href);
    await expect(link).toHaveAttribute('target', '_blank');
  });
}

test('Back to top returns to the intro section @regression', async ({
  page,
  portfolioPage,
}) => {
  await portfolioPage.navigationLink('Contact').click();
  await portfolioPage.backToTopLink.click();

  await expect(page).toHaveURL(/#intro$/);
  await expect(portfolioPage.section('intro')).toBeInViewport();
});
