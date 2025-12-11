import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { AuthProvider } from "./auth/AuthContext";
import ProtectedRoute from "./auth/ProtectedRoutes";
import AppShell from "./components/Layout/AppShell";

import Login from "./page/Login";
import Dashboard from "./page/Dashboard";
import UsersPage from "./page/UserPage";
import EmployeesPage from "./page/EmployeePage";

function ProtectedShell({ children }) {
  return (
    <ProtectedRoute>
      <AppShell>{children}</AppShell>
    </ProtectedRoute>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route path="/" element={<ProtectedShell><Dashboard /></ProtectedShell>} />
          <Route path="/users" element={<ProtectedShell><UsersPage /></ProtectedShell>} />
          <Route path="/employees" element={<ProtectedShell><EmployeesPage /></ProtectedShell>} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
