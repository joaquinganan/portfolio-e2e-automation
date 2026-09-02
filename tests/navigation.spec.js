import { test, expect } from "../fixtures/test-fixtures";
import { externalLinks, sectionNavigation } from "../utils/test-data";

test.beforeEach(async ({ portfolioPage }) => {
  await portfolioPage.goto();
});

test("loads the portfolio homepage @smoke", async ({ page, portfolioPage }) => {
  await expect(page).toHaveTitle(/Joaquín Gañán \| Senior QA Engineer/);
  await expect(portfolioPage.portrait).toBeVisible();
  await expect(
    page.getByText(/Senior QA Engineer with 7\+ years of experience/),
  ).toBeVisible();
  await expect(portfolioPage.section("impact")).toContainText(/6\+\s*QAs mentored/);
  await expect(portfolioPage.section("impact")).toContainText(
    "Newtech SRL · Verizon contractor · 2019 - 2024",
  );
  await expect(portfolioPage.section("qa-lab")).toContainText("16 test cases");
  await expect(portfolioPage.section("qa-lab")).toContainText(
    "44 cross-browser executions",
  );
  await expect(portfolioPage.section("qa-lab")).toContainText("5 browser projects");
});

test("home link returns to the intro section @smoke", async ({
  page,
  portfolioPage,
}) => {
  await portfolioPage.homeLink.click();

  await expect(page).toHaveURL(/#intro$/);
  await expect(portfolioPage.section("intro")).toBeInViewport();
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

test("View selected work opens the work section @smoke", async ({
  page,
  portfolioPage,
}) => {
  await page.getByRole("link", { name: "View selected work" }).click();

  await expect(page).toHaveURL(/#work$/);
  await expect(portfolioPage.section("work")).toBeInViewport();
});

for (const { name, href } of externalLinks) {
  test(`${name} has the correct external destination @regression`, async ({
    portfolioPage,
  }) => {
    const link = portfolioPage.externalLink(name);

    await expect(link).toHaveAttribute("href", href);
    await expect(link).toHaveAttribute("target", "_blank");
  });
}

test("Back to top returns to the intro section @regression", async ({
  page,
  portfolioPage,
}) => {
  await portfolioPage.navigationLink("Contact").click();
  await portfolioPage.backToTopLink.click();

  await expect(page).toHaveURL(/#intro$/);
  await expect(portfolioPage.section("intro")).toBeInViewport();
});

test("resume download follows the active language @regression", async ({
  page,
  portfolioPage,
}) => {
  await expect(portfolioPage.englishResumeLink).toHaveAttribute(
    "href",
    "/joaquin-ganan-resume-en.pdf",
  );

  await portfolioPage.languageButton.click();

  await expect(page.getByRole("link", { name: "Descargar CV (ES)" })).toHaveAttribute(
    "href",
    "/joaquin-ganan-resume-es.pdf",
  );
});
