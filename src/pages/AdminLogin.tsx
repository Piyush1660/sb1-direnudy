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
      const response = await fetch("https://citytownrp.netlify.app/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // important to include cookies
        body: JSON.stringify({ username, password }),
      });
      if (!response.ok) {
        const data = await response.json();
        setErrorMsg(data.error || "Login failed");
        return;
      }
      // On success, navigate to admin dashboard
      navigate("/admin/dashboard");
    } catch (error) {
      console.error("Admin login error:", error);
      setErrorMsg("An error occurred during login.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0a0a] to-[#1a1a1a] p-10 text-white">
      <button onClick={() => navigate("/")} className="text-pink-400 mb-4">
        Back to Home
      </button>
      <div className="max-w-md mx-auto bg-black/50 p-8 rounded-lg">
        <h2 className="text-3xl font-bold mb-6 text-center">Admin Login</h2>
        {errorMsg && <p className="text-red-400 mb-4">{errorMsg}</p>}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-gray-300 mb-1">Username</label>
            <input
              className="w-full p-2 bg-gray-800 text-white rounded"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-gray-300 mb-1">Password</label>
            <input
              className="w-full p-2 bg-gray-800 text-white rounded"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 mt-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded font-bold"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;
