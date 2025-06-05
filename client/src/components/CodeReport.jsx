import RenderList from "../utils/renderList";
import ScoreCard from "./ScoreCard";

export default function CodeReport({ review }) {
  return (
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
  );
}
