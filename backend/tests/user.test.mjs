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
}, 25000);

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

  it("should reject login with wrong password", async () => {
    await request(app).post("/api/v1/users/register").send(user);

    const res = await request(app).post("/api/v1/users/login").send({
      email: user.email,
      password: "wrongpassword",
    });

    expect(res.statusCode).toBe(401);
    expect(res.body.error).toBe("Passwords do not match");
  });

  it("should reject login with non-existing email", async () => {
    const res = await request(app).post("/api/v1/users/login").send({
      email: "nonexisting@example.com",
      password: "anything",
    });

    expect(res.statusCode).toBe(404);
    expect(res.body.error).toBe("No user exists with this email!");
  });

  it("should return user data for valid token in /me", async () => {
    const reg = await request(app).post("/api/v1/users/register").send(user);
    const token = reg.body.token;

    const res = await request(app).post("/api/v1/users/me").send({ token });

    expect(res.statusCode).toBe(200);
    expect(res.body.email).toBe(user.email);
  });

  it("should reject endpoint if no token was provided", async () => {
    const res = await request(app).post("/api/v1/users/me").send(); // no token

    expect(res.statusCode).toBe(401);
    expect(res.body.error).toBe("User is not authorized");
  });

  it("should reject /me endpoint with invalid token", async () => {
    const res = await request(app)
      .post("/api/v1/users/me")
      .send({ token: "this.is.invalid.token" });

    expect(res.statusCode).toBe(401); // jwt.verify throws
  });

  it("should always be true", () => {
    expect(1).toBeTruthy();
  });
});
