import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  // Go to the starting url before each test.
  await page.goto('/');
});

test('has title @smoke', async ({ page }) => {

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Joaquín Gañán | Senior QA Engineer/);
});

test('intro link @smoke', async ({ page }) => {

  // Click the Intro link.
  const linkIntro = page.getByRole('link', { name: 'Joaquín Gañán — home' });
  await linkIntro.click();

  // Expects page to have a URL with the path to Intro.
  await expect(page).toHaveURL(/.*#intro/);
});

test('expertise link @smoke', async ({ page }) => {

  // Click the Expertise link.
  const linkExpertise = page.getByRole('link', { name: 'Expertise' });
  await linkExpertise.click();

  // Expects page to have a URL with the path to Expertise.
  await expect(page).toHaveURL(/.*#expertise/);
});

test('experience link @smoke', async ({ page }) => {

  // Click the Experience link.
  const linkExperience = page.getByRole('link', { name: 'Experience' });
  await linkExperience.click();

  // Expects page to have a URL with the path to Experience.
  await expect(page).toHaveURL(/.*#experience/);
});

test('work link @smoke', async ({ page }) => {

  // Click the Work link.
  const linkWork = page.getByRole('link', { name: 'Work' }).first();
  await linkWork.click();

  // Expects page to have a URL with the path to Work.
  await expect(page).toHaveURL(/.*#work/);
});

test('contact link @smoke', async ({ page }) => {

  // Click the Contact link.
  const linkContact = page.getByRole('link', { name: 'Contact' });
  await linkContact.click();

  // Expects page to have a URL with the path to Contact.
  await expect(page).toHaveURL(/.*#contact/);
});

test('explore my work link @smoke', async ({ page }) => {

  // Click the Explore my work link.
  const linkImpact = page.getByRole('link', { name: 'Explore my work' });
  await linkImpact.click();

  // Expects page to have a URL with the path to Impact.
  await expect(page).toHaveURL(/.*#impact/);
});

test('view repository link @smoke', async ({ page, context }) => {

  // Click the View Repository link.
  const linkViewRepository = page.getByRole('link', { name: 'View Repository' });
  
 // Handle new tab opening (target="_blank")
    const pagePromise = context.waitForEvent('page');
    await linkViewRepository.click();
    const newPage = await pagePromise;

  // Expects page to redirect to Joaquín Gañán's GitHub and close afterwards.
  await expect(newPage).toHaveURL('https://github.com/joaquinganan/m4pp-sqe');
  await newPage.close();
});

test('linkedin link @smoke', async ({ page, context }) => {

  // Click the LinkedIn link.
  const linkLinkedIn = page.getByRole('link', { name: 'LinkedIn' });

  // Handle new tab opening (target="_blank")
  const pagePromise = context.waitForEvent('page');
  await linkLinkedIn.click();
  const newPage = await pagePromise;

  // Accepts either Joaquín's profile URL OR the LinkedIn authwall redirect and closes afterwards.
  await expect(newPage).toHaveURL(/linkedin\.com\/(in\/joaquinganan95|authwall)/);
  await newPage.close();
});

test('gitHub link @smoke', async ({ page, context }) => {

  // Click the GitHub link.
  const linkGitHub = page.getByRole('link', { name: 'GitHub' });

  // Handle new tab opening (target="_blank")
  const pagePromise = context.waitForEvent('page');
  await linkGitHub.click();
  const newPage = await pagePromise;

  // Expects page to redirect to Joaquín Gañán's GitHub and closes afterwards.
  await expect(newPage).toHaveURL('https://github.com/joaquinganan');
  await newPage.close();
});

test('back to top link @smoke', async ({ page }) => {

  // Click the Back to top link.
  const linkBackToTop = page.getByRole('link', { name: 'Back to top' });
  await linkBackToTop.click();

  // Expects page to return to the top of the page.
  await expect(page.getByRole('img', { name: 'Portrait of Joaquín Gañán' })).toBeInViewport();
});