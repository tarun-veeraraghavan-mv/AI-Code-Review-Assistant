import test, { expect } from "@playwright/test";

test.describe("Signin", () => {
  test("all components should be rendered properly", async ({ page }) => {
    await page.route("**/api/v1/users/register", async (route) => {
      const fakeResponse = {
        status: 201,
        contentType: "application/json",
        body: JSON.stringify({
          token: "mocked-token",
          user: { name: "mary", email: "mary@gmail.com" },
        }),
      };
      console.log("Mocked response sent:", fakeResponse); // Debugging
      await route.fulfill(fakeResponse);
    });

    await page.goto("/signin");

    const nameInput = page.getByPlaceholder(/john doe/i);
    const emailInput = page.getByPlaceholder(/johndoe@gmail.com/i);
    const passwordInput = page.getByPlaceholder(/test123/i);
    const signinButton = page.getByRole("button", { name: /sign in/i }).nth(1);

    await nameInput.fill("mary");
    await emailInput.fill("mary@gmail.com");
    await passwordInput.fill("mary123");

    await signinButton.click();

    await expect(page.getByText(/project files/i)).toBeVisible();
    await expect(page.getByText(/mary/i)).toBeVisible();
  });
});

test.describe("Login", () => {
  test("login form should be rendered properly", async ({ page }) => {
    await page.route("**/api/v1/users/login", async (route) => {
      const fakeResponse = {
        status: 201,
        contentType: "application/json",
        body: JSON.stringify({
          token: "mocked-token",
          user: { name: "mary", email: "mary@gmail.com" },
        }),
      };
      console.log("Mocked response sent:", fakeResponse); // Debugging
      await route.fulfill(fakeResponse);
    });

    await page.goto("/login");

    const emailInput = page.getByPlaceholder(/johndoe@gmail.com/i);
    const passwordInput = page.getByPlaceholder(/test123/i);
    const loginButton = page.getByRole("button", {
      name: /log in/i,
    });

    await emailInput.click();
    await page.keyboard.type("mary@gmail.com");

    await passwordInput.click();
    await page.keyboard.type("mary123");

    await loginButton.click();
    await expect(page.getByText(/project files/i)).toBeVisible();
    await expect(page.getByText(/mary/i)).toBeVisible();
  });
});
