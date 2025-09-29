// src/Pages/About.jsx
import React from "react";
import { motion } from "framer-motion";
import { FaUsers, FaBook, FaRocket, FaChartLine, FaGlobe } from "react-icons/fa";

const About = () => {
  return (
    <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white min-h-screen p-8">
      {/* Hero Section */}
      <motion.div
        className="text-center max-w-4xl mx-auto py-16"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-3xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">About CHE 2024</h1>
        <p className="text-lg text-gray-300">
          A community-driven platform for IIT KGP juniors to access resources,
          connect, and grow together.
        </p>
      </motion.div>

      {/* Mission Section */}
      <motion.div
        className="grid md:grid-cols-3 gap-6 text-center mt-10"
        initial="hidden"
        animate="show"
        variants={{
          hidden: { opacity: 0, y: 30 },
          show: { opacity: 1, y: 0, transition: { staggerChildren: 0.2 } },
        }}
      >
        <motion.div
          className="bg-gray-800 p-6 rounded-2xl shadow-lg"
          whileHover={{ scale: 1.05 }}
        >
          <FaBook className="text-4xl text-blue-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold">Resources</h3>
          <p className="text-gray-400 mt-2">
            Access NPTEL lectures, PYQs, formula sheets, and placement guides.
          </p>
        </motion.div>

        <motion.div
          className="bg-gray-800 p-6 rounded-2xl shadow-lg"
          whileHover={{ scale: 1.05 }}
        >
          <FaUsers className="text-4xl text-green-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold">Community</h3>
          <p className="text-gray-400 mt-2">
            Collaborate through discussion forums and mentorship chats.
          </p>
        </motion.div>

        <motion.div
          className="bg-gray-800 p-6 rounded-2xl shadow-lg"
          whileHover={{ scale: 1.05 }}
        >
          <FaRocket className="text-4xl text-pink-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold">Growth</h3>
          <p className="text-gray-400 mt-2">
            Prepare for academics and placements with structured guidance.
          </p>
        </motion.div>
      </motion.div>

      {/* Timeline Section */}
      <div className="mt-20">
        <h2 className="text-3xl font-bold text-center mb-10">Our Journey</h2>
        <div className="relative max-w-3xl mx-auto">
          <div className="border-l-2 border-gray-700 absolute h-full left-8 top-0"></div>
          <ul className="space-y-12 space-x-2">
            {[
              { year: "Phase 1", text: "Core website with subject-wise uploads" },
              { year: "Phase 2", text: "Community features with forums & chat" },
              { year: "Phase 3", text: "Placement guide & senior experiences" },
              { year: "Phase 4", text: "Gamification, AI & advanced features" },
            ].map((item, i) => (
              <motion.li
                key={i}
                className="ml-12 relative"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
              >
                <span className="absolute left-[-2.1rem] top-1 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-sm font-bold">
                  {i + 1}
                </span>
                <h3 className="text-xl font-semibold">{item.year}</h3>
                <p className="text-gray-400">{item.text}</p>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>

      {/* Stats & Highlights Section */}
      <div className="mt-20 text-center">
        <h2 className="text-3xl font-bold mb-10">Impact at a Glance</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {[
            { number: "200+", label: "Resources", icon: <FaBook /> },
            { number: "50+", label: "Subjects", icon: <FaGlobe /> },
            { number: "1000+", label: "Downloads", icon: <FaChartLine /> },
            { number: "∞", label: "Community Support", icon: <FaUsers /> },
          ].map((stat, i) => (
            <motion.div
              key={i}
              className="p-6 rounded-2xl bg-gray-800 shadow-lg flex flex-col items-center"
              whileHover={{ scale: 1.05 }}
            >
              <div className="text-4xl text-blue-400 mb-3">{stat.icon}</div>
              <h3 className="text-3xl font-bold">{stat.number}</h3>
              <p className="text-gray-300 mt-2">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
