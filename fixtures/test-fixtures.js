import { test as base } from '@playwright/test';
import { PortfolioPage } from '../pages/PortfolioPage';

export const test = base.extend({
  portfolioPage: async ({ page }, use) => {
    await use(new PortfolioPage(page));
  },
});

export { expect } from '@playwright/test';
