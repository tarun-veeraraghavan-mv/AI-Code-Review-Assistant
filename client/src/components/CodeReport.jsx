import React from "react";
import RenderList from "../utils/RenderList";
import ScoreCard from "./ScoreCard";

export default function CodeReport({ review }) {
  return (
    <div>
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

        <div style={{ marginBottom: "22px" }}>
          <h2 style={{ marginBottom: "14px" }}>Code summary</h2>
          <ul
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: "18px",
            }}
          >
            {review.codeSummary.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
        </div>

        <div style={{ marginBottom: "30px" }}>
          <h2 style={{ marginBottom: "20px" }}>Code Analysis!!!</h2>

          <div style={{ marginBottom: "15px" }}>
            <h3 style={{ marginBottom: "10px" }}>Critical Issues</h3>
            <RenderList list={review.criticalIssues} />
          </div>

          <div style={{ marginBottom: "10px" }}>
            <h3 style={{ marginBottom: "10px" }}>Warnings</h3>
            <RenderList list={review.warnings} />
          </div>

          <div style={{ marginBottom: "10px" }}>
            <h3 style={{ marginBottom: "10px" }}>Suggestions:</h3>
            <RenderList list={review.suggestions} />
          </div>
        </div>
      </div>
    </div>
  );
}
