const { WebSocketServer } = require("ws");

function createCommunityServer(server) {
  const wss = new WebSocketServer({ server });
  console.log("✅ WebSocket attached to Express server");

  wss.on("connection", (socket) => {
    console.log("🔗 New client connected");

    socket.on("message", (message) => {
      try {
        const data = JSON.parse(message.toString());

        if (data.type === "join") {
          socket.username = data.username;
          console.log(`👤 ${socket.username} joined`);
          broadcast(wss, {
            type: "notification",
            message: `${socket.username} joined the chat`,
          });
        }

        if (data.type === "chat") {
          broadcast(wss, {
            type: "chat",
            username: socket.username,
            message: data.message,
          });
        }
      } catch (err) {
        console.error("❌ Error:", err);
      }
    });

    socket.on("close", () => {
      if (socket.username) {
        broadcast(wss, {
          type: "notification",
          message: `${socket.username} left the chat`,
        });
      }
    });
  });
}

function broadcast(wss, data) {
  wss.clients.forEach((client) => {
    if (client.readyState === 1) {
      client.send(JSON.stringify(data));
    }
  });
}

module.exports = { createCommunityServer };
