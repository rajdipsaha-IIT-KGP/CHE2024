const { WebSocketServer } = require("ws");
const ChatMessage  = require("./models/ChatMessage")
     
function createCommunityServer(server) {
  const wss = new WebSocketServer({ server });
  console.log("✅ WebSocket attached to Express server");

  wss.on("connection", (socket) => {
    console.log("🔗 New client connected");

    socket.on("message", async(message) => {
      try {
        const data = JSON.parse(message.toString());

        if (data.type === "join") {
          socket.username = data.username;
          console.log(`👤 ${socket.username} joined`);


          const history = await ChatMessage.find().sort({ createdAt: 1 })
            .limit(100)
            .lean();


   socket.send(JSON.stringify({
    type:"history",
    message:history
   }))

          broadcast(wss, {
            type: "notification",
            message: `${socket.username} joined the chat`,
          });
        }


       
      


        if (data.type === "chat") {
          
      
          const savedMsg = await ChatMessage.create({
            sender:socket.username,
            message:data.message,
            likes:0,
            dislikes:0,
          })

          broadcast(wss,{
            type:"chat",
            sender:savedMsg.sender,
            messageID:savedMsg._id,
            message:savedMsg.message,
            likes:savedMsg.likes,
            dislikes:savedMsg.dislikes,
            timestamp:savedMsg.createdAt
          })
        }
          if(data.type === "like" || data.type === "dislike"){
            const field = data.type === "like"?"likes":"dislikes"
            const updatedMsg = await ChatMessage.findByIdAndUpdate(
              data.messageID,
              {$inc :{[field]:1}},
              {new:true}
            )

            if(updatedMsg)
            {
              broadcast(wss,{
                type:"updatedMsg",
                likes:updatedMsg.likes,
                dislikes:updatedMsg.dislikes,
                messageID:updatedMsg._id,

              })
            }
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
