const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

// Routes
const userRouter = require("./Routes/user");
const communityRouter = require("./Routes/community");


const { createCommunityServer } = require("./server");

const app = express();

// ------------------ Middleware ------------------
app.use(cors());
app.use(express.json());

// ------------------ Routes ------------------
app.use("/user", userRouter);
app.use("/community", communityRouter);

// ------------------ MongoDB Connection ------------------
async function main() {
  try {
    await mongoose.connect(
      "mongodb+srv://rajdipsaha7697:Rajdip%402006@rajdip.r4ziwjt.mongodb.net/CHE2024"
    );
    console.log("✅ MongoDB connected successfully");

    // ------------------ HTTP + WS server ------------------
    const server = createCommunityServer(app);

    const PORT = 3000;
    server.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT} (HTTP + WebSocket)`);
    });
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err.message);
    process.exit(1);
  }
}

main();
