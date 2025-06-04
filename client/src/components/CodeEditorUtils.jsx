import React from "react";
import AppButton from "./AppButton";

export default function CodeEditorUtils({
  input,
  index,
  updateInput,
  handleClearCell,
  handleDeleteCell,
}) {
  return (
    <div>
      <input
        type="text"
        value={input.inputName}
        onChange={(e) => updateInput(index, "inputName", e.target.value)}
        placeholder={`File name ${index + 1}`}
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
      <select
        name="language"
        id="language"
        onChange={(e) => updateInput(index, "language", e.target.value)}
        style={{
          padding: "12px",
          border: "1px solid #ccc",
          borderRadius: "4px",
          fontSize: "14px",
          color: "#333",
          backgroundColor: "#fff",
          cursor: "pointer",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          transition: "border-color 0.3s ease",
        }}
      >
        <option value="not given">Select the language you have used</option>
        <option value="javascript">Javascript</option>
        <option value="typescript">Typescript</option>
        <option value="go">Golang</option>
        <option value="java">Java</option>
        <option value="python">Python</option>
        <option value="php">PHP</option>
        <option value="determine yourself">Other...</option>
      </select>

      <AppButton
        onClick={() => handleClearCell(index)}
        backgroundColor="#ffa500"
      >
        Clear cell
      </AppButton>
      <AppButton
        onClick={() => handleDeleteCell(index)}
        backgroundColor="#dc3545"
      >
        Delete cell
      </AppButton>
    </div>
  );
}
