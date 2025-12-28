import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Profile = () => {
  // Change Email
  const [username, setUsername] = useState("");
  const [passwordEmail, setPasswordEmail] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [loadingEmail, setLoadingEmail] = useState(false);

  // Change Username
  const [email, setEmail] = useState("");
  const [passwordUsername, setPasswordUsername] = useState("");
  const [newUsername, setNewUsername] = useState("");
  const [loadingUsername, setLoadingUsername] = useState(false);

  const changeEmail = async () => {
    if (!username || !passwordEmail || !newEmail) {
      toast.error("All fields are required");
      return;
    }

    try {
      setLoadingEmail(true);
      await axios.post("https://che2024.onrender.com/change-email", {
        username,
        password: passwordEmail,
        email:newEmail,
      });
      toast.success("Email updated successfully");
      setNewEmail("");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to change email");
    } finally {
      setLoadingEmail(false);
    }
  };

  const changeUsername = async () => {
    if (!email || !passwordUsername || !newUsername) {
      toast.error("All fields are required");
      return;
    }

    try {
      setLoadingUsername(true);
      await axios.post("https://che2024.onrender.com/change-username", {
        email,
        password: passwordUsername,
        username:newUsername,
      });
      toast.success("Username updated successfully");
      setNewUsername("");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to change username");
    } finally {
      setLoadingUsername(false);
    }
  };

  return (
    <div>
       <h1 className="text-5xl md:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600 text-center">My Profile</h1>
    <div className="min-h-screen flex items-center justify-center ">
     
      <ToastContainer />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl">

        {/* Change Email */}
        <div className="p-8 bg-gray-800/90 rounded-3xl shadow-2xl">
          <h2 className="text-2xl font-bold text-center mb-6 text-blue-400">
            Change Email
          </h2>

          <div className="space-y-4">
            <input
              type="text"
              placeholder="Username"
              className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600"
              value={passwordEmail}
              onChange={(e) => setPasswordEmail(e.target.value)}
            />

            <input
              type="email"
              placeholder="New Email"
              className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
            />

            <button
              onClick={changeEmail}
              disabled={loadingEmail}
              className="w-full py-3 rounded-lg bg-gradient-to-r from-blue-500 to-blue-700 flex justify-center items-center disabled:opacity-50"
            >
              {loadingEmail ? (
                <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                "Update Email"
              )}
            </button>
          </div>
        </div>

        {/* Change Username */}
        <div className="p-8 bg-gray-800/90 rounded-3xl shadow-2xl">
          <h2 className="text-2xl font-bold text-center mb-6 text-blue-400">
            Change Username
          </h2>

          <div className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600"
              value={passwordUsername}
              onChange={(e) => setPasswordUsername(e.target.value)}
            />

            <input
              type="text"
              placeholder="New Username"
              className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600"
              value={newUsername}
              onChange={(e) => setNewUsername(e.target.value)}
            />

            <button
              onClick={changeUsername}
              disabled={loadingUsername}
              className="w-full py-3 rounded-lg bg-gradient-to-r from-blue-500 to-blue-700 flex justify-center items-center disabled:opacity-50"
            >
              {loadingUsername ? (
                <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                "Update Username"
              )}
            </button>
          </div>
        </div>

      </div>
    </div>
   

    </div>
  );
};

export default Profile;
