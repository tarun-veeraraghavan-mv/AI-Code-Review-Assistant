import { delay, http, HttpResponse } from "msw";

export const handlers = [
  http.post("http://localhost:3000/api/v1/users/register", () => {
    return HttpResponse.json({
      message: "User registered successfully",
      user: { name: "John Doe", email: "john@gmail.com" },
    });
  }),

  http.post("http://localhost:3000/api/v1/users/login", () => {
    return HttpResponse.json({
      message: "User registered successfully",
      user: { name: "John Doe", email: "john@gmail.com" },
    });
  }),

  http.get("http://localhost:3000/api/v1/reviews/:reportId", ({ params }) => {
    if (params.reportId === "1234567") {
      return HttpResponse.json({
        _id: "1234567",
        codeReview: {
          overallScore: 85,
          criticalIssues: 0,
          warnings: 2,
          suggestions: 3,
        },
        codeSummary: [
          "This is a code block that tests the App.jsx React Component",
        ],
        criticalIssues: [".env variable not secured"],
        warnings: [],
        suggestions: ["Use functional components than class-based components"],
      });
    }
    return new HttpResponse(null, { status: 404 });
  }),

  http.post("http://localhost:3000/api/v1/llm/completion", async () => {
    await delay(1000);

    return HttpResponse.json({
      review: {
        _id: "1234567",
        codeReview: {
          overallScore: 85,
          criticalIssues: 0,
          warnings: 2,
          suggestions: 3,
        },
        codeSummary: [
          "This is a code block that tests the App.jsx React Component",
        ],
        criticalIssues: [".env variable not secured"],
        warnings: [],
        suggestions: ["Use functional components than class-based components"],
      },
    });
  }),
  http.get("http://localhost:3000/api/v1/reviews", async ({ request }) => {
    await delay(500);

    const url = new URL(request.url);
    const userId = url.searchParams.get("userId");

    if (userId === "mock-user-id") {
      return HttpResponse.json([
        {
          _id: "123456789",
          codeReview: {
            overallScore: 85,
            criticalIssues: 0,
            warnings: 2,
            suggestions: 3,
          },
          codeSummary: [
            "This is a code block that tests the App.jsx React Component",
          ],
          criticalIssues: [".env variable not secured"],
          warnings: [],
          suggestions: [
            "Use functional components than class-based components",
          ],
        },
        {
          _id: "123456798",
          codeReview: {
            overallScore: 98,
            criticalIssues: 2,
            warnings: 2,
            suggestions: 3,
          },
          codeSummary: [
            "This is a code block that tests the App.jsx React Component",
          ],
          criticalIssues: [".env variable not secured"],
          warnings: [],
          suggestions: [
            "Use functional components than class-based components",
          ],
        },
      ]);
    }

    return HttpResponse.json([]);
  }),
];
