import request from "supertest";
import app from "../app.js";
import { describe, it, expect, beforeAll, afterEach, afterAll } from "vitest";
import { setupDB, teardownDB } from "./setup.js";
import User from "../models/User.js"; // make sure this is correct path

beforeAll(async () => {
  await setupDB();
});

afterEach(async () => {
  await User.deleteMany({});
});

afterAll(async () => {
  await teardownDB();
}, 20000);

describe("GET /hello", () => {
  it("should return hello message", async () => {
    const res = await request(app).get("/hello");
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ message: "Hello World" });
  });
});

describe("User Auth Flow", () => {
  const user = {
    name: "Test User",
    email: "testuser@example.com",
    password: "test123",
  };

  it("should register a user", async () => {
    const res = await request(app).post("/api/v1/users/register").send(user);
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("token");
    expect(res.body.user).toMatchObject({
      name: user.name,
      email: user.email,
    });
  });

  it("should login a user", async () => {
    // First register
    await request(app).post("/api/v1/users/register").send(user);

    // Then login
    const res = await request(app).post("/api/v1/users/login").send({
      email: user.email,
      password: user.password,
    });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("token");
    expect(res.body.user.email).toBe(user.email);
  });
});
