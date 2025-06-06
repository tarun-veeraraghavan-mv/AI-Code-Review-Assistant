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
  createReport,
} = require("./controllers/reportController");
const {
  uploadCodeStandards,
  getCodeStandardsForUser,
} = require("./controllers/codeStandardsController");

const app = express();
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

app.post("/api/v1/llm/completion", createReport);

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
