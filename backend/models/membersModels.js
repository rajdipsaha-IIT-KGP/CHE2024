const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  admissionYear: Number
});

const CommunityMember = mongoose.model("CommunityMember", memberSchema);

module.exports = CommunityMember;
