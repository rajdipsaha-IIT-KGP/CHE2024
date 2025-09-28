// src/App.jsx
import React, { useState, useRef } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { FaBars, FaUserCircle, FaTimes } from "react-icons/fa";
import Signup from "./Components/Signup";
import Signin from "./Components/Signin";
import Verifyotp from "./Components/Verifyotp";
import Footer from "./Components/Footer";
import { useOnClickOutside } from "./useOnClickOutside";
import { Typewriter } from "react-simple-typewriter";

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
    <div className="h-screen w-screen text-white overflow-hidden relative bg-gray-900">
      {/* Gradient background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700" />

      {/* Top Bar */}
      <header
        ref={userMenuRef}
        className="sticky top-0 z-40 flex justify-between items-center p-5 md:p-6 bg-gray-900/80 backdrop-blur-md"
      >
        {/* Hamburger */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="text-2xl text-gray-300 hover:text-blue-400 transition-colors duration-300"
        >
          <FaBars />
        </button>

        {/* User Menu */}
        <div className="relative">
          <button onClick={() => setUserMenuOpen(!userMenuOpen)}>
            <FaUserCircle className="text-4xl text-gray-300 hover:text-blue-400 transition-colors duration-300 cursor-pointer" />
          </button>

          {/* Dropdown */}
          <div
            className={`absolute right-0 mt-3 w-48 bg-gray-800/80 backdrop-blur-lg rounded-lg shadow-xl text-gray-200 overflow-hidden ring-1 ring-white/10 transition-all duration-300 ease-in-out ${
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
            <div className="border-t border-white/20" />
            <p
              onClick={() => handleNavigation("/signup")}
              className="px-4 py-3 text-center hover:bg-blue-600/20 cursor-pointer"
            >
              Sign Up
            </p>
            <div className="border-t border-white/20" />
            <p
              onClick={() => handleNavigation("/my-profile")}
              className="px-4 py-3 text-center hover:bg-blue-600/20 cursor-pointer"
            >
              My Profile
            </p>
          </div>
        </div>
      </header>

      {/* Sidebar */}
      <aside
        ref={sidebarRef}
        className={`fixed top-0 left-0 h-full w-64 bg-gray-900/80 backdrop-blur-lg ring-1 ring-white/10 transform transition-transform duration-300 ease-in-out z-50 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center p-4 border-b border-white/10">
          <h2 className="text-2xl font-bold">Menu</h2>
          <button
            onClick={() => setSidebarOpen(false)}
            className="text-2xl text-gray-300 hover:text-blue-400"
          >
            <FaTimes />
          </button>
        </div>
        <ul className="flex flex-col p-4 space-y-2">
          <li
            onClick={() => handleNavigation("/")}
            className="hover:bg-blue-600/20 px-3 py-2 rounded cursor-pointer transition-colors"
          >
            Home
          </li>
          <li
            onClick={() => handleNavigation("/pyq")}
            className="hover:bg-blue-600/20 px-3 py-2 rounded cursor-pointer transition-colors"
          >
            PYQ Archive
          </li>
          <li
            onClick={() => handleNavigation("/community")}
            className="hover:bg-blue-600/20 px-3 py-2 rounded cursor-pointer transition-colors"
          >
            Community
          </li>
          <li
            onClick={() => handleNavigation("/material")}
            className="hover:bg-blue-600/20 px-3 py-2 rounded cursor-pointer transition-colors"
          >
            Study Material
          </li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="h-[calc(100vh-76px)] overflow-y-auto flex flex-col items-center justify-center px-4">
        <Routes>
          {/* Default Home */}
          <Route
            path="/"
            element={
              <div className="flex flex-col items-center justify-center text-center space-y-6 max-w-xl">
                {/* Animated title */}
                <h1 className="text-5xl md:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">
                  <Typewriter
                    words={["Welcome to CHE 2024"]}
                    loop={1}
                    cursor
                    cursorStyle="|"
                    typeSpeed={150}
                    deleteSpeed={80}
                    delaySpeed={3000}
                  />
                </h1>

                {/* Animated paragraphs */}
                <p className="text-gray-300 text-lg">
                  <Typewriter
                    words={[
                      "Join the ultimate platform for IIT KGP juniors.",
                      "Access lectures, previous year questions, and formula sheets.",
                      "Participate in discussions and community events.",
                      "Prepare effectively for placements with senior tips."
                    ]}
                    loop={0}
                    cursor
                    cursorStyle="|"
                    typeSpeed={80}
                    deleteSpeed={50}
                    delaySpeed={2500}
                  />
                </p>

                {/* Buttons */}
                <div className="flex space-x-4 mt-4">
                  <button
                    onClick={() => handleNavigation("/signup")}
                    className="px-6 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 font-semibold transition-all"
                  >
                    Get Started
                  </button>
                  <button
                    onClick={() => handleNavigation("/pyq")}
                    className="px-6 py-3 rounded-lg border border-blue-500 text-blue-400 hover:text-white hover:bg-blue-600 font-semibold transition-all"
                  >
                    Learn More
                  </button>
                </div>
              </div>
            }
          />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/verify-otp" element={<Verifyotp />} />
        </Routes>

        <Footer />
      </main>
    </div>
  );
}
