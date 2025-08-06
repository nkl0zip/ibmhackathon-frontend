import { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import AdminDashboard from "./pages/AdminDashboard";
import AdminLogin from "./components/AdminLogin";
import Login from "./components/Login";
import "./App.css";

export default function App() {
  const navigate = useNavigate();

  useEffect(() => {
    function handleKeyDown(e) {
      // Shift + Alt (order doesn’t matter, both must be pressed)
      if (e.shiftKey && e.altKey) {
        navigate("/admin-login");
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [navigate]);
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Home />} />
      <Route path="/admin-login" element={<AdminLogin />} />
      <Route path="/dashboard" element={<AdminDashboard />} />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}
