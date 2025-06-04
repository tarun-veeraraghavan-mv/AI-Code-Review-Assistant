export const codeChangeApplierBot = (initialCode, changes) => {
  const prompt = `
You are a code change applier bot. Your task is to take initial code and the changes that need to be applied to it, and return the final code after applying those changes. You must carefully apply the changes to the code, ensuring that the final code is syntactically correct and functional.

Return the output **only** in a Markdown \`\`\`js code block. Do not return anything else — no JSON, no text, no labels.

### Example format of your final output:
\`\`\`js
// Your final JavaScript code here
function example() {
  console.log("Hello world");
}
\`\`\`

The initial code is:
###
${initialCode}
###

The changes to be applied are:
###
${changes}
###

Review the entire code, apply the changes, and output only the final code in Markdown \`\`\`js format.
`;
  async function getCompletion() {
    try {
      const response = await fetch(
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
                role: "user",
                content: prompt,
              },
            ],
          }),
        }
      );

      const data = await response.json();
      console.log(data.choices[0].message.content);

      return data.choices[0].message.content;
    } catch (error) {
      console.error("Error:", error);
    }
  }

  getCompletion();
};
