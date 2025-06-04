import axios from "axios";
import { formatCode } from "./formatCode";

export async function getAi(inputs) {
  const code = formatCode(inputs);
  const result = await axios.post(
    "http://localhost:3000/api/v1/llm/completion",
    {
      code,
    }
  );
  const parsed = JSON.parse(result.data);
  return parsed;
}
