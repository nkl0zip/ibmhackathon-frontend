import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

// Admin Theme
const Container = styled.div`
  min-height: 100vh;
  font-family: "Inter", Arial, sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #f6fffb;
  font-size: 2rem;
  color: #0b3c2f;
  font-weight: 700;
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
    <Container>
      Welcome to the Admin Dashboard
      <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
    </Container>
  );
}
