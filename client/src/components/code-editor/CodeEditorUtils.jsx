import React from "react";
import AppButton from "../../ui/AppButton";
import { useCodeReviewLLM } from "../../hooks/useCodeReviewLLM";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function CodeEditorUtils({
  index,
  updateInput,
  clearInput,
  inputs,
  codeStandards,
}) {
  const { user } = useAuth();
  const userId = user?._id;
  const { getAi, loading } = useCodeReviewLLM(user?._id);
  const navigate = useNavigate();

  async function getAiRequest() {
    try {
      const question = window.confirm(
        "Are you sure you want to start the code review process"
      );
      console.log(userId);
      if (question) {
        const res = await getAi(inputs, codeStandards, userId);
        console.log(res, codeStandards);
        toast.success("Code review finished!");
        navigate(`/report/${res._id}`);
      }
    } catch (err) {
      console.log(err);
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
          data-testid="language-select"
          name="language"
          id="language"
          value={inputs[index]?.language || "not given"}
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
