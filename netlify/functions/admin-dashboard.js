// netlify/functions/admin-dashboard.js
const jwt = require("jsonwebtoken");

exports.handler = async (event, context) => {
  // Retrieve the Authorization header (it might be lowercase or uppercase)
  const authHeader = event.headers.authorization || event.headers.Authorization;
  
  if (!authHeader) {
    return {
      statusCode: 401,
      body: JSON.stringify({ error: "Unauthorized: No token provided" }),
    };
  }

  // Expect the header format to be "Bearer <token>"
  const token = authHeader.split(" ")[1];

  try {
    // Verify the token using your secret
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // If verification is successful, return your protected data.
    return {
      statusCode: 200,
      body: JSON.stringify({ data: "Secret admin dashboard data." }),
    };
  } catch (error) {
    // If token verification fails, return unauthorized.
    return {
      statusCode: 401,
      body: JSON.stringify({ error: "Unauthorized: Invalid or expired token" }),
    };
  }
};
