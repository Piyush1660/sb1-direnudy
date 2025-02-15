// netlify/functions/admin-login.js
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// For Netlify functions, you can export a handler function
exports.handler = async (event, context) => {
  // Only allow POST method
  if (event.httpMethod !== "POST") {
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
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Invalid request body" }),
    };
  }
  
  const { username, password } = body;
  if (!username || !password) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Username and password required." }),
    };
  }
  
  // Load admin credentials from environment variables
  const adminUsername = process.env.ADMIN_USERNAME;
  const adminPasswordHash = process.env.ADMIN_PASSWORD_HASH;
  const jwtSecret = process.env.JWT_SECRET || "fallback_jwt_secret";
  
  // Check if the username matches
  if (username !== adminUsername) {
    return {
      statusCode: 401,
      body: JSON.stringify({ error: "Invalid credentials." }),
    };
  }
  
  // Validate password
  const passwordValid = await bcrypt.compare(password, adminPasswordHash);
  if (!passwordValid) {
    return {
      statusCode: 401,
      body: JSON.stringify({ error: "Invalid credentials." }),
    };
  }
  
  // Credentials are valid – create a JWT token
  const token = jwt.sign({ username }, jwtSecret, { expiresIn: "1h" });
  
  return {
    statusCode: 200,
    // Return the token in JSON. In production, you might set this in an HTTP-only cookie.
    body: JSON.stringify({ message: "Logged in successfully.", token }),
  };
};
