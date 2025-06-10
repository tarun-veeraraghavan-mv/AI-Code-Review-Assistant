const CodeReview = require("../models/CodeReview");
const reviewBotPrompt = require("../prompts/reviewBotPrompt");

exports.getAllReportsForUser = async (req, res) => {
  const { userId } = req.query;

  const reports = await CodeReview.find({ userId });

  res.status(200).json(reports);
};

exports.getReportById = async (req, res) => {
  const { reportId } = req.params;

  const report = await CodeReview.findOne({ _id: reportId });

  res.status(200).json(report);
};

exports.createReport = async (req, res) => {
  const { code, codeStandards, userId } = req.body;

  const openrouterApiKey =
    process.env.OPENROUTER_API_KEY ||
    "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";

  const openrouterApiUrl =
    process.env.OPENROUTER_API_URL ||
    "https://openrouter.ai/api/v1/chat/completions";

  const result = await fetch(openrouterApiUrl, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${openrouterApiKey}`,
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
};
