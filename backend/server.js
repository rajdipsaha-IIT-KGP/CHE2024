// server.js
const http = require("http");
const { WebSocketServer } = require("ws");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const ChatMessage = require("./models/ChatMessage");
const CommunityMember = require("./models/membersModel");

const SECRET = "rajdipsaha";

// -------------------- HTTP + WebSocket Server --------------------
const server = http.createServer();
const wss = new WebSocketServer({ noServer: true });

let allSockets = [];

// -------------------- Handle WS Connection --------------------
wss.on("connection", async (socket, user) => {
  console.log(` ${user.username} connected`);

  // Send full chat history to the new/rejoining user
  const history = await ChatMessage.find().sort({ timestamp: 1 });
  socket.send(JSON.stringify({ type: "history", payload: history }));

  // Add user to allSockets
  allSockets.push({ socket, user });

  // Broadcast that a user joined
  allSockets.forEach(c => {
    if (c.socket.readyState === 1 && c.socket !== socket) {
      c.socket.send(JSON.stringify({ type: "userJoined", payload: { username: user.username } }));
    }
  });

  //  Receive Messages 
  socket.on("message", async (message) => {
    try {
      const data = JSON.parse(message);

      if (data.type === "chat") {
        const msg = {
          sender: user.username,
          message: data.payload.message,
          timestamp: new Date(),
        };

        // Save message in DB
        await ChatMessage.create(msg);

        // Broadcast to all other connected users
        allSockets.forEach(c => {
          if (c.socket.readyState === 1 && c.socket !== socket) {
            c.socket.send(JSON.stringify({ type: "chat", payload: msg }));
          }
        });
      }
    } catch (err) {
      console.error(" Invalid WS message:", err);
    }
  });

  // -------------------- Handle Disconnect --------------------
  socket.on("close", () => {
    console.log(` ${user.username} disconnected`);
    allSockets = allSockets.filter(c => c.socket !== socket);

    // Broadcast user left
    allSockets.forEach(c => {
      if (c.socket.readyState === 1) {
        c.socket.send(JSON.stringify({ type: "userLeft", payload: { username: user.username } }));
      }
    });
  });
});

// Handle WS Upgrade + JWT 
server.on("upgrade", (req, socket, head) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const token = url.searchParams.get("token");

  if (!token) {
    socket.destroy();
    return;
  }

  try {
    const decoded = jwt.verify(token, SECRET);
    wss.handleUpgrade(req, socket, head, (ws) => {
      wss.emit("connection", ws, decoded);
    });
  } catch (err) {
    console.log(" Invalid or missing token");
    socket.destroy();
  }
});

// -------------------- Start Server --------------------
server.listen(8080, () => {
  console.log("🚀 WS + HTTP server running on port 8080");
});
