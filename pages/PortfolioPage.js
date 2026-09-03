export class PortfolioPage {
  constructor(page) {
    this.page = page;
    this.homeLink = page.getByRole("link", { name: "Joaquín Gañán - home" });
    this.portrait = page.getByRole("img", { name: "Portrait of Joaquín Gañán" });
    this.backToTopButton = page.getByRole("button", { name: "Back to top" });
    this.languageButton = page.getByRole("button", { name: "Switch to Spanish" });
    this.englishResumeLink = page.getByRole("link", { name: "Download résumé (EN)" });
  }
  async goto() { await this.page.goto("/"); }
  navigationLink(name) { return this.page.getByRole("link", { name, exact: true }).first(); }
  section(id) { return this.page.locator(`#${id}`); }
  externalLink(name) { return this.page.getByRole("link", { name, exact: true }).first(); }
}
