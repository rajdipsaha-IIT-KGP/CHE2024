const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
  sender: { type: String, required: true },  
  message: { type: String, required: true },  
  timestamp: { type: Date, default: Date.now },
}, { timestamps: true });

module.exports = mongoose.model("ChatMessage", chatSchema);
