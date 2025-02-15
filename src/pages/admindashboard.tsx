// src/pages/admindashboard.tsx
import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function AdminDashboard() {
  const [data, setData] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("adminToken");

  useEffect(() => {
    // If no token exists, redirect to login
    if (!token) {
      navigate("/admin");
      return;
    }
    // Fetch protected data from your backend (using the token)
    // For example, you can send the token in the Authorization header:
    fetch("https://citytownrp.netlify.app/.netlify/functions/admin-dashboard", {
      headers: { Authorization: `Bearer ${token}` },
      credentials: "include",
    })
      .then((res) => {
        if (res.status === 401) {
          navigate("/admin");
        }
        return res.json();
      })
      .then((data) => setData(data.data))
      .catch((err) => console.error("Error fetching admin data:", err));
  }, [navigate, token]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0a0a] to-[#1a1a1a] p-10 text-white">
      <h1 className="text-4xl font-bold mb-8">Admin Dashboard</h1>
      {data ? <p>{data}</p> : <p>Loading...</p>}
      <Link to="/admin" className="text-pink-500 hover:text-pink-400 mt-8 inline-block">
        Back to Admin Login
      </Link>
    </div>
  );
}

export default AdminDashboard;
