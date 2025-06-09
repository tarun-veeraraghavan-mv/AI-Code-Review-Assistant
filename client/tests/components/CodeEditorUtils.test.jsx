import React from "react";
import { screen, render, waitFor } from "@testing-library/react";
import { expect, describe, it, vi } from "vitest";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";

import Sidebar from "../../src/components/Sidebar";
import CodeEditorUtils from "../../src/components/CodeEditorUtils";
import { AuthProvider } from "../../src/contexts/AuthContext";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import Reports from "../../src/components/Reports";

describe("CodeEditorUtils", () => {
  const inputs = [{ inputName: "File 1" }];

  const mockUpdateInput = vi.fn();
  const mockClearInput = vi.fn();
  const mockCodeStandards = "This is a mock code standard";

  const renderComponent = () => {
    render(
      <AuthProvider>
        <MemoryRouter initialEntries={["/"]}>
          <Routes>
            <Route
              path="/"
              element={
                <CodeEditorUtils
                  inputs={inputs}
                  index={0}
                  codeStandards={mockCodeStandards}
                  updateInput={mockUpdateInput}
                  clearInput={mockClearInput}
                />
              }
            />
            <Route path="/report/:reportId" element={<Reports />} />
          </Routes>
        </MemoryRouter>
      </AuthProvider>
    );
  };

  it("should enter all utilities properly", () => {
    renderComponent();

    const languageSelectInput = screen.getByText(/select language/i);
    const clearCodeButton = screen.getByRole("button", {
      name: /clear code/i,
    });
    const codeReviewButton = screen.getByRole("button", {
      name: /start code review/i,
    });

    expect(languageSelectInput).toBeInTheDocument();
    expect(clearCodeButton).toBeInTheDocument();
    expect(codeReviewButton).toBeInTheDocument();
  });

  it("should clearCode should be called when clear code button is clicked", async () => {
    const confirmMock = vi.spyOn(window, "confirm").mockReturnValue(true);

    renderComponent();

    const clearCodeButton = screen.getByRole("button", {
      name: /clear code/i,
    });

    const user = userEvent.setup();
    await user.click(clearCodeButton);

    expect(mockClearInput).toHaveBeenCalled();

    confirmMock.mockRestore();
  });

  it("should start code review when codeReviewButton is clicked", async () => {
    const confirmMock = vi.spyOn(window, "confirm").mockReturnValue(true);
    const alertMock = vi.spyOn(window, "alert").mockImplementation(() => {});

    renderComponent();

    const codeReviewButton = screen.getByRole("button", {
      name: /code review/i,
    });

    const user = userEvent.setup();
    await user.click(codeReviewButton);

    // make sure loading button is visible
    const loadingButton = screen.getByRole("button", {
      name: /loading.../i,
    });

    expect(loadingButton).toBeInTheDocument();
    expect(loadingButton).toBeDisabled();

    // ensure loading is gone after the review is complete
    await waitFor(() => {
      expect(
        screen.queryByRole("button", { name: /loading.../i })
      ).not.toBeInTheDocument();
    });

    confirmMock.mockRestore();
    alertMock.mockRestore();
  });
});
