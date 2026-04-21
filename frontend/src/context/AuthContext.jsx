import { createContext, useContext, useMemo, useState } from "react";

const AuthContext = createContext(null);

const getStoredUser = () => {
  try {
    const raw = localStorage.getItem("user");
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [currentUser, setCurrentUser] = useState(getStoredUser());

  const login = (nextToken, user) => {
    setToken(nextToken);
    setCurrentUser(user || null);
    localStorage.setItem("token", nextToken);
    localStorage.setItem("user", JSON.stringify(user || null));
  };

  const logout = () => {
    setToken("");
    setCurrentUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  const isLoggedIn = Boolean(token);

  const value = useMemo(
    () => ({ currentUser, token, isLoggedIn, login, logout }),
    [currentUser, token, isLoggedIn]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
