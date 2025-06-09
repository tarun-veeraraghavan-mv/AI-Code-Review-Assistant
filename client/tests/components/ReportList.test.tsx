import React from "react";
import { screen, render, waitFor } from "@testing-library/react";
import { expect, describe, it, vi } from "vitest";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";

import ReportList from "../../src/components/ReportList";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "../../src/contexts/AuthContext";

vi.mock("../../src/contexts/AuthContext.jsx", () => ({
  useAuth: () => ({
    user: { _id: "mock-user-id" },
  }),
}));

describe("ReportList", () => {
  const renderComponent = () => {
    render(
      <BrowserRouter>
        <ReportList />
      </BrowserRouter>
    );
  };

  it("fetches and displays reports based on user ID", async () => {
    renderComponent();

    expect(screen.getByText(/loading.../i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.queryByText(/loading.../i)).not.toBeInTheDocument();
    });

    // Wait for mocked reports to be rendered
    await waitFor(() => {
      expect(screen.getByText(/All your past reports/i)).toBeInTheDocument();
      expect(screen.getByText("123456789")).toBeInTheDocument();
    });
  });

  it("Clicking on report id must change the current report displayed", async () => {
    renderComponent();

    await waitFor(() => {
      expect(screen.queryByText(/loading.../i)).not.toBeInTheDocument();
    });

    const reportIds = screen.getAllByTestId("reportId");
    expect(reportIds).toHaveLength(2);

    const user = userEvent.setup();
    await user.click(reportIds[0]);

    expect(screen.getByText(/code review/i)).toBeInTheDocument();
    expect(screen.getByTestId("critical-issue-header")).toBeInTheDocument();
    expect(screen.getByTestId("critical-issue-score")).toHaveTextContent("0");

    await user.click(reportIds[1]);

    waitFor(() => {
      expect(screen.getByText(/critical issues/)).toBeInTheDocument();
      expect(screen.getByTestId("critical-issue-header")).toBeInTheDocument();
      expect(screen.getByTestId("critical-issue-score")).toHaveTextContent("2");
    });
  });
});
