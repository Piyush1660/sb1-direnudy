// netlify/functions/admin-login.js
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.handler = async (event, context) => {
  // Only allow POST requests
  if (event.httpMethod !== "POST") {
    console.error("Method Not Allowed: Received", event.httpMethod);
    return {
      statusCode: 405,
      body: "Method Not Allowed",
    };
  }

  // Parse the request body
  let body;
  try {
    body = JSON.parse(event.body);
  } catch (err) {
    console.error("Error parsing request body:", err);
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Invalid request body" }),
    };
  }

  const { username, password } = body;
  if (!username || !password) {
    console.error("Missing credentials:", { username, password: password ? "provided" : "not provided" });
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Username and password required." }),
    };
  }

  // Load admin credentials from environment variables
  const adminUsername = process.env.ADMIN_USERNAME;
  const adminPasswordHash = process.env.ADMIN_PASSWORD_HASH;
  const jwtSecret = process.env.JWT_SECRET || "fallback_jwt_secret";

  // Debug logging (only log non-sensitive info)
  if (process.env.NODE_ENV !== "production") {
    console.log("Received username:", username);
    console.log("Expected username:", adminUsername);
  }

  // Check if the username matches (case-sensitive)
  if (username !== adminUsername) {
    console.error("Username mismatch:", username, "!=", adminUsername);
    return {
      statusCode: 401,
      body: JSON.stringify({ error: "Invalid credentials." }),
    };
  }

  // Validate the password using bcrypt
  let passwordValid;
  try {
    passwordValid = await bcrypt.compare(password, adminPasswordHash);
  } catch (error) {
    console.error("Error comparing passwords:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Server error during password validation." }),
    };
  }
  if (!passwordValid) {
    console.error("Password invalid for user:", username);
    return {
      statusCode: 401,
      body: JSON.stringify({ error: "Invalid credentials." }),
    };
  }

  // Credentials are valid – create a JWT token (expires in 1 hour)
  let token;
  try {
    token = jwt.sign({ username }, jwtSecret, { expiresIn: "1h" });
  } catch (error) {
    console.error("Error creating JWT token:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Error generating token." }),
    };
  }

  console.log("Admin login successful for user:", username);

  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Logged in successfully.", token }),
  };
};
