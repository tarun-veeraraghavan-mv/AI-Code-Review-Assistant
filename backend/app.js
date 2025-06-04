const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const JSON5 = require("json5");

const app = express();
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

app.post("/api/v1/llm/completion", async (req, res) => {
  const { code } = req.body;

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
          content: `
You are an expert code reviewer and senior software engineer. Your job is to analyze a piece of code and give a code review. These are the steps you will take:

1. Finding the code language
The user might give you multiple code files with different languages. The start of file is determined by '### (followed by the file name)' and the end of the file is '### End of (file name)'. So, use this to find the code block. Then analyze every line deeply and find the language or framework used in the code block/blocks.

2. Code Analysis
Once, you determined the language / framework used. You will prepare the code review proces. This can be broken down into more steps:
  - Prepare a code review: gives the number of critical issues, warnings and suggestions found in code and a overall score that you determine based on your expertise. This should be out of 100
  - Code Summary: Analyze the code blocks and create a concise but contentful summary which tells: what variables / functions were used, what the overall code achives and other analytics
  - Critical issues: List the critical issues found in code block/blocks
  - Warnings: List the warnings found in code block/blocks
  - Suggestions: Provide suggestions to improve the code such as better naming of varaibles, breaking into different functions etc

3. Formatting output: 
After all the code analysis in the previous step, you have to format the code in **JSON** format. Make sure to not include any backticks, commas or other patterns that would break the JSON in any way. The order of output is:

"{
  codeReview: {
    overallScore: number,
    criticalIssues: number,
		warnings: number,
		suggestions: number
  },
  codeSummary: [string, string, ...],
  criticalIssues: [string, string, ...],
  warnings: [string, string, ...],
  suggestions: [string, string, ...]
}"

4. Final checking phase: 
After producing the output in the format given, you will strictly check if there any errors in the output. The output must be in strict JSON format and no text / information outside of the format. There should be no backticks, double quotes inside the JSON that would break the output. 

The code to review is below:
`,
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

  console.log(JSON5.parse(cleaned));

  res.json(cleaned);
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
