import React from "react";
import AppButton from "./AppButton";
import { useCodeReviewLLM } from "../hooks/useCodeReviewLLM";

export default function CodeEditorUtils({
  index,
  updateInput,
  clearInput,
  inputs,
  setReview,
}) {
  const { getAi, loading } = useCodeReviewLLM();

  async function getAiRequest() {
    try {
      const question = window.confirm(
        "Are you sure you want to start the code review process"
      );
      if (question) {
        const res = await getAi(inputs);
        console.log(res);
        setReview(res);
      }
    } catch (err) {
      console.log(err);
    } finally {
      alert("Code review finished! Scroll down please");
    }
  }

  function handleClearCell(index) {
    const res = window.confirm(
      "Are you sure you want to clear this cell? This will remove all its content."
    );
    if (res) {
      clearInput(index);
    }
  }

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#eee",
        padding: "2px 1px",
      }}
    >
      <div>
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
          <option value="not given">Select language</option>
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
          backgroundColor="#888"
        >
          Clear code
        </AppButton>
      </div>
      <div>
        <AppButton
          backgroundColor="#007bff"
          onClick={getAiRequest}
          disabled={loading}
        >
          Start Code Review
        </AppButton>
      </div>
    </div>
  );
}
