// backend/db.js
const mongoose = require("mongoose");

// 1️⃣ Connect to MongoDB
mongoose.connect(
  "mongodb+srv://rajdipsaha7697:Rajdip%402006@rajdip.r4ziwjt.mongodb.net/CHE2024"
)
.then(() => console.log("✅ MongoDB connected successfully"))
.catch((err) => console.error("❌ MongoDB connection failed:", err.message));

// 2️⃣ Define user schema
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  username: { type: String, required: true, unique: true },
});

// 3️⃣ Create model
const usermodel = mongoose.model("userdata", userSchema);

// 4️⃣ Export model
module.exports = { usermodel };
