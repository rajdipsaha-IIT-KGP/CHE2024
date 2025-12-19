// index.js
const { Client } = require("pg");
const express = require("express");
const bcrypt = require("bcryptjs");
const cors = require("cors"); 
const jwt = require("jsonwebtoken"); 

const app = express();
app.use(express.json());


app.use(cors());


const client = new Client({
  host: "ep-weathered-brook-a4dlu9vp-pooler.us-east-1.aws.neon.tech",
  port: 5432,
  database: "neondb",
  user: "neondb_owner",
  password: "npg_ST2qt9KlZhnH",
  ssl: { rejectUnauthorized: false }
});

// JWT secret
const JWT_SECRET = "your_jwt_secret_key"; // change this to a strong secret

// Connect to DB
async function main() {
  try {
    await client.connect();
    console.log("Connected to Postgres database");

    app.listen(3000, () => {
      console.log("Express server running on port 3000");
    });
  } catch (err) {
    console.error("DB Connection Error:", err);
  }
}
main();

/* ---------------- SIGNUP ---------------- */
app.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: "Username, email, and password are required" });
  }

  try {
    const existingUser = await client.query("SELECT * FROM users WHERE email = $1", [email]);
    if (existingUser.rows.length > 0) {
      return res.status(409).json({ message: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const insertQuery = "INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id";
    const result = await client.query(insertQuery, [username, email, hashedPassword]);
    const userId = result.rows[0].id;

    // Optional: generate JWT token
    const token = jwt.sign({ userId, email }, JWT_SECRET, { expiresIn: "1h" });

    res.status(201).json({
      message: "User registered successfully",
      userId,
      token
    });

  } catch (err) {
    console.error("Signup Error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

/* ---------------- SIGNIN ---------------- */
app.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const result = await client.query("SELECT * FROM users WHERE email = $1", [email]);
    if (result.rows.length === 0) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const user = result.rows[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    
    const token = jwt.sign({ userId: user.id, email }, JWT_SECRET, { expiresIn: "1h" });

    res.status(200).json({
      message: "User signed in successfully",
      username: user.username,
      token
    });

  } catch (err) {
    console.error("Signin Error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

/*------------FORGOT PASS---------------*/ 
app.post('/forgot-password', async function (req, res) {
  const { email, newPass } = req.body;

  try {
    if (!email || !newPass) {
      return res.status(400).json({
        message: "Please fill up all the fields"
      });
    }

    const userquery = 'SELECT * FROM users WHERE email = $1';
    const result = await client.query(userquery, [email]);

    if (result.rows.length === 0) {
      return res.status(400).json({
        message: "No such user exists"
      });
    }

    const hashedPassword = await bcrypt.hash(newPass, 10);

    const updationQuery = 'UPDATE users SET password = $1 WHERE email = $2';
    await client.query(updationQuery, [hashedPassword, email]);

    return res.status(200).json({
      message: "Password updated successfully"
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Server error"
    });
  }
});
