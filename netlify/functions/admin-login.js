// netlify/functions/admin-login.js
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.handler = async (event, context) => {
  // Allow GET requests for debugging purposes.
  // This will help you verify that the function is deployed and responding.
  if (event.httpMethod === "GET") {
    return {
      statusCode: 200,
      body: JSON.stringify({
        message:
          "This endpoint requires a POST request with a JSON body containing username and password.",
      }),
    };
  }

  // Only allow POST requests for actual login attempts.
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: "Method Not Allowed",
    };
  }

  // Parse the request body.
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
    console.error("Missing username or password.");
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Username and password required." }),
    };
  }

  // Load admin credentials from environment variables.
  const adminUsername = process.env.ADMIN_USERNAME;
  const adminPasswordHash = process.env.ADMIN_PASSWORD_HASH;
  const jwtSecret = process.env.JWT_SECRET || "fallback_jwt_secret";

  // Check if the username matches.
  if (username !== adminUsername) {
    console.error(`Username mismatch: received ${username}, expected ${adminUsername}`);
    return {
      statusCode: 401,
      body: JSON.stringify({ error: "Invalid credentials." }),
    };
  }

  // Validate the password using bcrypt.
  let passwordValid;
  try {
    passwordValid = await bcrypt.compare(password, adminPasswordHash);
  } catch (error) {
    console.error("Error during password comparison:", error);
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

  // Credentials are valid – create a JWT token (expires in 1 hour).
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
