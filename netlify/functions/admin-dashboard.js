// netlify/functions/admin-dashboard.js
const jwt = require("jsonwebtoken");

exports.handler = async (event, context) => {
  // Expect token in the Authorization header in the format "Bearer <token>"
  const authHeader = event.headers.authorization || event.headers.Authorization;
  if (!authHeader) {
    return {
      statusCode: 401,
      body: JSON.stringify({ error: "Unauthorized" }),
    };
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // If token is valid, return protected data.
    return {
      statusCode: 200,
      body: JSON.stringify({ data: "Secret admin dashboard data." }),
    };
  } catch (error) {
    return {
      statusCode: 401,
      body: JSON.stringify({ error: "Unauthorized" }),
    };
  }
};
