import React from "react";
import { screen, render } from "@testing-library/react";
import { expect, describe, it, vi } from "vitest";
import "@testing-library/jest-dom";
import Sidebar from "../../src/components/Sidebar";
import userEvent from "@testing-library/user-event";

describe("Sidebar", () => {
  const mockInputs = [{ inputName: "File 1" }, { inputName: "File 2" }];
  const mockUpdateInput = vi.fn();
  const mockAddInput = vi.fn();
  const mockHandleDeleteCell = vi.fn();
  const mockSetCurrentCellIndex = vi.fn();

  const renderComponent = () => {
    render(
      <Sidebar
        inputs={mockInputs}
        updateInput={mockUpdateInput}
        addInput={mockAddInput}
        handleDeleteCell={mockHandleDeleteCell}
        currentCellIndex={0}
        setCurrentCellIndex={mockSetCurrentCellIndex}
      />
    );
  };

  it("should render all inputs and buttons correctly", () => {
    renderComponent();

    expect(screen.getByText(/project files/i)).toBeVisible();

    const fileRenameInputFields =
      screen.getAllByPlaceholderText(/rename file/i);
    expect(fileRenameInputFields).toHaveLength(mockInputs.length);

    const addButton = screen.getByTestId("add-button");

    expect(addButton).toBeInTheDocument();
  });

  it("should call addInput when the add button is clicked", async () => {
    renderComponent();

    const addButton = screen.getByTestId("add-button");

    const user = userEvent.setup();

    await user.click(addButton);

    expect(mockAddInput).toHaveBeenCalled();
  });

  it("should call handleDeleteCell when delete button is clicked", async () => {
    renderComponent();

    const deleteButton = screen.getAllByTestId("delete-button");

    const user = userEvent.setup();
    await user.click(deleteButton[0]);

    expect(mockHandleDeleteCell).toHaveBeenCalled();
    expect(mockHandleDeleteCell).toHaveBeenCalledWith(0);
  });

  it("should call updateInput when user types on the Rename file input", async () => {
    renderComponent();

    const renameFileInputs = screen.getAllByPlaceholderText(/rename file/i);

    const user = userEvent.setup();
    await user.click(renameFileInputs[0]);
    await user.clear(renameFileInputs[0]);
    await user.type(renameFileInputs[0], "file 1");

    expect(mockUpdateInput).toHaveBeenCalled();
  });

  it("should call setCurrentIndex when the select button is clicked", async () => {
    renderComponent();

    const selectButton = screen.getAllByRole("button", {
      name: /select/i,
    });

    const user = userEvent.setup();
    await user.click(selectButton[1]);

    expect(mockSetCurrentCellIndex).toHaveBeenCalled();
    expect(mockSetCurrentCellIndex).toHaveBeenCalledWith(1);
  });
});
