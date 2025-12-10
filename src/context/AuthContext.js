import React, { createContext, useContext, useEffect, useState } from "react";

const KEY = "electromart_user_v1";
const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const s = localStorage.getItem(KEY);
      return s ? JSON.parse(s) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(user));
  }, [user]);

  function login(username, password) {
    const u = { username, isAdmin: username === "admin" };
    setUser(u);
    return true;
  }

  function logout() {
    setUser(null);
  }

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
