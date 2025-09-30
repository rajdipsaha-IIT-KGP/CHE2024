import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const Verifyotp = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const storedEmail = localStorage.getItem('signupEmail');
    if (!storedEmail) {
      toast.error("Please signup first");
      return;
    }
    setEmail(storedEmail);
  }, []);

  const verifyOtp = async () => {
    if (!otp) return toast.error("Fill up the OTP field");

    try {
      setLoading(true);
      const res = await axios.post("https://che2024.onrender.com/user/signup/verify-otp", {
        email,
        otp,
      });

      if (res.data.message === "User verified and created successfully") {
        toast.success(res.data.message);
        localStorage.removeItem('signupEmail');
        // navigate("/signin"); 
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      console.log(err);
      toast.error("OTP verification failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center ">
      <div className="w-full max-w-md p-8 bg-gray-900/80 backdrop-blur-md rounded-2xl shadow-xl text-white">
        <h2 className="text-3xl font-bold text-center mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">
          Verify OTP
        </h2>

        <div className="space-y-4">
          <input
            type="email"
            value={email}
            disabled
            className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-gray-400 cursor-not-allowed"
          />

          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
  
          <button
            onClick={verifyOtp}
            disabled={loading}
            className="w-full py-3 rounded-lg bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 transition-all duration-300 font-semibold text-white disabled:opacity-50"
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>
        </div>
      </div>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default Verifyotp;
