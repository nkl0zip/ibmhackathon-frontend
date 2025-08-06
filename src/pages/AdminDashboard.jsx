import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import AdminNavbar from "../components/AdminNavbar";

// Admin Theme
const DashboardContainer = styled.div`
  min-height: 100vh;
  background: #f6fffb;
  font-family: "Inter", Arial, sans-serif;
`;

const Content = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  padding: 44px 24px 0 24px;
  color: #0b3c2f;
`;

const LogoutButton = styled.button`
  margin-top: 2rem;
  padding: 12px 32px;
  font-size: 1.1rem;
  border-radius: 8px;
  background: #e74c3c;
  color: #fff;
  border: none;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 3px 10px 0 rgba(30, 40, 90, 0.08);
  transition: background 0.18s;
  &:hover {
    background: #ad2a18;
  }
`;

export default function AdminDashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("admin_token")) {
      navigate("/admin-login");
    }
  }, [navigate]);

  function handleLogout() {
    localStorage.removeItem("admin_token");
    navigate("/admin-login");
  }

  return (
    <DashboardContainer>
      <AdminNavbar />
      <Content>
        <h1>Admin Dashboard</h1>
        <p>Welcome to the admin dashboard. Select an option from the navbar.</p>
        {/* Render page content here based on route (dashboard, users, logs, threats) */}
      </Content>
    </DashboardContainer>
  );
}
