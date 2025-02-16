// netlify/functions/admin-login.ts
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const handler = async (event: any, context: any) => {
  // Only allow POST requests
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

  // Explicitly type and provide fallback values for environment variables
  const adminUsername: string = process.env.ADMIN_USERNAME || "";
  const adminPasswordHash: string = process.env.ADMIN_PASSWORD_HASH || "";
  const jwtSecret: string = process.env.JWT_SECRET || "fallback_jwt_secret";

  // Debug logs (only in development)
  if (process.env.NODE_ENV !== "production") {
    console.log("Received username:", username);
    console.log("Expected username:", adminUsername);
  }

  // Check if the username matches (case-sensitive)
  if (username !== adminUsername) {
    console.error(`Username mismatch: received "${username}", expected "${adminUsername}"`);
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
    console.error("Error during password validation:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Server error during password validation." }),
    };
  }
  if (!passwordValid) {
    console.error("Invalid password for user:", username);
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
    console.error("Error generating JWT token:", error);
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
