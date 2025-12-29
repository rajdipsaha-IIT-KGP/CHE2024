const express = require("express");
const { Pool } = require("pg");
const bcrypt = require("bcryptjs");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const app = express();
app.use(express.json());
app.use(cors());
app.use("/public", express.static("public"));
const DATABASE_URL =
  "postgresql://neondb_owner:npg_ST2qt9KlZhnH@ep-weathered-brook-a4dlu9vp-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require";


const JWT_SECRET = "MY SECRET PASS";



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
  console.error("Postgres error:", err);
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
    const emailExists = await pool.query(
      "SELECT 1 FROM users WHERE email = $1",
      [email]
    );
    if (emailExists.rows.length > 0) {
      return res.status(409).json({ message: "Email already registered" });
    }

    const usernameExists = await pool.query(
      "SELECT 1 FROM users WHERE username = $1",
      [username]
    );
    if (usernameExists.rows.length > 0) {
      return res.status(409).json({ message: "Username already taken" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool.query(
      "INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id",
      [username, email, hashedPassword]
    );

    const userId = result.rows[0].id;

    const token = jwt.sign({ userId, email }, JWT_SECRET, {
      expiresIn: "1h",
    });

    return res.status(201).json({
      message: "User registered successfully",
      username,
      email,
      token,
    });

  } catch (err) {
    console.error("Signup error:", err);
    return res.status(500).json({ message: "Internal Server Error" });
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

app.post("/change-email", async function (req, res) {
  const { username, email, password } = req.body;

  try {
    if (!username || !email || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const userResult = await pool.query(
      "SELECT password FROM users WHERE username = $1",
      [username]
    );

    if (userResult.rows.length === 0) {
      return res.status(404).json({
        message: "No such user exists",
      });
    }

    const hashedPassword = userResult.rows[0].password;

    const isMatch = await bcrypt.compare(password, hashedPassword);
    if (!isMatch) {
      return res.status(401).json({
        message: "Password mismatched",
      });
    }
const already = await pool.query("SELECT * FROM users WHERE email = $1",[email])
if(already.rows.length !== 0)
  return res.status(401).json({
message:"email aready registered user different email"})
    await pool.query(
      "UPDATE users SET email = $1 WHERE username = $2",
      [email, username]
    );

    return res.status(200).json({
      message: "Email updated successfully",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
});

app.post("/change-username", async function (req, res) {
  const { username, email, password } = req.body;

  try {
    if (!username || !email || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const userResult = await pool.query(
      "SELECT password FROM users WHERE email = $1",
      [email]
    );

    if (userResult.rows.length === 0) {
      return res.status(404).json({
        message: "No such user exists",
      });
    }

    const hashedPassword = userResult.rows[0].password;

    const isMatch = await bcrypt.compare(password, hashedPassword);
    if (!isMatch) {
      return res.status(401).json({
        message: "Password mismatched",
      });
    }
const already = await pool.query("SELECT * FROM users WHERE username = $1",[username])
if(already.rows.length !== 0)
  return res.status(401).json({
message:"Username aready registered user different username"})
    await pool.query(
      "UPDATE users SET username = $1 WHERE email = $2",
      [username, email]
    );

    return res.status(200).json({
      message: "Username updated successfully",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
});
app.get("/courses", async (req, res) => {
  const result = await pool.query("SELECT * FROM courses");
  res.json(result.rows);
});

/* ---------------- LECTURES ---------------- */
app.get("/courses/:id/lectures", async (req, res) => {
  const { id } = req.params;

  const result = await pool.query(
    "SELECT * FROM lectures WHERE course_id = $1 ORDER BY lecture_number",
    [id]
  );

  res.json(result.rows);
});
