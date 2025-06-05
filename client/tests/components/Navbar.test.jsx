import React from "react";
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Navbar from "../../src/components/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "../../src/contexts/AuthContext";

describe("Navbar", () => {
  const renderComponent = () => {
    render(
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navbar />} />
          </Routes>
        </BrowserRouter>
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
});
