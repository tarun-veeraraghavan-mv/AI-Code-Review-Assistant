import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import Navbar from "../../src/components/Navbar";
import { AuthProvider } from "../../src/contexts/AuthContext";

describe("Navbar", () => {
  const MockReportPage = () => <div>Report Page</div>;

  const renderComponent = () => {
    render(
      <AuthProvider>
        <MemoryRouter initialEntries={["/"]}>
          <Routes>
            <Route path="/" element={<Navbar />} />
            <Route path="/report" element={<MockReportPage />} />
          </Routes>
        </MemoryRouter>
      </AuthProvider>
    );
  };

  it("should display all elements correctly", () => {
    renderComponent();

    const appTitle = screen.getByRole("heading", {
      name: /ai code review/i,
    });
    const docsButton = screen.getByRole("button", {
      name: /docs/i,
    });
    const reportsButton = screen.getByRole("button", {
      name: /reports/i,
    });
    const signinButton = screen.getByRole("button", {
      name: /sign in/i,
    });

    expect(appTitle).toBeDefined();
    expect(docsButton).toBeDefined();
    expect(reportsButton).toBeDefined();
    expect(signinButton).toBeDefined();
  });
  it("should not let user into register page if not signed in", async () => {
    const alertMock = vi.spyOn(window, "alert").mockImplementation(() => {});

    renderComponent();

    const reportButton = screen.getByRole("button", {
      name: /reports/i,
    });

    const user = userEvent.setup();
    await user.click(reportButton);

    expect(alertMock).toHaveBeenCalledWith("Signin to access this feature");
    alertMock.mockRestore();
  });
});
