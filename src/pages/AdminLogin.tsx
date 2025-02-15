// src/pages/adminlogin.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMsg("");
    try {
      const response = await fetch("https://citytownrp.netlify.app/.netlify/functions/admin-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      if (!response.ok) {
        setErrorMsg(data.error || "Login failed");
        return;
      }
      localStorage.setItem("adminToken", data.token);
      navigate("/admin/dashboard");
    } catch (error) {
      console.error("Admin login error:", error);
      setErrorMsg("An error occurred during login.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0a0a] to-[#1a1a1a] p-10 text-white">
      <h2 className="text-3xl font-bold text-center mb-6">Admin Login</h2>
      {errorMsg && <p className="text-red-400 text-center mb-4">{errorMsg}</p>}
      <form onSubmit={handleLogin} className="max-w-md mx-auto space-y-4">
        <div>
          <label className="block text-gray-300 mb-1">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 bg-gray-800 text-white rounded focus:outline-none"
            required
          />
        </div>
        <div>
          <label className="block text-gray-300 mb-1">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 bg-gray-800 text-white rounded focus:outline-none"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded font-bold"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default AdminLogin;
