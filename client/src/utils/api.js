import axios from "axios";
import { formatCode } from "./formatCode";

export async function getAi(inputs) {
  try {
    const code = formatCode(inputs);
    const result = await axios.post(
      "http://localhost:3000/api/v1/llm/completion",
      {
        code,
      }
    );
    const parsed = JSON.parse(result.data);
    return parsed;
  } catch (err) {
    console.log(err);
  }
}

export async function register(name, email, password) {
  try {
    const res = await axios.post(
      "http://localhost:3000/api/v1/users/register",
      {
        name,
        email,
        password,
      }
    );

    return res.data;
  } catch (err) {
    console.log(err);
  }
}
