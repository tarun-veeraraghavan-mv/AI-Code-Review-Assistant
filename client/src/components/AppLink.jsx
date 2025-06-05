import { Link } from "react-router-dom";

export default function AppLink({ children, path, backgroundColor }) {
  return (
    <Link
      style={{
        backgroundColor,
        color: "#fff",
        border: "none",
        borderRadius: "5px",
        padding: "10px 20px",
        fontSize: "16px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        transition: "background-color 0.3s ease",
        cursor: "pointer",
        textAlign: "center",
        textDecoration: "none",
      }}
      to={path}
    >
      {children}
    </Link>
  );
}
