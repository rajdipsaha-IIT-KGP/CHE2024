import React, { useState, useRef, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { FaBars, FaUserCircle } from "react-icons/fa";
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
import Forgot from "./Components/Forgot"
import Profile from "./Components/Profile"
import toast, { Toaster } from "react-hot-toast";

;

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const navigate = useNavigate();
  const sidebarRef = useRef();
  const userMenuRef = useRef();

  useOnClickOutside(sidebarRef, () => setSidebarOpen(false));
  useOnClickOutside(userMenuRef, () => setUserMenuOpen(false));

  const loginStatus = () => {
    let token = localStorage.getItem("token");
    if (!token) toast.error("Please login first");
  };

  // ✅ Show welcome info toast on page load
  
  const handleNavigation = (path) => {
    navigate(path);
    setSidebarOpen(false);
    setUserMenuOpen(false);
  };

  const handleProfileNavigation = () => {
    let token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login first");
      navigate("/signin");
      toast("Redirecting to Sign In page...", {
        icon: "➡️",
        style: {
          background: "#1e293b",
          color: "#93c5fd",
        },
      });
      return;
    }
    handleNavigation("/my-profile");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white overflow-x-hidden relative">
      {/* Global Hot Toast setup */}
      <Toaster
        position="bottom-left"
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

      {/* Top Bar */}
      <header
        ref={userMenuRef}
        className="sticky top-0 z-40 flex justify-between items-center p-5 md:p-6 bg-gray-900/80 backdrop-blur-md"
      >
        {/* Hamburger */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="text-2xl text-gray-300 hover:text-blue-400 transition-colors duration-300 cursor-pointer"
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
            className={`absolute right-0 mt-3 w-48 bg-gray-800/80 backdrop-blur-lg rounded-lg shadow-xl text-gray-200 overflow-auto ring-1 ring-white/10 transition-all duration-300 ease-in-out ${
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
              onClick={handleProfileNavigation}
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
        <ul className="flex flex-col p-4 space-y-2 my-15">
          <li
            onClick={() => handleNavigation("/")}
            className="hover:bg-blue-600/20 px-3 py-2 rounded cursor-pointer text-center"
          >
            Home
          </li>
          <li
            onClick={() => handleNavigation("/pyq")}
            className="hover:bg-blue-600/20 px-3 py-2 rounded cursor-pointer text-center"
          >
            PYQ Archive
          </li>
          <li
            onClick={() => handleNavigation("/community")}
            className="hover:bg-blue-600/20 px-3 py-2 rounded cursor-pointer text-center"
          >
            Community
          </li>
          <li
            onClick={() => handleNavigation("/material")}
            className="hover:bg-blue-600/20 px-3 py-2 rounded cursor-pointer text-center"
          >
            Study Material
          </li>
          <li
            onClick={() => handleNavigation("/elective")}
            className="hover:bg-blue-600/20 px-3 py-2 rounded cursor-pointer text-center"
          >
            Elective
          </li>
           <li
            onClick={() => handleNavigation("/internship-blogs")}
            className="hover:bg-blue-600/20 px-3 py-2 rounded cursor-pointer text-center"
          >
            Internship Blogs
          </li>
          <div className="border-t border-white/20 " />
          <li
            onClick={() => handleNavigation("/about")}
            className="hover:bg-blue-600/20 px-3 py-2 rounded cursor-pointer text-center font-bold"
          >
            About Us
          </li>
        </ul>
      </aside>

      {/* Main content */}
      <main className="flex-1 flex flex-col items-center px-4 w-full">
        <Routes>
          <Route
            path="/"
            element={
              <div className="flex flex-col items-center justify-center text-center space-y-6 max-w-xl">
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

                <p className="text-gray-300 text-lg">
                  <Typewriter
                    words={[
                      "Join the ultimate platform for IIT KGP juniors.",
                      "Access lectures, previous year questions, and formula sheets.",
                      "Participate in discussions and community events.",
                      "Prepare effectively for placements with senior tips.",
                    ]}
                    loop={0}
                    cursor
                    cursorStyle="|"
                    typeSpeed={80}
                    deleteSpeed={50}
                    delaySpeed={2500}
                  />
                </p>

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
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/verify-otp" element={<Verifyotp />} />
          <Route path="/pyq" element={<PYQ />} />
          <Route path="/about" element={<About />} />
          <Route path="/elective" element={<Elective />} />
          <Route path="/community" element={<Community />} />
          <Route path="/internship-blogs" element={<Internship />} />
          <Route path="/forgot-password" element={<Forgot/>}/>
          <Route path="/my-profile" element = {<Profile/>}/>
        </Routes>
      </main>

      <Footer />
    </div>
  );
}
