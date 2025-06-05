import { useState } from "react";
import { useInputs } from "../hooks/useInputs";
import CodeEditorPanel from "./CodeEditorPanel";
import CodeStandardsUpload from "./CodeStandardsUpload";

import CodeEditorUtils from "./CodeEditorUtils";
import CodeReport from "./CodeReport";
import Navbar from "./Navbar";
import SettingsParentComp from "./SettingsParentComp";
import Sidebar from "./Sidebar";

export default function TestComp() {
  const { inputs, setInputs, addInput, deleteInput, updateInput, clearInput } =
    useInputs();
  const [editorSettings, setEditorSettings] = useState({
    tabSize: 2,
    fontSize: 16,
    theme: "vs-dark",
  });
  const [currentCellIndex, setCurrentCellIndex] = useState(0);
  const [fileContent, setFileContent] = useState(
    "User did not provide any standards"
  );

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

      <CodeStandardsUpload setFileContent={setFileContent} />

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
          setCurrentCellIndex={setCurrentCellIndex}
          currentCellIndex={currentCellIndex}
        />

        <div>
          {inputs.map(
            (input, index) =>
              index === currentCellIndex && (
                <div key={index}>
                  <CodeEditorUtils
                    clearInput={clearInput}
                    index={index}
                    input={input}
                    updateInput={updateInput}
                    inputs={inputs}
                    codeStandards={fileContent}
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
