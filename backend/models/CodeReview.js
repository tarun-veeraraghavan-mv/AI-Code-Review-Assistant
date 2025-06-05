const mongoose = require("mongoose");

const CodeReviewSchema = new mongoose.Schema({
  codeReview: {
    overallScore: { type: Number, required: true },
    criticalIssues: { type: Number, required: true },
    warnings: { type: Number, required: true },
    suggestions: { type: Number, required: true },
  },
  codeSummary: [{ type: String, required: true }],
  criticalIssues: [{ type: String, required: true }],
  warnings: [{ type: String, required: true }],
  suggestions: [{ type: String, required: true }],
  userId: {
    type: String,
  },
});

module.exports = mongoose.model("CodeReview", CodeReviewSchema);
