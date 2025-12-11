import React, { createContext, useContext, useMemo, useState } from "react";
import api from "../api/axios";
import { endpoints } from "../api/endpoints";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem("user");
    return raw ? JSON.parse(raw) : null;
  });

  const isAuthenticated = !!token;

  async function login(email, password) {
    const res = await api.post(endpoints.auth.login, { email, password });
    const { token: t, user: u } = res.data;

    localStorage.setItem("token", t);
    localStorage.setItem("user", JSON.stringify(u));
    setToken(t);
    setUser(u);
  }

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken("");
    setUser(null);
  }

  const value = useMemo(() => ({ token, user, isAuthenticated, login, logout }), [token, user, isAuthenticated]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}
