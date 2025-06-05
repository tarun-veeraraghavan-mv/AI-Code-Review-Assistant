import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function Navbar() {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px 20px",
        backgroundColor: "#212529",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        borderRadius: "5px",
        marginBottom: "20px",
      }}
    >
      <h1
        style={{
          color: "#fff",
          fontSize: "20px",
          margin: 0,
          cursor: "pointer",
        }}
        onClick={() => {
          navigate("/");
        }}
      >
        AI Code Review
      </h1>
      <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
        <button
          style={{
            backgroundColor: "#E9ECEF",
            color: "#333",
            border: "none",
            borderRadius: "5px",
            padding: "10px 20px",
            fontSize: "16px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            transition: "background-color 0.3s ease",
            cursor: "pointer",
          }}
          onClick={() => {
            navigate("/docs");
          }}
        >
          Docs
        </button>
        <button
          style={{
            backgroundColor: "#E9ECEF",
            color: "#333",
            border: "none",
            borderRadius: "5px",
            padding: "10px 20px",
            fontSize: "16px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            transition: "background-color 0.3s ease",
            cursor: "pointer",
          }}
          onClick={() => {
            if (user?._id) {
              navigate("/report");
            } else {
              alert("Signin to access this feature");
            }
          }}
        >
          Reports
        </button>
        {user ? (
          <p
            style={{
              color: "#fff",
              fontWeight: "bold",
              padding: "10px 20px",
              fontSize: "16px",
              textTransform: "uppercase",
              backgroundColor: "#007BFF",
              borderRadius: "5px",
            }}
          >
            {user.name}
          </p>
        ) : (
          <button
            onClick={() => {
              navigate("/signin");
            }}
            style={{
              backgroundColor: "#007BFF",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              padding: "10px 20px",
              fontSize: "16px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              transition: "background-color 0.3s ease",
              cursor: "pointer",
            }}
          >
            Sign In
          </button>
        )}
      </div>
    </nav>
  );
}
