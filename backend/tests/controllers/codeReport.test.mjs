import request from "supertest";
import app from "../../app.js";
import {
  describe,
  it,
  expect,
  beforeAll,
  afterEach,
  afterAll,
  vi,
} from "vitest";
import { setupDB, teardownDB } from "../setup.js";
import CodeReview from "../../models/CodeReview.js";

beforeAll(async () => {
  await setupDB();
});

beforeEach(() => {
  vi.spyOn(global, "fetch").mockResolvedValue({
    json: async () => ({
      choices: [
        {
          message: {
            content: `
              {
                "codeReview": {
                  "overallScore": 85,
                  "criticalIssues": 0,
                  "warnings": 2,
                  "suggestions": 3
                },
                "codeSummary": [
                  "This is a code block that tests the App.jsx React Component"
                ],
                "criticalIssues": [".env variable not secured"],
                "warnings": [],
                "suggestions": ["Use functional components than class-based components"]
              }
            `,
          },
        },
      ],
    }),
  });
});

afterEach(async () => {
  await CodeReview.deleteMany({});
  vi.restoreAllMocks();
});

afterAll(async () => {
  await teardownDB();
}, 25000);

describe("Code Review Flow", () => {
  const userId = "user123";
  const code = `function test() { console.log("Hello World"); }`;
  const codeStandards = "Use functional components and avoid console logs.";

  it("should create a code review report", async () => {
    const res = await request(app).post("/api/v1/llm/completion").send({
      code,
      codeStandards,
      userId,
    });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("_id");
    expect(res.body.codeReview).toMatchObject({
      overallScore: expect.any(Number),
      criticalIssues: expect.any(Number),
      warnings: expect.any(Number),
      suggestions: exp.any(Numbeectr),
    });
    expect(res.body.userId).toBe(userId);
  });

  it("should fetch all reports for a user", async () => {
    // Create a report first
    await request(app).post("/api/v1/llm/completion").send({
      code,
      codeStandards,
      userId,
    });

    // Fetch all reports for the user
    const res = await request(app).get("/api/v1/reviews").query({ userId });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveLength(1);
    expect(res.body[0]).toHaveProperty("_id");
    expect(res.body[0].userId).toBe(userId);
  });

  it("should fetch a report by ID", async () => {
    // Create a report first
    const report = await request(app).post("/api/v1/llm/completion").send({
      code,
      codeStandards,
      userId,
    });

    const reportId = report.body._id;

    // Fetch the report by ID
    const res = await request(app).get(`/api/v1/reviews/${reportId}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("_id", reportId);
    expect(res.body.userId).toBe(userId);
  });
});
