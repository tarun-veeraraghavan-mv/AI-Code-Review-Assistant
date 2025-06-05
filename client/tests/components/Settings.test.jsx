import React from "react";
import { describe, it, expect, vi } from "vitest";
import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { AuthProvider } from "../../src/contexts/AuthContext";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SettingsParentComp from "../../src/components/SettingsParentComp";
import SettingsPanel from "../../src/components/SettingsPanel";

describe("Settings", (editorSettings = {
  tabSize: 2,
  theme: "light",
  fontSize: 16,
}) => {
  const mockSetEditorSettings = vi.fn();

  const renderComponent = () => {
    render(
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <SettingsParentComp
                  editorSettings={editorSettings}
                  setEditorSettings={mockSetEditorSettings}
                />
              }
            />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    );
  };

  it("renders the button and tab is initially closed", () => {
    renderComponent();

    const settingsButton = screen.getByRole("button", {
      name: /settings/i,
    });

    expect(settingsButton).toBeInTheDocument();
  });

  it("when the button is clicked the settings panel should open and close properly", async () => {
    renderComponent();

    const settingsButton = screen.getByRole("button", {
      name: /settings/i,
    });

    const user = userEvent.setup();
    await user.click(settingsButton);

    const settingsPanelHeader = screen.getByRole("heading", {
      name: /settings/i,
    });

    expect(settingsPanelHeader).toBeInTheDocument();

    const closeButton = screen.getByRole("button", {
      name: /close/i,
    });

    await user.click(closeButton);

    expect(settingsPanelHeader).not.toBeInTheDocument();
  });

  it("settings panel should be rendered panel", async () => {
    renderComponent();

    const settingsButton = screen.getByRole("button", {
      name: /settings/i,
    });

    const user = userEvent.setup();
    await user.click(settingsButton);

    const settingsPanelHeader = screen.getByRole("heading", {
      name: /settings/i,
    });

    expect(settingsPanelHeader).toBeInTheDocument();

    const tabSizeLabel = screen.getByText(/tab size/i);
    const themeLabel = screen.getByText(/theme/i);
    const fontSizeLabel = screen.getByText(/font size/i);

    const tabSizeSelect = screen.getByRole("combobox", {
      name: /tab size/i,
    });
    const themeSelect = screen.getByRole("combobox", {
      name: /theme/i,
    });
    const fontSizeInput = screen.getByRole("spinbutton", {
      name: /font size/i,
    });

    const closeButton = screen.getByRole("button", {
      name: /close/i,
    });

    expect(tabSizeLabel).toBeInTheDocument();
    expect(themeLabel).toBeInTheDocument();
    expect(fontSizeLabel).toBeInTheDocument();

    expect(tabSizeSelect).toBeInTheDocument();
    expect(themeSelect).toBeInTheDocument();
    expect(fontSizeInput).toBeInTheDocument();

    expect(closeButton).toBeInTheDocument();
  });

  it("settings panel can change tab size and theme options", async () => {
    const mockSetEditorSettings = vi.fn(); // Mock the setEditorSettings function
    const editorSettings = { tabSize: 2, theme: "light", fontSize: 16 };

    render(
      <SettingsPanel
        editorSettings={editorSettings}
        setEditorSettings={mockSetEditorSettings}
      />
    );

    const user = userEvent.setup();

    const tabSizeSelect = screen.getByRole("combobox", {
      name: /tab size/i,
    });
    const themeSelect = screen.getByRole("combobox", {
      name: /theme/i,
    });

    await user.selectOptions(tabSizeSelect, "4");
    await user.selectOptions(themeSelect, "vs-light");

    expect(screen.getByText(/4 spaces/i)).toBeInTheDocument();
    expect(screen.getByText(/vs-light/i)).toBeInTheDocument();
  });
});
