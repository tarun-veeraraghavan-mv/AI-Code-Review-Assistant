import React from "react";
import { AiOutlineFileAdd } from "react-icons/ai";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaRegEdit } from "react-icons/fa";

export default function Sidebar({
  inputs,
  updateInput,
  addInput,
  handleDeleteCell,
  currentCellIndex,
  setCurrentCellIndex,
}) {
  return (
    <div style={{ backgroundColor: "#eee", padding: "10px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "30px",
        }}
      >
        <h2>Project files</h2>
        <div
          style={{
            padding: "10px",
            borderRadius: "50%",
            backgroundColor: "#007BFF",
          }}
        >
          <AiOutlineFileAdd
            size={25}
            style={{ cursor: "pointer" }}
            onClick={addInput}
            data-testid="add-button"
          />
        </div>
      </div>
      <ul
        style={{
          listStyle: "none",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {inputs.map((input, index) => (
          <div
            key={index}
            style={
              currentCellIndex === index
                ? {
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    backgroundColor: "#ccc",
                    padding: "10px",
                  }
                : {
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "10px",
                  }
            }
          >
            <input
              type="text"
              value={input.inputName}
              onChange={(e) => updateInput(index, "inputName", e.target.value)}
              placeholder="Rename file"
              style={{
                padding: "8px",
                border: "1px solid #ccc",
                borderRadius: "4px",
                fontSize: "14px",
                color: "#333",
                backgroundColor: "#fff",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                transition: "border-color 0.3s ease",
                width: "100%", // Ensures it takes the full width of the container
                marginBottom: "10px", // Adds spacing below the input
              }}
            />

            <div style={{ display: "flex", gap: "10px" }}>
              <FaRegTrashAlt
                size={27}
                style={
                  index === currentCellIndex
                    ? { backgroundColor: "#DC3545" }
                    : {}
                }
                onClick={() => handleDeleteCell(index)}
                data-testid="delete-button"
              />
              <button onClick={() => setCurrentCellIndex(index)}>Select</button>
            </div>
          </div>
        ))}
      </ul>
    </div>
  );
}
