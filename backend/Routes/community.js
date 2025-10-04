const express = require("express");
const communityRouter = express.Router();
const Community = require("../models/membersModels");
const authMiddleware = require("../middleware/auth");

// Connect user to community
communityRouter.post("/connect", authMiddleware, async (req, res) => {
  try {
    const { admissionYear } = req.body;
    const { email, username } = req.user;

    if (!admissionYear) return res.status(400).json({ message: "Admission Year is required" });

    const alreadyConnected = await Community.findOne({ email });
    if (alreadyConnected)
      return res.status(409).json({ message: "Already Connected", member: alreadyConnected });

    const newMember = await Community.create({ email, username, admissionYear });
    return res.status(201).json({ message: "Community Connected successfully", member: newMember });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

// Check connection status
communityRouter.get("/status", authMiddleware, async (req, res) => {
  try {
    const { email } = req.user;
    const member = await Community.findOne({ email });
    if (!member) return res.status(404).json({ connected: false });

    return res.status(200).json({ connected: true, member });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = communityRouter;
