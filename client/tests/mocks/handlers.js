import { http, HttpResponse } from "msw";

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
    if (params.id === "1234567") {
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
          suggestions: [
            "Use functional components than class-based components",
          ],
        },
      });
    }
  }),
];
