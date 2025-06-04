import { useState } from "react";
import { useInputs } from "../hooks/useInputs";
import RenderList from "../utils/renderList";
import CodeEditorPanel from "./CodeEditorPanel";
import CodeStandardsUpload from "./CodeStandardsUpload";
import ScoreCard from "./ScoreCard";

import { downloadPDF } from "../utils/fileSave";
import SettingsParentComp from "./SettingsParentComp";
import AppButton from "./AppButton";
import { getAi } from "../utils/api";
import CodeEditorUtils from "./CodeEditorUtils";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

export default function TestComp() {
  const { inputs, setInputs, addInput, deleteInput, updateInput, clearInput } =
    useInputs();

  const [review, setReview] = useState("");

  const [editorSettings, setEditorSettings] = useState({
    tabSize: 2,
    fontSize: 16,
    theme: "vs-dark",
  });

  const navigate = useNavigate();

  function handleClearCell(index) {
    const res = window.confirm(
      "Are you sure you want to delete this cell? This will remove the cell and all its content."
    );
    if (res) {
      clearInput(index);
    }
  }

  function handleDeleteCell(index) {
    const res = window.confirm(
      "Are you sure you want to delete this cell? This will remove the cell and all its content."
    );
    if (res) {
      deleteInput(index);
    }
  }

  async function getAiRequest() {
    const res = await getAi(inputs);
    console.log(res);
    setReview(res);
  }

  return (
    <div style={{ padding: "10px" }}>
      <Navbar />

      <div
        style={{ display: "grid", gridTemplateColumns: "0.3fr 0.66fr" }}
      ></div>
      <Sidebar />

      <SettingsParentComp setEditorSettings={setEditorSettings} />
      <div style={{ marginBottom: "30px" }}>
        <AppButton backgroundColor="#007bff" onClick={getAiRequest}>
          Get AI Response
        </AppButton>

        <AppButton onClick={addInput} backgroundColor="#28a745">
          Add code cell
        </AppButton>
      </div>

      <CodeStandardsUpload />

      <div
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}
      >
        {inputs.map((input, index) => (
          <div key={index}>
            <CodeEditorUtils
              handleClearCell={handleClearCell}
              handleDeleteCell={handleDeleteCell}
              index={index}
              input={input}
              updateInput={updateInput}
            />

            <CodeEditorPanel
              input={input}
              index={index}
              setInputs={setInputs}
              editorSettings={editorSettings}
              language={input.language}
            />
          </div>
        ))}
      </div>

      <div>
        <button onClick={getAiRequest}>Get AI response</button>
      </div>

      <div>
        {review !== "" && (
          <div style={{ marginTop: "50px" }}>
            <div>
              <button onClick={downloadPDF}>Donwload report as PDF</button>
            </div>
            <div
              id="code-review-report"
              style={{
                padding: "10px",
              }}
            >
              <div style={{ marginBottom: "30px" }}>
                <ScoreCard
                  score={{
                    codeScore: {
                      overallScore: review.codeReview.overallScore,
                      criticalIssues: review.codeReview.criticalIssues,
                      warnings: review.codeReview.warnings,
                      suggestions: review.codeReview.suggestions,
                    },
                  }}
                />
              </div>

              <div style={{ marginBottom: "30px" }}>
                <h2>Code summary</h2>
                <ul>
                  {review.codeSummary.map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ul>
              </div>

              <div style={{ marginBottom: "30px" }}>
                <h2 style={{ marginBottom: "20px" }}>Code Analysis</h2>

                <div style={{ marginBottom: "10px" }}>
                  <h3>Critical Issues</h3>
                  <RenderList list={review.criticalIssues} />
                </div>

                <div style={{ marginBottom: "10px" }}>
                  <h3>Warnings</h3>
                  <RenderList list={review.warnings} />
                </div>

                <div style={{ marginBottom: "10px" }}>
                  <h3>Suggestions:</h3>
                  <RenderList list={review.suggestions} />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
