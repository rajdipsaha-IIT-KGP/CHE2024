// index.js
const { Pool } = require("pg");
const express = require("express");
const bcrypt = require("bcryptjs");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const app = express();
app.use(express.json());
app.use(cors());

/* ================= CONFIG ================= */

// ⚠️ In production, move these to ENV variables
const JWT_SECRET = "your_jwt_secret_key";

const pool = new Pool({
  host: "ep-weathered-brook-a4dlu9vp-pooler.us-east-1.aws.neon.tech",
  port: 5432,
  database: "neondb",
  user: "neondb_owner",
  password: "npg_ST2qt9KlZhnH",
  ssl: { rejectUnauthorized: false },
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

/* ============ PG ERROR HANDLING ============ */

pool.on("error", (err) => {
  console.error("Unexpected Postgres error:", err);
});

/* ============ START SERVER ============ */

(async () => {
  try {
    const client = await pool.connect();
    console.log("Connected to Postgres database");
    client.release();

    app.listen(3000, () => {
      console.log("Express server running on port 3000");
    });
  } catch (err) {
    console.error("Database connection failed:", err);
    process.exit(1);
  }
})();

/* ================= ROUTES ================= */

/* ---------- SIGN UP ---------- */
app.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const userExists = await pool.query(
      "SELECT 1 FROM users WHERE email = $1",
      [email]
    );

    if (userExists.rows.length > 0) {
      return res.status(409).json({ message: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool.query(
      "INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id",
      [username, email, hashedPassword]
    );

    const token = jwt.sign(
      { userId: result.rows[0].id, email },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(201).json({
      message: "User registered successfully",
      token,
    });
  } catch (err) {
    console.error("Signup Error:", err);
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
      token,
    });
  } catch (err) {
    console.error("Signin Error:", err);
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
    console.error("Forgot Password Error:", err);
    res.status(500).json({ message: "Server error" });
  }
});
