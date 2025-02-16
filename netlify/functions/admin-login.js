// admin-login.js
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const handler = async (event) => {
  // Allow only POST requests
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
      },
      body: JSON.stringify({ error: "Method Not Allowed" }),
    };
  }

  let body;
  try {
    body = JSON.parse(event.body);
  } catch (err) {
    return {
      statusCode: 400,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
      },
      body: JSON.stringify({ error: "Invalid request body" }),
    };
  }

  const { username, password } = body;
  if (!username || !password) {
    return {
      statusCode: 400,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
      },
      body: JSON.stringify({ error: "Username and password required." }),
    };
  }

  const adminUsername = process.env.ADMIN_USERNAME || "";
  const adminPasswordHash = process.env.ADMIN_PASSWORD_HASH || "";
  const jwtSecret = process.env.JWT_SECRET || "fallback_jwt_secret";

  // Log the environment variables for debugging (remove in production)
  console.log("Admin Username:", adminUsername);
  console.log("Admin Password Hash:", adminPasswordHash);
  console.log("Attempting login for username:", username);

  if (username !== adminUsername) {
    return {
      statusCode: 401,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
      },
      body: JSON.stringify({ error: "Invalid credentials." }),
    };
  }

  const isPasswordValid = await bcrypt.compare(password, adminPasswordHash);
  console.log("Is password valid:", isPasswordValid);

  if (!isPasswordValid) {
    return {
      statusCode: 401,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
      },
      body: JSON.stringify({ error: "Invalid credentials." }),
    };
  }

  const token = jwt.sign({ username }, jwtSecret, { expiresIn: "1h" });

  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type",
    },
    body: JSON.stringify({ message: "Logged in successfully.", token }),
  };
};