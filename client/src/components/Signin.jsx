import { useState } from "react";
import AppButton from "./AppButton";
import Navbar from "./Navbar";
import { register } from "../utils/api";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Signin() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState("");
  const { signin, handleToken } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setLoading(true);
      const user = await register(name, email, password);
      console.log(user);
      signin(user.user);
      handleToken(user.token);

      setName("");
      setEmail("");
      setPassword("");

      alert("User created successfully");

      navigate("/");
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
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
              htmlFor="name"
              style={{
                display: "block",
                marginBottom: "5px",
                fontSize: "20px",
                color: "#333",
              }}
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="John Doe"
              style={{
                width: "100%",
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "5px",
                fontSize: "18px",
              }}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
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
          <AppButton disabled={loading} backgroundColor="#007bff">
            Sign In
          </AppButton>
        </form>
      </div>
    </div>
  );
}
