import { useState } from "react";
import { formatCode } from "../utils/formatCode";
import { prompt } from "../models/codeReviewerBot";

export function useLLM(inputs) {
  const [transcript, setTranscript] = useState("");
  const [loadingResponse, setLoadingResponse] = useState(false);

  async function getCompletion() {
    try {
      setLoadingResponse(true);
      console.log("Fetching AI response for:", transcript);

      const formattedCode = formatCode(inputs);
      console.log("Formatted Code:", formattedCode);

      console.log("Sending to LLM:\n\n", formattedCode);

      const aiResponse = await fetch(
        "https://openrouter.ai/api/v1/chat/completions",
        {
          method: "POST",
          headers: {
            Authorization:
              "Bearer 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",
            "HTTP-Referer": "<YOUR_SITE_URL>",
            "X-Title": "<YOUR_SITE_NAME>",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "deepseek/deepseek-r1-0528-qwen3-8b:free",
            messages: [
              {
                role: "system",
                content: prompt,
              },
              {
                role: "user",
                content: formattedCode,
              },
            ],
          }),
        }
      );

      const data = await aiResponse.json();
      const cleaned = JSON.parse(
        data.choices[0].message.content.replace(/```json|```/g, "").trim()
      );
      console.log(cleaned);
      setTranscript(cleaned);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoadingResponse(false);
    }
  }

  return {
    transcript,
    loadingResponse,
    getCompletion,
  };
}
