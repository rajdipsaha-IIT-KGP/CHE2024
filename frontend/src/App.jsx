import React, { useState, useRef } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { FaBars, FaUserCircle } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Signup from "./Components/Signup";
import Signin from "./Components/Signin";
import Verifyotp from "./Components/Verifyotp";
import Footer from "./Components/Footer";
import { useOnClickOutside } from "./useOnClickOutside";
import { Typewriter } from "react-simple-typewriter";
import PYQ from "./Components/Pyq";
import About from "./Components/About";
import Community from "./Components/Community";
import Internship from "./Components/Internship";
import Elective from "./Components/Elective";
import Forgot from "./Components/Forgot";
import Profile from "./Components/Profile";
import Study from "./Components/Study";
export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const navigate = useNavigate();

  const sidebarRef = useRef();
  const userMenuRef = useRef();

  useOnClickOutside(sidebarRef, () => setSidebarOpen(false));
  useOnClickOutside(userMenuRef, () => setUserMenuOpen(false));

  const handleNavigation = (path) => {
    navigate(path);
    setSidebarOpen(false);
    setUserMenuOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white overflow-x-hidden">

      {/* ✅ Toast Container */}
      <ToastContainer
        position="top-center"
        autoClose={2000}
        theme="dark"
      />

      {/* =================== TOP BAR =================== */}
      <header
        ref={userMenuRef}
        className="sticky top-0 z-40 flex justify-between items-center p-5 bg-gray-900/80 backdrop-blur-md"
      >
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="text-2xl text-gray-300 hover:text-blue-400"
        >
          <FaBars />
        </button>

        {/* User Menu */}
        <div className="relative">
          <button onClick={() => setUserMenuOpen(!userMenuOpen)}>
            <FaUserCircle className="text-4xl text-gray-300 hover:text-blue-400" />
          </button>

          <div
            className={`absolute right-0 mt-3 w-48 bg-gray-800 rounded-lg shadow-xl transition-all ${
              userMenuOpen
                ? "opacity-100 translate-y-0"
                : "opacity-0 -translate-y-4 pointer-events-none"
            }`}
          >
            <p
              onClick={() => handleNavigation("/signin")}
              className="px-4 py-3 text-center hover:bg-blue-600/20 cursor-pointer"
            >
              Sign In
            </p>
            <p
              onClick={() => handleNavigation("/signup")}
              className="px-4 py-3 text-center hover:bg-blue-600/20 cursor-pointer"
            >
              Sign Up
            </p>
            <p
              onClick={() => {
                if (!localStorage.getItem("token")) {
                  toast.error("Login first");
                  return;
                }
                navigate("/my-profile");
              }}
              className="px-4 py-3 text-center hover:bg-blue-600/20 cursor-pointer"
            >
              My Profile
            </p>
            <p
              onClick={() => navigate("/forgot-password")}
              className="px-4 py-3 text-center hover:bg-blue-600/20 cursor-pointer"
            >
              Change Password
            </p>
            <p
              onClick={() => {
                const token = localStorage.getItem("token");
                if (!token) {
                  toast.error("Already logged out");
                  return;
                }

                localStorage.clear();
                toast.success("Logout successful");

                setTimeout(() => {
                  navigate("/signin");
                }, 1500);
              }}
              className="px-4 py-3 text-center hover:bg-blue-600/20 cursor-pointer"
            >
              Logout
            </p>
          </div>
        </div>
      </header>

      {/* =================== SIDEBAR =================== */}
      <aside
        ref={sidebarRef}
        className={`fixed top-0 left-0 h-full w-64 bg-gray-900/90 backdrop-blur-lg transform transition-transform z-50 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <ul className="flex flex-col p-4 space-y-2 mt-20">
          {[
            ["Home", "/"],
            ["PYQ Archive", "/pyq"],
            ["Community", "/community"],
            ["Study Material", "/study"],
            ["Elective", "/elective"],
            ["Internship Blogs", "/internship-blogs"],
            ["About Us", "/about"],
          ].map(([label, path]) => (
            <li
              key={path}
              onClick={() => handleNavigation(path)}
              className="hover:bg-blue-600/20 px-3 py-2 rounded cursor-pointer text-center"
            >
              {label}
            </li>
          ))}
        </ul>
      </aside>

      {/* =================== MAIN =================== */}
      <main className="flex-1 flex flex-col items-center px-4 w-full">
        <Routes>

          {/* HOME */}
          <Route
            path="/"
            element={
              <div className="flex flex-col items-center justify-center text-center space-y-6 max-w-xl mt-20">
                <h1 className="text-5xl md:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">
                  <Typewriter
                    words={["Welcome to CHE 2024"]}
                    loop={1}
                    cursor
                    typeSpeed={150}
                    deleteSpeed={80}
                    delaySpeed={3000}
                  />
                </h1>

                <p className="text-gray-300 text-lg">
                  <Typewriter
                    words={[
                      "Join the ultimate platform for IIT KGP juniors.",
                      "Access lectures, PYQs, and formula sheets.",
                      "Participate in discussions and community events.",
                      "Prepare effectively for placements.",
                    ]}
                    loop={0}
                    cursor
                    typeSpeed={80}
                    deleteSpeed={50}
                    delaySpeed={2500}
                  />
                </p>

                {/* BUTTONS */}
                
                <div className="flex space-x-4 mt-4">
<button
  onClick={() => handleNavigation("/signup")}
  className="relative px-6 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-blue-700 
             hover:from-blue-600 hover:to-blue-800 font-semibold text-white overflow-hidden"
>
  Get Started
  
  <span className="absolute top-0 left-0 w-16 h-full bg-white opacity-30 -skew-x-20 animate-[shine_2s_linear_infinite] pointer-events-none"></span>

</button>

                  <button
                    onClick={() => handleNavigation("/about")}
                    className="px-6 py-3 rounded-lg border border-blue-500 text-blue-400 hover:text-white hover:bg-blue-600 font-semibold transition-all"
                  >
                    Learn More
                  </button>
                </div>
              </div>
            }
          />

          {/* ROUTES */}
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/verify-otp" element={<Verifyotp />} />
          <Route path="/pyq" element={<PYQ />} />
          <Route path="/about" element={<About />} />
          <Route path="/community" element={<Community />} />
          <Route path="/elective" element={<Elective />} />
          <Route path="/internship-blogs" element={<Internship />} />
          <Route path="/forgot-password" element={<Forgot />} />
          <Route path="/my-profile" element={<Profile />} />
          <Route path="/study" element={<Study/>} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}
