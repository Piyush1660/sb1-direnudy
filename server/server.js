require("dotenv").config();
const express = require("express");
const session = require("express-session");
const bcrypt = require('bcryptjs');

const cors = require("cors");
const jwt = require("jsonwebtoken");

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "https://citytownrp.netlify.app",
    credentials: true,
  })
);

app.use(
  session({
    secret: process.env.SESSION_SECRET || "fallback_secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
    },
  })
);

const adminUser = {
  username: process.env.ADMIN_USERNAME || "admin",
  passwordHash: process.env.ADMIN_PASSWORD_HASH || "",
};

// Admin login (JWT + Session)
app.post("/api/admin/login", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: "Username and password required." });
  }
  if (username !== adminUser.username) {
    return res.status(401).json({ error: "Invalid credentials." });
  }

  const passwordValid = await bcrypt.compare(password, adminUser.passwordHash);
  if (!passwordValid) {
    return res.status(401).json({ error: "Invalid credentials." });
  }

  // Generate JWT
  const token = jwt.sign({ username }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  req.session.admin = { username };
  res.json({ message: "Logged in successfully.", token });
});

// Protected route
app.get("/api/admin/dashboard", (req, res) => {
  if (!req.session.admin) {
    return res.status(401).json({ error: "Unauthorized. Please log in." });
  }
  res.json({ data: "Secret admin data." });
});

// Logout
app.post("/api/admin/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(500).json({ error: "Logout failed." });
    res.clearCookie("connect.sid");
    res.json({ message: "Logged out successfully." });
  });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
