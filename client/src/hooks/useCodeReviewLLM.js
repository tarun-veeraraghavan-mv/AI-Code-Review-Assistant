import axios from "axios";
import { formatCode } from "../utils/formatCode";
import { useState } from "react";

export function useCodeReviewLLM(userId) {
  const [loading, setLoading] = useState(false);

  async function getAi(inputs, codeStandards) {
    try {
      setLoading(true);
      const code = formatCode(inputs);
      const result = await axios.post(
        "http://localhost:3000/api/v1/llm/completion",
        { code, codeStandards, userId }
      );

      return result.data;
    } catch (err) {
      console.error("Error calling LLM API:", err);
      throw err; // rethrow so the caller can handle it
    } finally {
      setLoading(false);
    }
  }

  return { getAi, loading };
}
