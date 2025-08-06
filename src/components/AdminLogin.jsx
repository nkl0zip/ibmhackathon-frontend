import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled, { createGlobalStyle } from "styled-components";
import { loginAdmin } from "../api/auth";
import adminLogo from "../assets/images/ibm_logo.png"; // use IBM logo or another as needed

// ADMIN THEME COLORS
const primary = "#0b3c2f";
const accent = "#12e193";
const background = "#f6fffb";
const panel = "#fff";
const errorColor = "#e74c3c";

// GLOBAL STYLES
const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');
  body { margin: 0; font-family: 'Inter', Arial, sans-serif; background: ${background}; }
`;

// LAYOUT
const Wrapper = styled.div`
  display: flex;
  min-height: 100vh;
  @media (max-width: 900px) {
    flex-direction: column;
  }
`;

const LeftPanel = styled.div`
  background: linear-gradient(135deg, ${primary} 60%, ${accent} 100%);
  color: #fff;
  flex: 1.2;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 48px 32px;
  min-width: 320px;
  @media (max-width: 900px) {
    flex: none;
    width: 100vw;
    min-width: unset;
    padding: 36px 12px 22px 12px;
  }
`;

const Logo = styled.img`
  width: 104px;
  margin-bottom: 32px;
  filter: brightness(1.2) drop-shadow(0 2px 8px #033e32);
  @media (max-width: 900px) {
    width: 68px;
    margin-bottom: 12px;
  }
`;

const Slogan = styled.h1`
  font-size: 2.1rem;
  font-weight: 700;
  line-height: 1.2;
  margin: 0 0 18px 0;
  letter-spacing: 0.5px;
  text-shadow: 0 1px 4px rgba(30, 80, 100, 0.08);
  @media (max-width: 900px) {
    font-size: 1.3rem;
    margin-bottom: 7px;
  }
`;

const Desc = styled.p`
  max-width: 340px;
  font-size: 1.07rem;
  opacity: 0.9;
  line-height: 1.7;
  font-weight: 500;
  @media (max-width: 900px) {
    font-size: 0.99rem;
    max-width: 92vw;
  }
`;

const RightPanel = styled.div`
  background: ${panel};
  flex: 1.8;
  min-width: 360px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
  @media (max-width: 900px) {
    flex: none;
    width: 100vw;
    min-width: unset;
    padding: 32px 0 40px 0;
  }
`;

// LOGIN BOX
const LoginBox = styled.form`
  background: #fff;
  border-radius: 20px;
  box-shadow: 0 6px 32px 0 rgba(0, 38, 255, 0.05), 0 1.5px 3px 0 #cfe2da;
  min-width: 335px;
  width: 100%;
  max-width: 390px;
  padding: 38px 34px 26px 34px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  @media (max-width: 400px) {
    min-width: 95vw;
    padding: 17px 4vw;
  }
`;

const LoginTitle = styled.h2`
  font-size: 1.45rem;
  margin: 0 0 17px 0;
  font-weight: 700;
  color: ${primary};
  letter-spacing: 0.4px;
`;

const Label = styled.label`
  font-size: 1rem;
  color: #0b2720;
  margin-bottom: 4px;
  font-weight: 500;
`;

const Input = styled.input`
  padding: 12px 14px;
  font-size: 1rem;
  border: 1.5px solid #b4e8d6;
  border-radius: 7px;
  margin-bottom: 9px;
  background: #f4fef9;
  &:focus {
    border-color: ${accent};
    background: #eafff5;
    outline: none;
  }
`;

const SubmitBtn = styled.button`
  margin-top: 15px;
  width: 100%;
  padding: 12px 0;
  border-radius: 7px;
  border: none;
  background: ${primary};
  color: #fff;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.19s;
  &:hover {
    background: #0b573f;
  }
`;

const SignupBtn = styled.button`
  width: 100%;
  padding: 10px 0;
  border-radius: 7px;
  border: 1.5px solid ${primary};
  background: #fff;
  color: ${primary};
  font-size: 1rem;
  font-weight: 600;
  margin-top: 8px;
  cursor: pointer;
  transition: background 0.16s, color 0.16s;
  &:hover {
    background: #e3fcf2;
    color: #046148;
  }
`;

const ErrorMsg = styled.div`
  color: ${errorColor};
  background: #fff5f3;
  border-radius: 6px;
  padding: 8px 12px;
  margin: 5px 0 0 0;
  font-size: 0.98rem;
  text-align: center;
`;

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await loginAdmin({ email, password });
      navigate("/dashboard");
    } catch (err) {
      setError(err.message || "Invalid credentials");
      setLoading(false);
    }
  };

  return (
    <Wrapper>
      <GlobalStyle />
      <LeftPanel>
        <Logo src={adminLogo} alt="Admin Logo" />
        <Slogan>Admin Secure Panel</Slogan>
        <Desc>
          Welcome to the Admin Console for Risk Assessment.
          <br />
          Monitor, manage, and configure security risk scoring across your
          organization.
          <br />
          <br />
          Only authorized personnel may access this portal.
        </Desc>
      </LeftPanel>

      <RightPanel>
        <LoginBox onSubmit={handleLogin} autoComplete="off">
          <LoginTitle>Admin Login</LoginTitle>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="admin@example.com"
            required
          />
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
          {error && <ErrorMsg>{error}</ErrorMsg>}
          <SubmitBtn type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </SubmitBtn>
          <SignupBtn type="button" onClick={() => navigate("/admin-signup")}>
            Signup
          </SignupBtn>
        </LoginBox>
      </RightPanel>
    </Wrapper>
  );
}
