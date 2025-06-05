import React from "react";
import AppButton from "./AppButton";

export default function SettingsPanel({
  setEditorSettings,
  setOpen,
  editorSettings,
}) {
  return (
    <div
      style={{
        padding: "10px 20px",
        position: "absolute",
        top: "40px",
        right: "80px",
        backgroundColor: "#fff",
        borderRadius: "8px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
        zIndex: 1000,
      }}
    >
      <h2
        style={{
          marginBottom: "20px",
        }}
      >
        Settings
      </h2>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          marginBottom: "30px",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "20px",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <label htmlFor="tabSize" style={{ fontSize: "20px" }}>
            Tab Size
          </label>
          <select
            name="tabSize"
            id="tabSize"
            value={editorSettings.tabSize}
            onChange={(e) =>
              setEditorSettings((prev) => ({
                ...prev,
                tabSize: parseInt(e.target.value),
              }))
            }
            style={{ fontSize: "18px", padding: "5px 10px" }}
          >
            <option value="2">2 Spaces</option>
            <option value="4">4 Spaces</option>
          </select>
        </div>
        <div
          style={{
            display: "flex",
            gap: "20px",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <label htmlFor="theme" style={{ fontSize: "20px" }}>
            Theme
          </label>
          <select
            name="theme"
            id="theme"
            value={editorSettings.theme}
            onChange={(e) =>
              setEditorSettings((prev) => ({
                ...prev,
                theme: e.target.value,
              }))
            }
            style={{ fontSize: "18px", padding: "5px 10px" }}
          >
            <option value="vs-dark">vs-dark</option>
            <option value="vs-light">vs-light</option>
            <option value="hc-black">hc-black</option>
          </select>
        </div>
        <div
          style={{
            display: "flex",
            gap: "20px",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <label htmlFor="fontSize" style={{ fontSize: "20px" }}>
            Font size
          </label>
          <input
            type="number"
            min={0}
            max={30}
            id="fontSize"
            name="fontSize"
            value={editorSettings.fontSize}
            onChange={(e) =>
              setEditorSettings((prev) => ({
                ...prev,
                fontSize: parseInt(e.target.value),
              }))
            }
            style={{ fontSize: "18px", padding: "5px 10px" }}
          />
        </div>
      </div>
      <AppButton backgroundColor="#999" onClick={() => setOpen(false)}>
        Close
      </AppButton>
    </div>
  );
}
