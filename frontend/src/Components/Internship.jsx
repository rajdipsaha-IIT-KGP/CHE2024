import React from "react";
import { Typewriter } from "react-simple-typewriter";
import { FaDownload } from "react-icons/fa";

const Internship = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center px-6 py-10">
      
      {/* HEADING */}
      <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-10
        bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">
        <Typewriter
          words={["Internship Blogs - CHE 2024"]}
          loop={1}
          cursor
          cursorStyle="|"
          typeSpeed={150}
          deleteSpeed={80}
          delaySpeed={3000}
        />
      </h1>

      {/* PDF DOWNLOAD CARD */}
      <div className="group relative bg-gray-800 border border-gray-700 rounded-2xl p-6
                       cursor-pointer transition-all duration-300
                       hover:scale-105 hover:border-blue-500 hover:shadow-xl hover:shadow-blue-500/20">

        <h2 className="text-2xl font-semibold mb-4 text-center">
          Internpedia 2025
        </h2>
        <p className="text-gray-300 mb-6 text-center">
          Download the complete internship guide for CHE 2025.
        </p>
        <a
          href="/INTERNPEDIA_2025.pdf" 
          download = "INTERNPEDIA_2025.pdf"
          className="flex items-center px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-lg text-white font-semibold transition-all cursor-pointer justify-center"
        >
          <FaDownload className="mr-2" /> Download PDF
        </a>
      </div>

    </div>
  );
};

export default Internship;
