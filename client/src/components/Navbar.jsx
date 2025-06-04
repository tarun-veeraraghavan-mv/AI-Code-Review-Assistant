import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px 20px",
        backgroundColor: "#007bff",
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
      <div style={{ display: "flex", gap: "10px" }}>
        <button
          style={{
            backgroundColor: "#28a745",
            color: "#fff",
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
          onClick={() => (window.location.href = "/signin")}
          style={{
            backgroundColor: "#ffc107",
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
      </div>
    </nav>
  );
}
