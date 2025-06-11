import React, { useEffect } from "react";

export default function AppButton({
  onClick,
  backgroundColor,
  children,
  disabled = false,
  id = "none",
}) {
  useEffect(() => {
    console.log(import.meta.env);
  });

  return (
    <button
      onClick={onClick}
      style={{
        backgroundColor,
        color: "#fff",
        border: "none",
        borderRadius: "5px",
        padding: "10px 20px",
        fontSize: "16px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        transition: "background-color 0.3s ease",
        cursor: disabled ? "not-allowed" : "pointer",
      }}
      disabled={disabled}
      id={id}
      data-testid={id}
    >
      {disabled ? "Loading..." : children}
    </button>
  );
}
