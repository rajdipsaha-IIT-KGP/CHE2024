import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async () => {
    if (!email || !password || !username) {
      toast.error("Please fill all the fields");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post("https://che2024.onrender.com/signup", {
        email, username, password 
      });

      toast.success(res.data.message);

      // Save signup email (optional)
      localStorage.setItem("email", email);
      if(res.data.token) localStorage.setItem("token", res.data.token);

      // Redirect to signin after short delay
      setTimeout(() => navigate("/signin"), 1500);

    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Network Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-screen relative flex items-center justify-center text-white overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700" />

      <div className="w-full max-w-md p-10 bg-gray-800/90 backdrop-blur-lg rounded-3xl shadow-2xl z-10">
        <h2 className="text-3xl font-bold text-center mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">
          CHE 2024 - Sign Up
        </h2>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Enter your username"
            className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 placeholder-gray-300 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 placeholder-gray-300 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 placeholder-gray-300 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

           <button
  onClick={handleSignup}
  disabled={loading}
  className="w-full py-3 rounded-lg bg-gradient-to-r from-blue-500 to-blue-700 disabled:opacity-50 flex items-center justify-center"
>
  {loading ? (
    <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
  ) : (
    "Sign Up"
  )}
</button>

          <p className="text-center text-gray-300 mt-6">
            Already have an account?{' '}
            <span
              className="text-blue-400 hover:text-blue-600 cursor-pointer font-semibold"
              onClick={() => navigate('/signin')}
            >
              Sign In
            </span>
          </p>
        </div>
      </div>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default Signup;
