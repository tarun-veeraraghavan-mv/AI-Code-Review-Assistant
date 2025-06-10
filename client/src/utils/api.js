import axios from "axios";
import { formatCode } from "./formatCode";

const BACKEND_URL = process.env.VITE_BACKEND_API_URL || "http://localhost:3000";

export async function getAi(inputs, codeStandards, userId) {
  try {
    const code = formatCode(inputs);
    const result = await axios.post(`${BACKEND_URL}/api/v1/llm/completion`, {
      code,
      codeStandards,
      userId,
    });
    const parsed = JSON.parse(result.data);
    console.log(userId + " sent");

    return parsed;
  } catch (err) {
    console.log(err);
  }
}

export async function register(name, email, password) {
  try {
    const res = await axios.post(`${BACKEND_URL}/api/v1/users/register`, {
      name,
      email,
      password,
    });

    return res.data;
  } catch (err) {
    console.log(err);
  }
}

export async function login(email, password) {
  try {
    const res = await axios.post(`${BACKEND_URL}/api/v1/users/login`, {
      email,
      password,
    });

    return res.data;
  } catch (err) {
    console.log(err);
  }
}

export async function getAllReportsForUser(userId) {
  try {
    const reports = await axios.get(`${BACKEND_URL}/api/v1/reviews`, {
      params: { userId },
    });

    const res = reports.data;

    return res;
  } catch (err) {
    console.log(err);
  }
}

export async function codeStandardsUpload(codeStandards, userId) {
  try {
    const res = await axios.post(`${BACKEND_URL}/api/v1/codeStandards`, {
      userId,
      codeStandards,
    });

    return res.data;
  } catch (err) {
    console.log(err);
  }
}

export async function getCodeStandardsForUser(userId) {
  const res = await axios.get(`${BACKEND_URL}/api/v1/codeStandards`, {
    userId,
  });
  console.log(res.data);

  return res.data;
}

export async function getReportById(reportId) {
  const res = await axios.get(`${BACKEND_URL}/api/v1/reviews/${reportId}`);

  return res.data;
}
