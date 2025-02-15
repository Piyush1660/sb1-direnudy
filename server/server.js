// server/server.js
require('dotenv').config();
const express = require('express');
const session = require('express-session');
const bcrypt = require('bcrypt');
const cors = require('cors');

const app = express();

// Middleware
app.use(express.json());

// Allow requests from your Netlify/React front-end
app.use(cors({
  origin: 'https://citytownrp.netlify.app', // your Netlify domain
  credentials: true,
}));

app.use(session({
  secret: process.env.SESSION_SECRET || 'fallback_secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production', // use true in production (requires HTTPS)
    httpOnly: true,
  },
}));

// Admin user from environment variables
const adminUser = {
  username: process.env.ADMIN_USERNAME || 'admin',
  passwordHash: process.env.ADMIN_PASSWORD_HASH, // already hashed
};

// Admin login endpoint
app.post('/api/admin/login', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password required.' });
  }
  if (username !== adminUser.username) {
    return res.status(401).json({ error: 'Invalid credentials.' });
  }
  const passwordValid = await bcrypt.compare(password, adminUser.passwordHash);
  if (!passwordValid) {
    return res.status(401).json({ error: 'Invalid credentials.' });
  }
  // Successful login: set session
  req.session.admin = { username };
  res.json({ message: 'Logged in successfully.' });
});

// Protected admin route
app.get('/api/admin/dashboard', (req, res) => {
  if (!req.session.admin) {
    return res.status(401).json({ error: 'Unauthorized. Please log in.' });
  }
  res.json({ data: 'Secret admin data.' });
});

// Logout endpoint
app.post('/api/admin/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(500).json({ error: 'Logout failed.' });
    res.clearCookie('connect.sid');
    res.json({ message: 'Logged out successfully.' });
  });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
