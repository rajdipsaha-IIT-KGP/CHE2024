// src/Components/Home.jsx

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-8 -mt-10">
      
      {/* Gradient Main Heading */}
      <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
        DSA Engine
      </h1>
      
      {/* Subheading */}
      <p className="mt-4 text-lg md:text-xl text-gray-400 max-w-2xl">
        Your all-in-one platform for mastering Data Structures and Algorithms
      </p>

      {/* Buttons Container */}
      <div className="mt-8 flex flex-col sm:flex-row items-center gap-4">
        
        {/* Primary Button */}
        <button className="px-8 py-3 font-semibold text-white bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg shadow-lg hover:scale-105 transform transition-transform duration-300">
          Get Started
        </button>
        
        {/* Secondary (Ghost) Button */}
        <button className="px-8 py-3 font-semibold text-gray-300 bg-transparent border-2 border-gray-500 rounded-lg hover:border-white hover:text-white transition-colors duration-300">
          Learn More
        </button>
      </div>
    </div>
  );
}