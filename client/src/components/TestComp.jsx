import { useState } from "react";
import { useInputs } from "../hooks/useInputs";
import CodeEditorPanel from "./code-editor/CodeEditorPanel";
import CodeStandardsUpload from "./code-standards/CodeStandardsUpload";

import Navbar from "../ui/Navbar";
import CodeEditorUtils from "./code-editor/CodeEditorUtils";
import Sidebar from "./code-editor/Sidebar";
import SettingsParentComp from "./settings/SettingsParentComp";

export default function TestComp() {
  const { inputs, setInputs, addInput, deleteInput, updateInput, clearInput } =
    useInputs();
  const [editorSettings, setEditorSettings] = useState({
    tabSize: 2,
    fontSize: 16,
    theme: "vs-dark",
  });
  const [currentCellIndex, setCurrentCellIndex] = useState(0);

  function handleDeleteCell(index) {
    const res = window.confirm(
      "Are you sure you want to delete this cell? This will remove the cell and all its content."
    );
    if (res) {
      deleteInput(index);
    }
  }

  return (
    <div style={{ padding: "10px" }}>
      <Navbar />

      <CodeStandardsUpload />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "0.3fr 1fr",
        }}
      >
        <Sidebar
          inputs={inputs}
          updateInput={updateInput}
          addInput={addInput}
          handleDeleteCell={handleDeleteCell}
          currentCellIndex={currentCellIndex}
          setCurrentCellIndex={setCurrentCellIndex}
        />

        <div>
          {inputs.map(
            (input, index) =>
              index === currentCellIndex && (
                <div key={index}>
                  <CodeEditorUtils
                    inputs={inputs}
                    index={index}
                    // codeStandardss={fileContent}
                    updateInput={updateInput}
                    clearInput={clearInput}
                  />

                  <CodeEditorPanel
                    input={input}
                    index={index}
                    setInputs={setInputs}
                    editorSettings={editorSettings}
                    language={input.language}
                  />
                </div>
              )
          )}
        </div>
      </div>

      <SettingsParentComp
        setEditorSettings={setEditorSettings}
        editorSettings={editorSettings}
      />
    </div>
  );
}
