import React from "react";
import { screen, render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, it, expect, vi } from "vitest";
import { AuthProvider } from "../../src/contexts/AuthContext";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import userEvent from "@testing-library/user-event";

import Login from "../../src/components/Login";

describe("Login", () => {
  const renderComponent = () => {
    render(
      <AuthProvider>
        <MemoryRouter initialEntries={["/login"]}>
          <Routes>
            <Route path="/login" element={<Login />} />
          </Routes>
        </MemoryRouter>
      </AuthProvider>
    );
  };

  it("should render login component properly", () => {
    renderComponent();

    const emailInput = screen.getByRole("textbox", {
      name: /email/i,
    });
    const passwordInput = screen.getByPlaceholderText(/test123/i);

    const loginButton = screen.getByRole("button", {
      name: /log in/i,
    });

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
  });

  it("should be able to type on inputs", async () => {
    renderComponent();

    const emailInput = screen.getByRole("textbox", {
      name: /email/i,
    });
    const passwordInput = screen.getByPlaceholderText(/test123/i);

    const user = userEvent.setup();

    await user.type(emailInput, "johndoe@gmail.com");
    await user.type(passwordInput, "test123");

    expect(
      screen.getByPlaceholderText(/johndoe@gmail.com/i)
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/test123/)).toBeInTheDocument();
  });

  it("submit button should work properly", async () => {
    const alertMock = vi.spyOn(window, "alert").mockImplementation(() => {});

    renderComponent();

    const emailInput = screen.getByRole("textbox", {
      name: /email/i,
    });
    const passwordInput = screen.getByPlaceholderText(/test123/i);
    const loginButton = screen.getByRole("button", {
      name: /log in/i,
    });

    const user = userEvent.setup();
    await user.type(emailInput, "johndoe@gmail.com");
    await user.type(passwordInput, "test123");
    await user.click(loginButton);

    expect(alertMock).toHaveBeenCalledWith("User logged in successfully");
  });
});
