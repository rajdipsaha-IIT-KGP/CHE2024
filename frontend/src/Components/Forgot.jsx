import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const Forgot = () => {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const Reset = async () => {
    if (!email || !newPassword) {
      return toast.error("All fields required");
    }

    try {
      setLoading(true);

      const res = await axios.post(
        'http://localhost:3000/forgot-password',
        {
          email,
          newPass: newPassword, 
        }
      );

      toast.success(res.data.message);

      
      setTimeout(() => navigate('/signin'), 3000);

    } catch (err) {
      if (err.response?.data?.message) {
        toast.error(err.response.data.message);
      } else {
        toast.error("Something went wrong");
      }
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
          CHE 2024 - Reset Password
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
            placeholder="New Password"
            className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />

          <button
  onClick={Reset}
  disabled={loading}
  className="w-full py-3 rounded-lg bg-gradient-to-r from-blue-500 to-blue-700 flex items-center justify-center disabled:opacity-50"
>
  {loading ? ( 
    <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
  ) : (
    "Reset Password"
  )}
</button>

        </div>
      </div>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default Forgot;
