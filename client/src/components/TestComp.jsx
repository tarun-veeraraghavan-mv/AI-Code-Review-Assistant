import { useState } from "react";
import { useInputs } from "../hooks/useInputs";
import RenderList from "../utils/renderList";
import CodeEditorPanel from "./CodeEditorPanel";
import CodeStandardsUpload from "./CodeStandardsUpload";
import ScoreCard from "./ScoreCard";

import { downloadPDF } from "../utils/fileSave";
import SettingsParentComp from "./SettingsParentComp";
import AppButton from "./AppButton";
import CodeEditorUtils from "./CodeEditorUtils";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import CodeReport from "./CodeReport";

export default function TestComp() {
  const { inputs, setInputs, addInput, deleteInput, updateInput, clearInput } =
    useInputs();

  const [review, setReview] = useState("");

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
                    setReview={setReview}
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

      <SettingsParentComp setEditorSettings={setEditorSettings} />

      <div>
        {review !== "" && (
          <div style={{ marginTop: "50px" }}>
            <div>
              <button onClick={downloadPDF}>Donwload report as PDF</button>
            </div>
            <CodeReport review={review} />
          </div>
        )}
      </div>
    </div>
  );
}
