import React, { useEffect, useState } from "react";

const AdminDashboard: React.FC = () => {
  const [data, setData] = useState<string>("");
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("adminToken");
      if (!token) {
        setError("No token found, please log in.");
        return;
      }

      try {
        const response = await fetch("/.netlify/functions/admin-dashboard", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(await response.text());
        }

        const result = await response.json();
        setData(result.data);
      } catch (err: any) {
        setError(err.message || "Failed to fetch data.");
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="p-6 bg-gray-800 rounded shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>
        {error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <p>{data}</p>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
