// index.js
const express = require("express");
const { Pool } = require("pg");
const bcrypt = require("bcryptjs");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const app = express();
app.use(express.json());
app.use(cors());

/* ================= ENV ================= */

// Render → Environment Variables
const DATABASE_URL = process.env.DATABASE_URL;
const JWT_SECRET = "MY SECRET PASS";

/* ================= DATABASE ================= */

const pool = new Pool({
  connectionString: DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

pool.on("connect", () => {
  console.log("Connected to Neon Postgres");
});

pool.on("error", (err) => {
  console.error("Unexpected Postgres error", err);
});

/* ================= SERVER ================= */

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

/* ================= ROUTES ================= */

/* ---------- SIGN UP ---------- */
app.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Check email
    const emailExists = await pool.query(
      "SELECT 1 FROM users WHERE email = $1",
      [email]
    );
    if (emailExists.rows.length > 0) {
      return res.status(409).json({ message: "Email already registered" });
    }

    // Check username
    const usernameExists = await pool.query(
      "SELECT 1 FROM users WHERE username = $1",
      [username]
    );
    if (usernameExists.rows.length > 0) {
      return res.status(409).json({ message: "Username already taken" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user
    const result = await pool.query(
      "INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id",
      [username, email, hashedPassword]
    );

    const userId = result.rows[0].id;

    // JWT
    const token = jwt.sign(
      { userId, email },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(201).json({
      message: "User registered successfully",
      username,
      email,
      token,
    });

  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

/* ---------- SIGN IN ---------- */
app.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password required" });
  }

  try {
    const result = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const user = result.rows[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { userId: user.id, email },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      message: "User signed in successfully",
      username: user.username,
      email: user.email,
      token,
    });

  } catch (err) {
    console.error("Signin error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

/* ---------- FORGOT PASSWORD ---------- */
app.post("/forgot-password", async (req, res) => {
  const { email, newPass } = req.body;

  if (!email || !newPass) {
    return res.status(400).json({ message: "All fields required" });
  }

  try {
    const user = await pool.query(
      "SELECT 1 FROM users WHERE email = $1",
      [email]
    );

    if (user.rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const hashedPassword = await bcrypt.hash(newPass, 10);

    await pool.query(
      "UPDATE users SET password = $1 WHERE email = $2",
      [hashedPassword, email]
    );

    res.status(200).json({ message: "Password updated successfully" });

  } catch (err) {
    console.error("Forgot password error:", err);
    res.status(500).json({ message: "Server error" });
  }
});
