import React, { useEffect, useState, useRef } from "react";
import { FaPaperPlane, FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast";

const Community = () => {
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [connected, setConnected] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const ws = useRef(null);

  useEffect(() => {
    const storedEmail = localStorage.getItem("userEmail");
    if (storedEmail) setEmail(storedEmail);
  }, []);

  const connectWebSocket = () => {
    if (!email) return toast.error("Sign in first to continue");
    setLoading(true);

    ws.current = new WebSocket("wss://che2024.onrender.com");

    ws.current.onopen = () => {
      console.log("✅ Connected to server");
      setConnected(true);
      setLoading(false);

      toast.success("Connected to CHE 2024 Community!");

      ws.current.send(
        JSON.stringify({ type: "join", username: email.split("@")[0] })
      );
    };

    ws.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log("📩 Incoming:", data);

      // ✅ handle notifications
      if (data.type === "notification") {
        toast(data.message, {
          style: {
            background: "#0f172a",
            color: "#93c5fd",
            border: "1px solid #3b82f6",
          },
          iconTheme: {
            primary: "#60a5fa",
            secondary: "#0f172a",
          },
        });
        return;
      }

      // ✅ handle message updates (like/dislike)
      if (data.type === "updatedMsg") {
        setMessages((prev) =>
          prev.map((msg) =>
            msg.messageID === data.messageID
              ? { ...msg, upvotes: data.likes, downvotes: data.dislikes }
              : msg
          )
        );
        return;
      }

      // ✅ handle message history
      if (data.type === "history") {
        const historyMsgs = data.message.map((msg) => ({
          username: msg.sender,
          messageID: msg._id,
          message: msg.message,
          upvotes: msg.likes || 0,
          downvotes: msg.dislikes || 0,
          userVote: null,
        }));
        setMessages(historyMsgs);
        return;
      }

      // ✅ handle new chat messages
      if (data.type === "chat") {
        const newMsg = {
          username: data.sender,
          messageID: data.messageID,
          message: data.message,
          upvotes: data.likes || 0,
          downvotes: data.dislikes || 0,
          userVote: null,
        };
        setMessages((prev) => [...prev, newMsg]);
      }
    };

    ws.current.onclose = () => {
      console.log("❌ Disconnected from server");
      setConnected(false);
      toast.error("Disconnected from CHE 2024 Community");
    };

    ws.current.onerror = (err) => {
      console.error("WebSocket error:", err);
      toast.error("WebSocket connection failed!");
      setLoading(false);
    };
  };

  const sendMessage = () => {
    if (!newMessage.trim()) return;
    ws.current.send(
      JSON.stringify({ type: "chat", message: newMessage, likes: 0, dislikes: 0 })
    );
    setNewMessage("");
  };

  const handleVote = (index, type) => {
    const targetMsg = messages[index];
    if (!targetMsg?.messageID) return;

    ws.current.send(
      JSON.stringify({
        type: type === "upvote" ? "like" : "dislike",
        messageID: targetMsg.messageID,
      })
    );

    setMessages((prev) =>
      prev.map((msg, i) => {
        if (i !== index) return msg;
        if (msg.userVote === type) return msg;

        let upvotes = msg.upvotes || 0;
        let downvotes = msg.downvotes || 0;

        if (msg.userVote === "upvote") upvotes = Math.max(0, upvotes - 1);
        if (msg.userVote === "downvote") downvotes = Math.max(0, downvotes - 1);

        if (type === "upvote") upvotes += 1;
        if (type === "downvote") downvotes += 1;

        return { ...msg, upvotes, downvotes, userVote: type };
      })
    );
  };

  return (
    <div className="min-h-screen font-sans bg-gray-900 text-white relative">
      <Toaster
        position="top-bottom"
        toastOptions={{
          style: {
            background: "#1E293B",
            color: "#E2E8F0",
            borderRadius: "8px",
            border: "1px solid #334155",
          },
          success: {
            iconTheme: {
              primary: "#3B82F6",
              secondary: "#1E293B",
            },
          },
          error: {
            style: {
              background: "#7F1D1D",
              color: "#FEE2E2",
            },
            iconTheme: {
              primary: "#F87171",
              secondary: "#7F1D1D",
            },
          },
        }}
      />

      {!connected ? (
        <div className="flex justify-center items-center h-screen">
          <div className="w-full max-w-md p-10 bg-gray-800/90 backdrop-blur-lg rounded-3xl shadow-2xl z-10">
            <h2 className="text-3xl font-bold text-center mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">
              CHE 2024 - Community Sign In
            </h2>

            <div className="space-y-4">
              <input
                type="email"
                placeholder="Email"
                className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 placeholder-gray-300 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={email}
                readOnly
              />

              <button
                onClick={connectWebSocket}
                disabled={loading}
                className="w-full py-3 rounded-lg bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 transition-all duration-300 font-semibold text-white disabled:opacity-50 cursor-pointer"
              >
                {loading ? "Signing In..." : "Sign In"}
              </button>
            </div>
          </div>
        </div>
      ) : (
        <>
          {/* Chat messages section */}
          <div className="h-[70vh] w-[90vw] mx-auto mt-4 rounded-lg bg-gray-900 p-4 overflow-y-auto flex flex-col-reverse space-y-2">
            {messages.length === 0 && (
              <p className="text-center text-gray-400 mt-40">
                Messages will appear here
              </p>
            )}

            {messages
              .slice()
              .reverse()
              .map((msg, i) => {
                const originalIndex = messages.length - 1 - i;
                const isOwn = msg.username === email.split("@")[0];

                return (
                  <div
                    key={msg.messageID || originalIndex}
                    className={`flex flex-col ${
                      isOwn ? "items-end" : "items-start"
                    }`}
                  >
                    {/* Message Box */}
                    <div
                      className={`p-3 rounded-lg transition-all duration-300 transform hover:scale-[1.02] max-w-[70%] break-words ${
                        isOwn
                          ? "bg-gray-800 text-white"
                          : "bg-gray-700 text-white"
                      }`}
                    >
                      <strong>{msg.username}:</strong> {msg.message}
                    </div>

                    {/* Upvote / Downvote buttons */}
                    <div
                      className={`flex gap-4 mt-1 ${
                        isOwn ? "justify-end" : "justify-start"
                      }`}
                    >
                      <span
                        className="flex items-center gap-1 cursor-pointer transition-transform duration-200 hover:scale-125"
                        onClick={() => handleVote(originalIndex, "upvote")}
                      >
                        <FaThumbsUp /> {msg.upvotes || 0}
                      </span>
                      <span
                        className="flex items-center gap-1 cursor-pointer transition-transform duration-200 hover:scale-125"
                        onClick={() => handleVote(originalIndex, "downvote")}
                      >
                        <FaThumbsDown /> {msg.downvotes || 0}
                      </span>
                    </div>
                  </div>
                );
              })}
          </div>

          {/* Message input box */}
          <div className="w-[90vw] mx-auto mt-4 rounded-lg bg-[#202B3C] p-3 relative flex">
            <input
              type="text"
              placeholder="Type a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              className="flex-1 rounded-2xl bg-[#22304E] text-white placeholder-gray-400 p-3 focus:outline-none"
            />

            <button
              onClick={sendMessage}
              className="ml-2 p-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white cursor-pointer transition-all duration-200"
            >
              <FaPaperPlane />
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Community;
