import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const Signin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const SignIn = async () => {
    if (!email || !password) {
      toast.error("Fill up all the fields");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post("https://che2024.onrender.com/signin", {
        email,
        password,
      });

      if (res.data.message === "User signed in successfully") {
        toast.success(res.data.message);
        localStorage.setItem("userEmail", email);
        localStorage.setItem("token", res.data.token);
        
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      console.error(err);
      toast.error("Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-screen relative flex items-center justify-center text-white overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700" />

      {/* Form */}
      <div className="w-full max-w-md p-10 bg-gray-800/90 backdrop-blur-lg rounded-3xl shadow-2xl z-10">
        <h2 className="text-3xl font-bold text-center mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">
          CHE 2024 - Sign In
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
           <div className="text-right">
  <span
    className="text-sm text-blue-400 hover:text-blue-600 cursor-pointer"
    onClick={() => navigate('/forgot-password')}
  >
    Forgot Password?
  </span>
</div>

          <button
            onClick={SignIn}
            disabled={loading}
            className="w-full py-3 rounded-lg bg-gradient-to-r from-blue-500 to-blue-700 disabled:opacity-50"
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </div>

        <p className="text-center text-gray-300 mt-6">
          Don't have an account?{' '}
          <span
            className="text-blue-400 cursor-pointer font-semibold"
            onClick={() => navigate('/signup')}
          >
            Sign Up
          </span>
        </p>
       
      </div>

      {/* Toast Container */}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default Signin;
