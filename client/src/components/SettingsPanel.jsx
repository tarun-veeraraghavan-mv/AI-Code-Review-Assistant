export default function SettingsPanel({ setEditorSettings }) {
  return (
    <div
      style={{
        padding: "20px",
        position: "absolute",
        top: "40px",
        right: "80px",
        backgroundColor: "#fff",
        borderRadius: "8px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
        zIndex: 1000,
      }}
    >
      <h2>Settings</h2>
      <div>
        <div>
          <label htmlFor="tabSize">Tab Size</label>
          <select
            name="tabSize"
            id="tabSize"
            onChange={(e) =>
              setEditorSettings((prev) => ({
                ...prev,
                tabSize: parseInt(e.target.value),
              }))
            }
          >
            <option value="2">2 Spaces</option>
            <option value="4">4 Spaces</option>
          </select>
        </div>
        <div>
          <label htmlFor="theme">Theme</label>
          <select
            name="theme"
            id="theme"
            onChange={(e) =>
              setEditorSettings((prev) => ({
                ...prev,
                theme: e.target.value,
              }))
            }
          >
            <option value="vs-dark">vs-dark</option>
            <option value="vs-light">vs-light</option>
            <option value="hc-black">hc-black</option>
          </select>
        </div>
        <div>
          <label htmlFor="fontSize">Font size</label>
          <input
            type="number"
            min={0}
            max={30}
            id="fontSize"
            name="fontSize"
            defaultValue={16}
            onChange={(e) =>
              setEditorSettings((prev) => ({
                ...prev,
                fontSize: parseInt(e.target.value),
              }))
            }
          />
        </div>
      </div>
    </div>
  );
}
