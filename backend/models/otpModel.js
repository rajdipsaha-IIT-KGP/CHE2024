const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema({
  email: { type: String, required: true },
  otp: { type: String, required: true },
  expiresAt: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now },
  tempUserData: {
    email: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
  }
});

const otpModel = mongoose.model("OTP", otpSchema);

module.exports = otpModel;
