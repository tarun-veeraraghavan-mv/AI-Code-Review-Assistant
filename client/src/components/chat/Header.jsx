import React from "react";

export default function Header({ currentUser }) {
  return <h2 style={{ marginBottom: "20px" }}>Welcome, {currentUser.name}</h2>;
}
