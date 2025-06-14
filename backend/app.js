const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const JSON5 = require("json5");
const { reviewBotPrompt } = require("./prompts/reviewBotPrompt");
const {
  register,
  me,
  login,
  findUserByEmail,
  findUserById,
} = require("./controllers/userController");
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

const clientUrl = process.env.CLIENT_API_URL || "http://localhost:5173";

const app = express();
app.use(cors({ origin: clientUrl }));
app.use(express.json());

app.post("/api/v1/users/register", register);
app.post("/api/v1/users/login", login);
app.post("/api/v1/users/me", me);
app.get("/api/v1/users/:email", findUserByEmail);
app.get("/api/v1/users/byId/:id", findUserById);

// reports
app.post("/api/v1/llm/completion", createReport);
app.get("/api/v1/reviews", getAllReportsForUser);
app.get("/api/v1/reviews/:reportId", getReportById);

// code standards
app.post("/api/v1/codeStandards", uploadCodeStandards);
app.get("/api/v1/codeStandards", getCodeStandardsForUser);

module.exports = app;
