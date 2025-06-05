import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [_, setToken] = useState("");

  function signin(user) {
    setUser(user);
  }

  function login(user) {
    setUser(user);
  }

  function logout() {
    setUser(null);
  }

  function handleToken(token) {
    setToken(token);
  }

  return (
    <AuthContext.Provider value={{ user, signin, login, logout, handleToken }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  return context;
}
