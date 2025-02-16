import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const handler = async (event: any) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method Not Allowed" }),
    };
  }

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

  const adminUsername = process.env.ADMIN_USERNAME || "";
  const adminPasswordHash = process.env.ADMIN_PASSWORD_HASH || "";
  const jwtSecret = process.env.JWT_SECRET || "fallback_jwt_secret";

  if (username !== adminUsername) {
    return {
      statusCode: 401,
      body: JSON.stringify({ error: "Invalid credentials." }),
    };
  }

  const isPasswordValid = await bcrypt.compare(password, adminPasswordHash);
  if (!isPasswordValid) {
    return {
      statusCode: 401,
      body: JSON.stringify({ error: "Invalid credentials." }),
    };
  }

  const token = jwt.sign({ username }, jwtSecret, { expiresIn: "1h" });

  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Logged in successfully.", token }),
  };
};
