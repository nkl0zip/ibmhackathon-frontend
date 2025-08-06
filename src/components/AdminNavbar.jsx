import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi"; // For menu icons

const NavbarContainer = styled.nav`
  width: 100%;
  background: #0b3c2f;
  color: #fff;
  box-shadow: 0 2px 12px rgba(11, 60, 47, 0.1);
  padding: 0;
  position: sticky;
  top: 0;
  z-index: 40;
`;

const NavInner = styled.div`
  max-width: 1240px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  height: 64px;
  padding: 0 32px;
  justify-content: space-between;
  @media (max-width: 800px) {
    padding: 0 12px;
  }
`;

const Logo = styled.div`
  font-size: 1.35rem;
  font-weight: 700;
  letter-spacing: 2px;
  color: #12e193;
  cursor: pointer;
`;

const NavLinks = styled.ul`
  display: flex;
  gap: 14px;
  align-items: center;
  margin: 0;
  padding: 0;
  list-style: none;
  @media (max-width: 650px) {
    display: none;
    ${({ open }) =>
      open &&
      `
      display: flex;
      flex-direction: column;
      background: #0b3c2f;
      position: absolute;
      top: 64px;
      left: 0;
      width: 100vw;
      padding: 24px 0;
      box-shadow: 0 10px 28px rgba(0,0,0,0.08);
      z-index: 99;
    `}
  }
`;

const NavItem = styled.li``;

const NavButton = styled.button`
  background: ${({ active }) => (active ? "#12e193" : "transparent")};
  color: ${({ active }) => (active ? "#0b3c2f" : "#fff")};
  border: none;
  font-size: 1rem;
  font-weight: 600;
  padding: 10px 22px;
  border-radius: 7px;
  margin: 0 1px;
  cursor: pointer;
  transition: background 0.17s, color 0.17s;
  &:hover,
  &:focus {
    background: #12e193;
    color: #0b3c2f;
    outline: none;
  }
  @media (max-width: 650px) {
    width: 90vw;
    margin: 7px 0;
    text-align: left;
    font-size: 1.08rem;
  }
`;

const MenuIcon = styled.div`
  display: none;
  font-size: 2.2rem;
  color: #12e193;
  cursor: pointer;
  @media (max-width: 650px) {
    display: block;
  }
`;

export default function AdminNavbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const buttons = [
    { label: "Dashboard", path: "/dashboard" },
    { label: "Users", path: "/dashboard/users" },
    { label: "Logs", path: "/dashboard/logs" },
    { label: "Threats", path: "/dashboard/threats" },
  ];

  function handleNav(path) {
    setMenuOpen(false);
    navigate(path);
  }

  return (
    <NavbarContainer>
      <NavInner>
        <Logo onClick={() => handleNav("/dashboard")}>AdminPanel</Logo>
        <NavLinks open={menuOpen}>
          {buttons.map((btn) => (
            <NavItem key={btn.path}>
              <NavButton
                onClick={() => handleNav(btn.path)}
                $active={location.pathname === btn.path}
              >
                {btn.label}
              </NavButton>
            </NavItem>
          ))}
        </NavLinks>
        <MenuIcon onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <FiX /> : <FiMenu />}
        </MenuIcon>
      </NavInner>
    </NavbarContainer>
  );
}
