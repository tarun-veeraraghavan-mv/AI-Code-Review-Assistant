import React from "react";
import { screen, render, waitFor } from "@testing-library/react";
import { expect, describe, it } from "vitest";
import "@testing-library/jest-dom";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import Reports from "../../src/components/Reports";
import { AuthProvider } from "../../src/contexts/AuthContext";

describe("Reports", () => {
  const renderComponent = (reportId = "1234567") => {
    render(
      <AuthProvider>
        <MemoryRouter initialEntries={[`/report/${reportId}`]}>
          <Routes>
            <Route path="/report/:reportId" element={<Reports />} />
          </Routes>
        </MemoryRouter>
      </AuthProvider>
    );
  };

  it("should fetch and display report details", async () => {
    renderComponent();

    await waitFor(() => {
      expect(screen.getByText(/download report as pdf/i)).toBeInTheDocument();
    });

    expect(screen.getByText(/code review/i)).toBeInTheDocument();
    expect(screen.getByTestId("critical-issue-header")).toBeInTheDocument();
    expect(screen.getByTestId("critical-issue-score")).toHaveTextContent("0");
  });
});
