import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const ScoreCard = ({ score }) => {
  const { overallScore, criticalIssues, warnings, suggestions } =
    score.codeScore;

  const getColor = () => {
    if (overallScore >= 80) return "#22c55e"; // green
    if (overallScore >= 50) return "#eab308"; // yellow
    return "#ef4444"; // red
  };

  return (
    <div className="scorecard-container">
      <h2 className="scorecard-title">Code Quality Report</h2>
      <div className="scorecard-content">
        <div className="scorecard-stats">
          <p>
            <span>🔥 Critical Issues:</span> {criticalIssues}
          </p>
          <p>
            <span>⚠️ Warnings:</span> {warnings}
          </p>
          <p>
            <span>💡 Suggestions:</span> {suggestions}
          </p>
        </div>
        <div className="scorecard-ring">
          <CircularProgressbar
            value={overallScore}
            text={`${overallScore}`}
            styles={buildStyles({
              textColor: "#ffffff",
              textSize: "28px",
              pathColor: getColor(),
              trailColor: "#2e2e2e",
            })}
          />
        </div>
      </div>
    </div>
  );
};

export default ScoreCard;
