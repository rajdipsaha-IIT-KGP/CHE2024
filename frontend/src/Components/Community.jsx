import React, { useState } from "react";
import {  FaPaperPlane } from "react-icons/fa";

const Community = () => {
  const [newMessage, setNewMessage] = useState("");

  const sendMessage = () => {
    if (newMessage.trim()) {
      console.log("Sending message:", newMessage);
      setNewMessage("");
    }
  };

  return (
    <div className="min-h-screen font-sans bg-gray-900 text-white">
      {/* Chat Area */}
      <div className="h-[80vh] w-[90vw] mx-auto mt-4 rounded-lg  bg-gray-900 p-4 overflow-y-auto">
        <p className="text-center text-gray-400 mt-40">Messages will appear here</p>
      </div>

      {/* Input Box */}
      <div className="w-[90vw] mx-auto mt-4 rounded-lg bg-[#202B3C] p-3 relative">
       
       

        
        <input
          type="text"
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          className="pl-12 pr-16 w-full rounded-2xl bg-[#22304E] text-white placeholder-gray-400 p-3 focus:outline-none"
        />

        {/* Send Button */}
        <button
          onClick={sendMessage}
          className="absolute right-3 top-1/2 -translate-y-1/2 p-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white"
        >
          <FaPaperPlane />
        </button>
      </div>
    </div>
  );
};

export default Community;
