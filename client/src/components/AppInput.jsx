import { useState } from "react";

export default function AppInput({ labelText, placeholderText, id, type }) {
  const [value, setValue] = useState("");

  return (
    <div>
      <label
        htmlFor={id}
        style={{
          display: "block",
          marginBottom: "5px",
          fontSize: "20px",
          color: "#333",
        }}
      >
        {labelText}
      </label>
      <input
        type={type}
        id={id}
        name={id}
        placeholder={placeholderText}
        style={{
          width: "100%",
          padding: "10px",
          border: "1px solid #ccc",
          borderRadius: "5px",
          fontSize: "18px",
        }}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
}
