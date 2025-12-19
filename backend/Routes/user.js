// Routes/user.js
const { Router } = require("express");
const bcrypt = require("bcrypt");
const { Client } = require("pg");

const userRouter = Router();

// ⚠️ move to env later
const client = new Client({
  host: "ep-weathered-brook-a4dlu9vp-pooler.us-east-1.aws.neon.tech",
  port: 5432,
  database: "neondb",
  user: "neondb_owner",
  password: "npg_ST2qt9KlZhnH",
  ssl: { rejectUnauthorized: false }
});

// connect postgres ONCE
client.connect()
  .then(() => console.log("✅ Postgres connected"))
  .catch(err => console.error("❌ Postgres error", err));


// ✅ SIGNUP ROUTE
userRouter.post("/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({
        message: "All fields are required"
      });
    }

    const hashedPass = await bcrypt.hash(password, 10);

    const userQuery =
      "INSERT INTO users (username, email, password) VALUES ($1, $2, $3)";

    await client.query(userQuery, [username, email, hashedPass]);

    return res.status(201).json({
      message: "Signup successful"
    });

  } catch (err) {
    console.error("Signup error:", err);

    // duplicate email
    if (err.code === "23505") {
      return res.status(409).json({
        message: "Email already exists"
      });
    }

    return res.status(500).json({
      message: "Internal Server Error"
    });
  }
});

module.exports = userRouter;
