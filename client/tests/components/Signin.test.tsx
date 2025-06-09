import React, { use } from "react";
import { describe, it, expect, vi } from "vitest";
import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

import Signin from "../../src/components/Signin";
import { AuthProvider } from "../../src/contexts/AuthContext";
import { MemoryRouter, Route, Routes } from "react-router-dom";

describe("Signin", () => {
  const renderComponent = () => {
    render(
      <AuthProvider>
        <MemoryRouter initialEntries={["/signin"]}>
          <Routes>
            <Route path="/signin" element={<Signin />} />
          </Routes>
        </MemoryRouter>
      </AuthProvider>
    );
  };

  it("should render signin form properly", () => {
    renderComponent();

    const nameInput = screen.getByRole("textbox", {
      name: /name/i,
    });
    const emailInput = screen.getByRole("textbox", {
      name: /email/i,
    });
    const passwordInput = screen.getByPlaceholderText(/test123/i);
    const signinButton = screen.getByTestId("form-signin-button");
    const loginButton = screen.getByRole("link", {
      name: /log in/i,
    });

    expect(nameInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(signinButton).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
  });

  it("can type on inputs", async () => {
    renderComponent();

    const nameInput = screen.getByRole("textbox", {
      name: /name/i,
    });
    const emailInput = screen.getByRole("textbox", {
      name: /email/i,
    });
    const passwordInput = screen.getByPlaceholderText(/test123/i);

    const user = userEvent.setup();

    await user.type(nameInput, "John Doe");
    await user.type(emailInput, "johndoe@gmail.com");
    await user.type(passwordInput, "test123");

    expect(screen.getByPlaceholderText(/john doe/i)).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/johndoe@gmail.com/i)
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/test123/)).toBeInTheDocument();
  });

  it("submit button should work properly", async () => {
    const alertMock = vi.spyOn(window, "alert").mockImplementation(() => {});

    renderComponent();

    const nameInput = screen.getByRole("textbox", {
      name: /name/i,
    });
    const emailInput = screen.getByRole("textbox", {
      name: /email/i,
    });
    const passwordInput = screen.getByPlaceholderText(/test123/i);
    const submitButton = screen.getByTestId("form-signin-button");
    const user = userEvent.setup();

    await user.type(nameInput, "John Doe");
    await user.type(emailInput, "johndoe@gmail.com");
    await user.type(passwordInput, "test123");
    await user.click(submitButton);

    expect(alertMock).toHaveBeenCalledWith("User created successfully");

    alertMock.mockRestore();
  });
});
