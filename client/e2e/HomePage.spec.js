import { test, expect } from "@playwright/test";

test("Navbar should be rendered properly", async ({ page }) => {
  await page.goto("/");

  // Store elements in variables
  const heading = page.getByRole("heading", { name: /ai code review/i });
  const docsButton = page.getByRole("button", { name: /docs/i });
  const reportsButton = page.getByRole("button", {
    name: /reports/i,
  });
  const signinButton = page.getByRole("button", {
    name: /sign in/i,
  });

  // Assert visibility
  await expect(heading).toBeVisible();
  await expect(docsButton).toBeVisible();
  await expect(reportsButton).toBeVisible();
  await expect(signinButton).toBeVisible();
});

test("Settings panel should work as expected", async ({ page }) => {
  await page.goto("/");

  const settingsButton = page.getByRole("button", {
    name: /settings/i,
  });

  await expect(settingsButton).toBeVisible();
});
