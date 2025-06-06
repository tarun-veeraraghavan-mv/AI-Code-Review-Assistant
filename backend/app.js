const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const JSON5 = require("json5");
const { reviewBotPrompt } = require("./prompts/reviewBotPrompt");
const { register, me, login } = require("./controllers/userController");
const CodeReview = require("./models/CodeReview");
const {
  getAllReportsForUser,
  getReportById,
} = require("./controllers/reportController");
const {
  uploadCodeStandards,
  getCodeStandardsForUser,
} = require("./controllers/codeStandardsController");

const app = express();
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

app.post("/api/v1/llm/completion", async (req, res) => {
  const { code, codeStandards, userId } = req.body;

  console.log(codeStandards);

  const result = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization:
        "Bearer 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",
      "HTTP-Referer": "<YOUR_SITE_URL>", // Optional. Site URL for rankings on openrouter.ai.
      "X-Title": "<YOUR_SITE_NAME>", // Optional. Site title for rankings on openrouter.ai.
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "deepseek/deepseek-r1-0528-qwen3-8b:free",
      messages: [
        {
          role: "system",
          content: reviewBotPrompt(codeStandards),
        },
        {
          role: "user",
          content: `${code}
					`,
        },
      ],
    }),
  });

  const data = await result.json();
  console.log(data);
  const cleaned = data.choices[0].message.content
    .replace(/```json|```/gi, "")
    .trim();

  const parsed = JSON5.parse(cleaned);
  const finalCode = { ...parsed, userId };
  console.log(finalCode);

  const report = await CodeReview.create(finalCode);

  res.json(report);
});

app.get("/hello", (req, res) => {
  res.status(200).json({ message: "Hello World" });
});

app.post("/api/v1/users/register", register);
app.post("/api/v1/users/login", login);
app.post("/api/v1/users/me", me);

// reports
app.get("/api/v1/reviews", getAllReportsForUser);
app.get("/api/v1/reviews/:reportId", getReportById);

// code standards
app.post("/api/v1/codeStandards", uploadCodeStandards);
app.get("/api/v1/codeStandards", getCodeStandardsForUser);

module.exports = app;
