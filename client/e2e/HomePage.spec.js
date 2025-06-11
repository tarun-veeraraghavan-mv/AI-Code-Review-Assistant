import { test, expect } from "@playwright/test";

test("all routes must work as expected", async ({ page }) => {
  // home page
  await page.goto("/");
  await expect(page.getByText(/project files/i)).toBeVisible({ timeout: 5000 });

  //docs page
  await page.goto("/docs");
  await expect(page.getByText(/Welcome to my/i)).toBeVisible({ timeout: 5000 });

  // signin page
  await page.goto("/signin");

  const signinButton = page
    .getByRole("button", {
      name: /sign in/i,
    })
    .nth(1);
  const loginButton = page.getByText(/log in/i);

  await expect(signinButton).toBeVisible({ timeout: 5000 });
  await expect(loginButton).toBeVisible({ timeout: 5000 });

  await loginButton.click();
  await expect(loginButton).toBeVisible({ timeout: 5000 });
  await expect(signinButton).not.toBeVisible({ timeout: 5000 });
});

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

  await settingsButton.click();

  const settingsHeader = page.getByRole("heading", {
    name: /settings/i,
  });
  const tabSizeLabel = page.getByText(/tab size/i);
  const themeLabel = page.getByText(/theme/i);
  const fontSizeLabel = page.getByText(/font size/i);

  const tabSizeSelect = page.getByRole("combobox", {
    name: /tab size/i,
  });
  const themeSelect = page.getByRole("combobox", {
    name: /theme/i,
  });
  const fontSizeInput = page.getByRole("spinbutton", {
    name: /font size/i,
  });

  const closeButton = page.getByRole("button", {
    name: /close/i,
  });

  await expect(settingsHeader).toBeVisible();
  await expect(tabSizeLabel).toBeVisible();
  await expect(themeLabel).toBeVisible();
  await expect(fontSizeLabel).toBeVisible();

  await expect(tabSizeSelect).toBeVisible();
  await expect(themeSelect).toBeVisible();
  await expect(fontSizeInput).toBeVisible();

  await expect(closeButton).toBeVisible();

  await closeButton.click();

  await expect(settingsHeader).not.toBeVisible();
});

test("the sidebar must work as expected", async ({ page }) => {
  await page.goto("/");

  const projectFilesHeader = page.getByRole("heading", {
    name: /project files/i,
  });
  await expect(projectFilesHeader).toBeVisible();

  const selectButton = page.getByRole("button", {
    name: /select/i,
  });
  await expect(selectButton).toHaveCount(1);

  const addButton = page.getByTestId("add-button");
  await addButton.click();

  await expect(selectButton).toHaveCount(2);

  page.on("dialog", async (dialog) => {
    expect(dialog.message()).toBe(
      "Are you sure you want to delete this cell? This will remove the cell and all its content."
    );
    await dialog.accept(); // Click OK
    // Use dialog.dismiss() to simulate clicking Cancel
  });

  const deleteButton = page.getByTestId("delete-button").nth(1);
  await deleteButton.click();

  await expect(selectButton).toHaveCount(1);
});

test("the code editor must work as expected", async ({ page }) => {
  await page.goto("/");

  // code editor functionality
  const editorContainer = page.getByTestId("code-editor");
  await expect(editorContainer).toBeVisible();

  await page.waitForSelector(".monaco-editor");

  const editor = page.locator(".monaco-editor");
  await expect(editor).toBeVisible();

  await editor.click();
  await page.keyboard.type('console.log("Hello World");');

  await expect(page.getByText('console.log("Hello World");')).toBeVisible();

  // language select functionality
  const languageSelect = page.getByTestId("language-select");
  expect(languageSelect).toBeVisible();

  await languageSelect.selectOption("javascript");
  await expect(languageSelect).toHaveValue("javascript");
});

test("code review must be sent when codeReviewButton is clicked", async ({
  page,
}) => {
  await page.route("**/api/v1/llm/completion", async (route) => {
    const fakeResponse = {
      status: 201,
      contentType: "application/json",
      body: JSON.stringify({
        _id: "1234567",
        codeReview: {
          overallScore: 85,
          criticalIssues: 0,
          warnings: 2,
          suggestions: 3,
        },
        codeSummary: [
          "This is a code block that tests the App.jsx React Component",
        ],
        criticalIssues: [".env variable not secured"],
        warnings: [],
        suggestions: ["Use functional components than class-based components"],
        userId: "user123",
      }),
    };
    console.log("Mocked response sent:", fakeResponse); // Debugging
    await route.fulfill(fakeResponse);
  });

  let dialogCount = 0;
  page.on("dialog", async (dialog) => {
    if (dialogCount === 0) {
      expect(dialog.message()).toBe(
        "Are you sure you want to start the code review process"
      );
      await dialog.accept(); // Simulate clicking "OK"
    } else if (dialogCount === 1) {
      expect(dialog.message()).toBe("Code review finished! Scroll down please");
      await dialog.accept(); // Simulate clicking "OK"
    }
    dialogCount++;
  });

  await page.route("**/api/v1/reviews/1234567", async (route) => {
    const fakeReportResponse = {
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        _id: "1234567",
        codeReview: {
          overallScore: 85,
          criticalIssues: 0,
          warnings: 2,
          suggestions: 3,
        },
        codeSummary: [
          "This is a code block that tests the App.jsx React Component",
        ],
        criticalIssues: [".env variable not secured"],
        warnings: [],
        suggestions: ["Use functional components than class-based components"],
        userId: "user123",
      }),
    };
    console.log(
      "Mocked response sent for fetching report:",
      fakeReportResponse
    );
    await route.fulfill(fakeReportResponse);
  });

  await page.goto("/");

  const codeReviewButton = page.getByRole("button", {
    name: /start code review/i,
  });
  await codeReviewButton.click();

  // Wait for navigation
  await page.waitForURL("/report/1234567");

  // Verify the report page is loaded
  const reportHeading = page.getByRole("heading", {
    name: /code quality report/i,
  });
  await expect(reportHeading).toBeVisible();

  const overallScore = page.getByTestId("critical-issue-header");
  await expect(overallScore).toBeVisible();

  const codeSummary = page.getByText(
    "This is a code block that tests the App.jsx React Component"
  );
  await expect(codeSummary).toBeVisible();
});
