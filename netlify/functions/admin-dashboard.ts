// netlify/functions/admin-dashboard.ts
import jwt from "jsonwebtoken";

export const handler = async (event: any, context: any) => {
  // Retrieve the Authorization header (case-insensitive)
  const authHeader = event.headers.authorization || event.headers.Authorization;
  if (!authHeader) {
    return {
      statusCode: 401,
      body: JSON.stringify({ error: "Unauthorized: No token provided" }),
    };
  }

  // Expect the header format "Bearer <token>"
  const token = authHeader.split(" ")[1];
  try {
    // Verify the token using JWT_SECRET from your environment variables
    jwt.verify(token, process.env.JWT_SECRET!);
    // If verification is successful, return protected data.
    return {
      statusCode: 200,
      body: JSON.stringify({ data: "Secret admin dashboard data." }),
    };
  } catch (error) {
    return {
      statusCode: 401,
      body: JSON.stringify({ error: "Unauthorized: Invalid or expired token" }),
    };
  }
};
