import React, { useState } from "react";
import Navbar from "./Navbar";
import AppButton from "./AppButton";
import { login as loginApi } from "../utils/api";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    const x = await loginApi(email, password);
    console.log(x);
    login(x.user);

    setEmail("");
    setPassword("");

    alert("User logged in successfully");

    navigate("/");
  }

  return (
    <div style={{ padding: "10px" }}>
      <Navbar />
      <div
        style={{
          position: "absolute",
          top: "40%",
          left: "50%",
          transform: "translate(-50%, -30%)",
          width: "500px",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          backgroundColor: "#fff",
        }}
      >
        <form
          style={{ display: "flex", flexDirection: "column", gap: "15px" }}
          onSubmit={handleSubmit}
        >
          <div>
            <label
              htmlFor="email"
              style={{
                display: "block",
                marginBottom: "5px",
                fontSize: "20px",
                color: "#333",
              }}
            >
              Email
            </label>
            <input
              type="text"
              id="email"
              name="email"
              placeholder="johndoe@gmail.com"
              style={{
                width: "100%",
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "5px",
                fontSize: "18px",
              }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label
              htmlFor="password"
              style={{
                display: "block",
                marginBottom: "5px",
                fontSize: "20px",
                color: "#333",
              }}
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="test123"
              style={{
                width: "100%",
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "5px",
                fontSize: "18px",
              }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <AppButton backgroundColor="#007bff">Log In</AppButton>
        </form>
      </div>
    </div>
  );
}
