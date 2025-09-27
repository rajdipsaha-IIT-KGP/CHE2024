// Routes/user.js
const { Router } = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

const { usermodel } = require("../db");
const otpModel = require("../models/otpModel");

const userRouter = Router();
const JWT_SECRET = "rajdipsaha";

// ------------------ Helper to send OTP email ------------------
async function sendOtpEmail(toEmail, otp) {
  try {
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "rajdipsaha7697@gmail.com",      
        pass: "xsyi zewt ptwa tnnh",                    
      },
    });

    await transporter.sendMail({
      from: "rajdipsaha7697@gmail.com",
      to: toEmail,
      subject: "CHE 2024 - Your OTP Code",
      text: `Thanks for joining CHE 2024. Your OTP is ${otp}. It is valid for 10 minutes.`,
    });

    console.log("✅ OTP sent successfully to", toEmail);
  } catch (err) {
    console.error("❌ Error sending OTP:", err);
  }
}

// ------------------ SEND OTP ------------------
userRouter.post("/signup/send-otp", async (req, res) => {
  try {
    const { email, username, password } = req.body || {};
    if (!email || !username || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await usermodel.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    // remove old OTP for same email
    await otpModel.deleteMany({ email });

    // store OTP + temp user data
    await otpModel.create({
      email,
      otp,
      expiresAt,
      tempUserData: { email, username, password }
    });

    // send OTP email
    await sendOtpEmail(email, otp);

    return res.status(200).json({ message: "OTP sent successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// ------------------ VERIFY OTP & CREATE USER ------------------
userRouter.post("/signup/verify-otp", async (req, res) => {
  try {
    const { email, otp } = req.body || {};
    if (!email || !otp) return res.status(400).json({ message: "Email and OTP required" });

    const record = await otpModel.findOne({ email, otp });
    if (!record) return res.status(400).json({ message: "Invalid OTP" });

    if (record.expiresAt < new Date())
      return res.status(400).json({ message: "OTP expired" });

    const existingUser = await usermodel.findOne({ email: record.tempUserData.email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(record.tempUserData.password, 10);

    const newUser = await usermodel.create({
      email: record.tempUserData.email,
      username: record.tempUserData.username,
      password: hashedPassword,
    });

    // remove OTP after verification
    await otpModel.deleteMany({ email });

    const token = jwt.sign({ id: newUser._id }, JWT_SECRET, { expiresIn: "2h" });

    return res.status(200).json({
      message: "User verified and created successfully",
      token,
      user: { id: newUser._id, username: newUser.username, email: newUser.email }
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// ------------------ SIGNIN ------------------
userRouter.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body || {};
    if (!email || !password) return res.status(400).json({ message: "All fields required" });

    const user = await usermodel.findOne({ email });
    if (!user) return res.status(404).json({ message: "Account does not exist" });

    const isValidPass = await bcrypt.compare(password, user.password);
    if (!isValidPass) return res.status(400).json({ message: "Password is incorrect" });

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "2h" });

    return res.status(200).json({
      message: "User signed in successfully",
      token,
      user: { id: user._id, username: user.username, email: user.email }
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = userRouter;
