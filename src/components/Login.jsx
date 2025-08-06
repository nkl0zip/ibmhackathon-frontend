import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled, { createGlobalStyle } from "styled-components";
import { loginEmployee } from "../api/auth";
import ibmLogo from "../assets/images/ibm_logo.png";

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');
  body {
    margin: 0;
    font-family: 'Inter', Arial, sans-serif;
    background: #f4f8fb;
  }
`;

const Wrapper = styled.div`
  display: flex;
  min-height: 100vh;
  @media (max-width: 900px) {
    flex-direction: column;
  }
`;

const LeftPanel = styled.div`
  background: #0f62fe;
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
    padding: 40px 12px 28px 12px;
  }
`;

const Logo = styled.img`
  width: 112px;
  margin-bottom: 32px;
  @media (max-width: 900px) {
    width: 72px;
    margin-bottom: 16px;
  }
`;

const Slogan = styled.h1`
  font-size: 2.1rem;
  font-weight: 600;
  line-height: 1.3;
  margin: 0 0 18px 0;
  letter-spacing: 0.5px;
  @media (max-width: 900px) {
    font-size: 1.3rem;
    margin-bottom: 8px;
  }
`;

const Desc = styled.p`
  max-width: 360px;
  font-size: 1rem;
  opacity: 0.86;
  line-height: 1.7;
  @media (max-width: 900px) {
    font-size: 0.98rem;
    max-width: 90vw;
  }
`;

const RightPanel = styled.div`
  background: #fff;
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
    padding: 36px 0 48px 0;
  }
`;

const LoginBox = styled.form`
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 6px 32px 0 rgba(0, 38, 255, 0.06), 0 1.5px 3px 0 #cfd7e6;
  min-width: 340px;
  width: 100%;
  max-width: 400px;
  padding: 38px 36px 28px 36px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  @media (max-width: 400px) {
    min-width: 95vw;
    padding: 18px 7vw;
  }
`;

const LoginTitle = styled.h2`
  font-size: 1.5rem;
  margin: 0 0 18px 0;
  font-weight: 700;
  color: #0f62fe;
  letter-spacing: 0.5px;
  text-align: left;
`;

const Label = styled.label`
  font-size: 1rem;
  color: #2e3d56;
  margin-bottom: 5px;
  font-weight: 500;
`;

const Input = styled.input`
  padding: 12px 14px;
  font-size: 1rem;
  border: 1.5px solid #cfd7e6;
  border-radius: 8px;
  margin-bottom: 10px;
  background: #f6faff;
  &:focus {
    border-color: #0f62fe;
    background: #e9f1ff;
    outline: none;
  }
`;

const SubmitBtn = styled.button`
  margin-top: 16px;
  width: 100%;
  padding: 12px 0;
  border-radius: 8px;
  border: none;
  background: #0f62fe;
  color: #fff;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.18s;
  &:hover {
    background: #0353e9;
  }
`;

const SignupBtn = styled.button`
  width: 100%;
  padding: 10px 0;
  border-radius: 8px;
  border: 1.5px solid #0f62fe;
  background: #fff;
  color: #0f62fe;
  font-size: 1rem;
  font-weight: 600;
  margin-top: 8px;
  cursor: pointer;
  transition: background 0.18s, color 0.18s;
  &:hover {
    background: #e5edfb;
    color: #0353e9;
  }
`;

const ErrorMsg = styled.div`
  color: #da1e28;
  background: #fff0f1;
  border-radius: 6px;
  padding: 9px 14px;
  margin: 6px 0 0 0;
  font-size: 0.98rem;
  text-align: center;
`;

export default function Login() {
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
      await loginEmployee({ email, password });
      navigate("/");
    } catch (err) {
      setError(err.message || "Invalid credentials");
      setLoading(false);
    }
  };

  return (
    <Wrapper>
      <GlobalStyle />
      <LeftPanel>
        <Logo src={ibmLogo} alt="IBM Logo" />
        <Slogan>IBM Secure Portal</Slogan>
        <Desc>
          Welcome to the IBM Employee Risk Assessment Platform. <br />
          Access predictive insights, manage your security, and help safeguard
          our organization.
          <br />
          <br />
          Need help? Contact your IBM IT administrator.
        </Desc>
      </LeftPanel>

      <RightPanel>
        <LoginBox onSubmit={handleLogin} autoComplete="off">
          <LoginTitle>Employee Login</LoginTitle>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="employee@ibm.com"
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
          <SignupBtn type="button" onClick={() => navigate("/signup")}>
            Signup
          </SignupBtn>
        </LoginBox>
      </RightPanel>
    </Wrapper>
  );
}
