export async function loginEmployee({ email, password }) {
  const res = await fetch("http://localhost:8080/api/auth/login/employee", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.message || "Login failed");
  }
  const data = await res.json();
  // Store token
  if (data.token) {
    localStorage.setItem("employee_token", data.token);
  }
  return data;
}

export async function loginAdmin({ email, password }) {
  const res = await fetch("http://localhost:8080/api/auth/login/admin", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.message || "Login failed");
  }
  const data = await res.json();
  if (data.token) {
    localStorage.setItem("admin_token", data.token);
  }
  return data;
}
