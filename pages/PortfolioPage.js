export class PortfolioPage {
  constructor(page) {
    this.page = page;
    this.homeLink = page.getByRole('link', { name: 'Joaquín Gañán — home' });
    this.portrait = page.getByRole('img', { name: 'Portrait of Joaquín Gañán' });
    this.backToTopLink = page.getByRole('link', { name: 'Back to top' });
  }

  async goto() {
    await this.page.goto('/');
  }

  navigationLink(name) {
    return this.page.getByRole('link', { name, exact: true }).first();
  }

  section(id) {
    return this.page.locator(`#${id}`);
  }

  externalLink(name) {
    return this.page.getByRole('link', { name, exact: true }).first();
  }
}
