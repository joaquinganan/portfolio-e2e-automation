import { test, expect } from "../fixtures/test-fixtures";

test.beforeEach(async ({ portfolioPage }) => portfolioPage.goto());

test("expertise cards expand and can return to a fully collapsed state @regression", async ({ page }) => {
  const strategy = page.getByRole("button", { name: "Quality strategy" });
  await expect(strategy).toHaveAttribute("aria-expanded", "false");
  await strategy.click();
  await expect(strategy).toHaveAttribute("aria-expanded", "true");
  await expect(page.locator("#expertise-detail-0")).toContainText("Risk-based QA");
  await strategy.click();
  await expect(strategy).toHaveAttribute("aria-expanded", "false");
});

test("selecting an expertise card closes the previously selected card @regression", async ({ page }) => {
  const strategy = page.getByRole("button", { name: "Quality strategy" });
  const integration = page.getByRole("button", { name: "Backend & integration" });
  await strategy.click();
  await integration.click();
  await expect(strategy).toHaveAttribute("aria-expanded", "false");
  await expect(integration).toHaveAttribute("aria-expanded", "true");
});

test("language switch updates document language and primary navigation @regression", async ({ page, portfolioPage }) => {
  await portfolioPage.languageButton.click();
  await expect(page.locator("html")).toHaveAttribute("lang", "es");
  await expect(page.getByRole("link", { name: "Experiencia", exact: true })).toBeVisible();
  await expect(page.getByRole("link", { name: "Ir al Lab", exact: true })).toBeVisible();
});

test("theme toggle switches modes and preserves the preference @regression", async ({ page }) => {
  await page.emulateMedia({ colorScheme: "light" });
  await page.evaluate(() => localStorage.removeItem("portfolio-theme"));
  await page.reload();

  const darkModeButton = page.getByRole("button", { name: "Switch to dark mode" });
  await expect(darkModeButton).toHaveAttribute("aria-pressed", "false");
  await darkModeButton.click();
  await expect(page.locator("html")).toHaveClass(/dark/);
  await expect(page.getByRole("button", { name: "Switch to light mode" })).toHaveAttribute(
    "aria-pressed",
    "true",
  );

  await page.reload();
  await expect(page.locator("html")).toHaveClass(/dark/);
});

test("Selected Work prioritizes the portfolio and omits the redundant Lab link @regression", async ({ page }) => {
  const projects = page.locator("#work .project-row h3");
  await expect(projects).toHaveText([
    "Self-testing QA Portfolio",
    "Agentic Finance Tracker",
    "M4PP Playwright Automation Suite",
    "Integrated Release Assurance",
  ]);
  await expect(page.locator('#work a[href="#qa-lab"]')).toHaveCount(0);
});

test("Agentic Finance Tracker is labelled as AI-built with human QA, in both languages, and serves its demo @regression", async ({ page, portfolioPage }) => {
  const card = page.locator("#work .project-row").filter({
    has: page.getByRole("heading", { name: "Agentic Finance Tracker", exact: true }),
  });
  await expect(card.locator(".project-type")).toHaveText("AI-built system · human QA");
  await expect(card.getByRole("link")).toHaveCount(3);
  // the demo: player page + both video files are really served (WebM first, MP4 for Safari)
  const demo = card.getByRole("link", { name: "Watch demo (50 s)", exact: true });
  await expect(demo).toHaveAttribute("href", "/demos/agentic-fin-tracker.html");
  await expect(demo).toHaveAttribute("target", "_blank");
  const player = await page.request.get("/demos/agentic-fin-tracker.html");
  expect(player.ok()).toBeTruthy();
  expect(await player.text()).toContain('<source src="/demos/agentic-fin-tracker-demo.webm" type="video/webm">');
  for (const file of ["agentic-fin-tracker-demo.webm", "agentic-fin-tracker-demo.mp4"]) {
    const video = await page.request.get(`/demos/${file}`);
    expect(video.ok(), file).toBeTruthy();
    expect((await video.body()).length, file).toBeGreaterThan(100_000);
  }
  await portfolioPage.languageButton.click();
  await expect(card.locator(".project-type")).toHaveText("Sistema creado con IA · QA humano");
  await expect(card.getByRole("link", { name: "Ver repositorio del tracker", exact: true }))
    .toHaveAttribute("href", /github\.com\/joaquinganan\/agentic-fin-tracker\/?$/);
});

test("QA Lab tabs can all be closed and reopened @regression", async ({ page }) => {
  const selected = page.getByRole("tab", { selected: true });
  await expect(selected).toHaveCount(1);
  await selected.click();
  await expect(page.getByRole("tab", { selected: true })).toHaveCount(0);
  await page.getByRole("tab", { name: /^Overview/ }).click();
  await expect(page.getByRole("tab", { selected: true })).toHaveAccessibleName(/Overview/);
});

test("QA Lab chooses its default panel from the live run state @regression", async ({ page }) => {
  const runButton = page.getByRole("button", { name: /Run production suite|Suite in progress/ });
  await expect(page.locator(".qa-run-strip")).toBeVisible();
  const expectedPanel = (await runButton.textContent())?.includes("in progress")
    ? /Live progress/
    : /Test distribution/;
  await expect(page.getByRole("tab", { selected: true })).toHaveAccessibleName(expectedPanel);
});
