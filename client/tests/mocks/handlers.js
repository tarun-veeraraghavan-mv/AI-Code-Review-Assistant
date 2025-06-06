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
];
