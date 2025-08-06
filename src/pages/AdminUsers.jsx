import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import AdminNavbar from "../components/AdminNavbar";

// IBM-inspired colors
const PageContainer = styled.div`
  background: #f6fffb;
  min-height: 100vh;
  font-family: "Inter", Arial, sans-serif;
`;

const Content = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  padding: 44px 24px 0 24px;
`;

const Heading = styled.h2`
  color: #0b3c2f;
  margin-bottom: 24px;
  font-size: 2.2rem;
  font-weight: 700;
  letter-spacing: 0.5px;
`;

const TableContainer = styled.div`
  background: #fff;
  border-radius: 14px;
  box-shadow: 0 2px 14px 0 rgba(11, 60, 47, 0.09);
  overflow-x: auto;
  padding: 24px 18px;
  margin-top: 14px;
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  min-width: 460px;
`;

const TableHead = styled.thead`
  background: #0b3c2f;
  color: #fff;
`;

const TableRow = styled.tr``;

const TableHeader = styled.th`
  font-weight: 700;
  font-size: 1rem;
  padding: 16px 12px;
  text-align: left;
  border-bottom: 2px solid #12e193;
  letter-spacing: 0.06em;
`;

const TableBody = styled.tbody`
  background: #fff;
  color: #1b3c2f;
`;

const TableCell = styled.td`
  font-size: 1rem;
  padding: 13px 12px;
  border-bottom: 1px solid #e7efe6;
  vertical-align: middle;
`;

const Loader = styled.div`
  padding: 40px 0;
  text-align: center;
  color: #0b3c2f;
  font-size: 1.15rem;
  font-weight: 600;
`;

const ErrorMsg = styled.div`
  margin: 22px 0;
  color: #e74c3c;
  background: #fff5f3;
  padding: 15px 19px;
  border-radius: 8px;
  font-weight: 600;
  text-align: center;
`;

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // You can also fetch the token from localStorage if you save it there after login:
  // const token = localStorage.getItem("admin_token");
  // For demo, using the hardcoded token provided:
  const token = localStorage.getItem("admin_token");

  useEffect(() => {
    if (!token) {
      navigate("/admin-login");
      return;
    }
    async function fetchUsers() {
      setLoading(true);
      setError("");
      try {
        const res = await fetch("http://localhost:8080/api/users", {
          credentials: "include",
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        if (!res.ok) {
          throw new Error("Failed to fetch users (" + res.status + ")");
        }
        const data = await res.json();
        setUsers(data);
      } catch (err) {
        setError(err.message || "Failed to fetch users");
      } finally {
        setLoading(false);
      }
    }
    fetchUsers();
  }, [token, navigate]);

  return (
    <PageContainer>
      <AdminNavbar />
      <Content>
        <Heading>All Users</Heading>
        <TableContainer>
          {loading ? (
            <Loader>Loading users...</Loader>
          ) : error ? (
            <ErrorMsg>{error}</ErrorMsg>
          ) : (
            <StyledTable>
              <TableHead>
                <TableRow>
                  <TableHeader>ID</TableHeader>
                  <TableHeader>Name</TableHeader>
                  <TableHeader>Email</TableHeader>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={3} style={{ textAlign: "center" }}>
                      No users found.
                    </TableCell>
                  </TableRow>
                ) : (
                  users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>{user.id}</TableCell>
                      <TableCell>{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </StyledTable>
          )}
        </TableContainer>
      </Content>
    </PageContainer>
  );
}
