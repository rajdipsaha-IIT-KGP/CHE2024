const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
  sender: { type: String, required: true },  
  message: { type: String, required: true }, 
   likes :{type:Number},
   dislikes:{type:Number}, 
  timestamp: { type: Date, default: Date.now },
}, { timestamps: true }
   

);

module.exports = mongoose.model("ChatMessages", chatSchema);
