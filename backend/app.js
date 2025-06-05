const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const JSON5 = require("json5");
const { reviewBotPrompt } = require("./prompts/reviewBotPrompt");
const { register, me, login } = require("./controllers/userController");

mongoose
  .connect(
    "mongodb+srv://tarunv1911:ea0cj8dzRV2NhFmT@cluster0.70deyvr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

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
          content: `${reviewBotPrompt}`,
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

app.post("/api/v1/users/register", register);
app.post("/api/v1/users/login", login);
app.post("/api/v1/users/me", me);

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
