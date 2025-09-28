// src/Components/Footer.jsx
import React from 'react';
import { FaInstagram, FaEnvelope, FaGithub } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="w-full bg-gray-900/90 backdrop-blur-md text-gray-300 border-t border-gray-700 flex flex-col items-center justify-center px-6 py-6 fixed bottom-0 z-50 space-y-3">
      {/* Made by text */}
      <div className="text-base font-medium">
        Made with ❤️ by Rajdip
      </div>

      {/* Social Icons in a row */}
      <div className="flex flex-row items-center space-x-4 text-2xl">
        <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" className="hover:text-pink-500 transition-colors">
          <FaInstagram />
        </a>
        <a href="mailto:youremail@example.com" className="hover:text-yellow-400 transition-colors">
          <FaEnvelope />
        </a>
        <a href="https://github.com/" target="_blank" rel="noopener noreferrer" className="hover:text-gray-100 transition-colors">
          <FaGithub />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
