import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  min-height: 100vh;
  font-family: "Inter", Arial, sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #f4f8fb;
  font-size: 2rem;
  color: #0f62fe;
  font-weight: 700;
`;

const LogoutButton = styled.button`
  margin-top: 2rem;
  padding: 12px 32px;
  font-size: 1.1rem;
  border-radius: 8px;
  background: #da1e28;
  color: #fff;
  border: none;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 3px 10px 0 rgba(30, 40, 90, 0.1);
  transition: background 0.2s;
  &:hover {
    background: #9f101b;
  }
`;

export default function Home() {
  const navigate = useNavigate();

  function handleLogout() {
    // Remove token (or any user data you saved)
    localStorage.removeItem("employee_token");
    // Optionally: also clear all localStorage/sessionStorage if needed
    // localStorage.clear();
    // sessionStorage.clear();
    navigate("/login");
  }

  return (
    <Container>
      Welcome to the IBM Employee Dashboard
      <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
    </Container>
  );
}
