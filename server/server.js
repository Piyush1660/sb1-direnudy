require("dotenv").config();
const express = require("express");
const session = require("express-session");
const bcrypt = require('bcryptjs');
const cors = require("cors");
const jwt = require("jsonwebtoken");
const fs = require('fs');
const path = require('path');

const app = express();
app.use(express.json());
app.use(cors({
  origin: "https://citytownrp.netlify.app",
  credentials: true,
}));

app.use(session({
  secret: process.env.SESSION_SECRET || "fallback_secret",
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
  },
}));

const adminUser = {
  username: process.env.ADMIN_USERNAME || "admin",
  passwordHash: process.env.ADMIN_PASSWORD_HASH || "",
};

// Middleware to verify JWT
const verifyJWT = (req, res, next) => {
  const token = req.headers["x-access-token"];
  if (!token) return res.status(403).json({ error: "No token provided." });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(500).json({ error: "Failed to authenticate token." });
    req.username = decoded.username;
    next();
  });
};

// Admin login route
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

  const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: "1h" });
  req.session.admin = { username };
  res.json({ message: "Logged in successfully.", token });
});

// Route to get the current staff form status
app.get("/.netlify/functions/staff-form-status", (req, res) => {
  const statusFilePath = path.join(__dirname, 'staffFormStatus.json');
  if (fs.existsSync(statusFilePath)) {
    const statusData = fs.readFileSync(statusFilePath);
    const { isStaffFormOpen } = JSON.parse(statusData);
    res.json({ isStaffFormOpen });
  } else {
    res.json({ isStaffFormOpen: true }); // Default to open if status file doesn't exist
  }
});

// Route to update the staff form status (protected)
app.post("/.netlify/functions/staff-form-status", verifyJWT, (req, res) => {
  const { isStaffFormOpen } = req.body;
  if (typeof isStaffFormOpen !== 'boolean') {
    return res.status(400).json({ error: "Invalid status value." });
  }

  const statusFilePath = path.join(__dirname, 'staffFormStatus.json');
  fs.writeFileSync(statusFilePath, JSON.stringify({ isStaffFormOpen }));
  res.json({ message: "Staff form status updated successfully." });
});

// Admin dashboard route (protected)
app.get("/api/admin/dashboard", verifyJWT, (req, res) => {
  res.json({ data: "Secret admin data." });
});

// Admin logout route
app.post("/api/admin/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(500).json({ error: "Logout failed." });
    res.clearCookie("connect.sid");
    res.json({ message: "Logged out successfully." });
  });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
