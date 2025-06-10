import test, { expect } from "@playwright/test";

test.describe("Signin", () => {
  test("all components should be rendered properly", async ({ page }) => {
    await page.goto("/signin");

    const signinButton = page.getByRole("button", { name: /sign in/i }).nth(1);
    await expect(signinButton).toBeVisible();

    const nameLabel = page.getByText(/name/i);
    const emailLabel = page.getByText(/email/i);
    const passwordLabel = page.getByText(/password/i);

    const nameInput = page.getByPlaceholder(/john doe/i);
    const emailInput = page.getByPlaceholder(/johndoe@gmail.com/i);
    const passwordInput = page.getByPlaceholder(/test123/i);

    await expect(nameLabel).toBeVisible();
    await expect(emailLabel).toBeVisible();
    await expect(passwordLabel).toBeVisible();

    await expect(nameInput).toBeVisible();
    await expect(emailInput).toBeVisible();
    await expect(passwordInput).toBeVisible();
  });

  test("signin should work properly", async ({ page }) => {
    await page.goto("/signin");

    const nameInput = page.getByPlaceholder(/john doe/i);
    const emailInput = page.getByPlaceholder(/johndoe@gmail.com/i);
    const passwordInput = page.getByPlaceholder(/test123/i);
    const signinButton = page
      .getByRole("button", {
        name: /sign in/i,
      })
      .nth(1);

    await nameInput.click();
    await page.keyboard.type("mary");

    await emailInput.click();
    await page.keyboard.type("mary@gmail.com");

    await passwordInput.click();
    await page.keyboard.type("mary123");

    expect(nameInput).toHaveValue("mary");
    expect(emailInput).toHaveValue("mary@gmail.com");
    expect(passwordInput).toHaveValue("mary123");

    await signinButton.click();
    await expect(page.getByText(/project files/i)).toBeVisible();
    await expect(page.getByText(/mary/i)).toBeVisible();
  });
});

test.describe("Login", () => {
  test("login form should be rendered properly", async ({ page }) => {
    await page.goto("/");

    const signinButton = page
      .getByRole("button", {
        name: /sign in/i,
      })
      .nth(0);

    await signinButton.click();

    const nameLabel = page.getByText(/name/i);
    const emailLabel = page.getByText(/email/i);
    await expect(nameLabel).toBeVisible();
    await expect(emailLabel).toBeVisible();

    const loginButton = page.getByRole("link", {
      name: /log in/i,
    });
    expect(loginButton).toBeVisible();

    await loginButton.click();

    const emailInput = page.getByPlaceholder(/johndoe@gmail.com/i);
    const passwordInput = page.getByPlaceholder(/test123/i);

    await emailInput.click();
    await page.keyboard.type("mary@gmail.com");

    await passwordInput.click();
    await page.keyboard.type("mary123");

    await Promise.all([page.waitForNavigation(), loginButton.click()]);
    await expect(page.getByText(/project files/i)).toBeVisible();
    await expect(page.getByText(/mary/i)).toBeVisible();
  });
});
