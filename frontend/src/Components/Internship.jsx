import React from 'react'
import { Typewriter } from "react-simple-typewriter";
const Internship = () => {
  return (
    <div>
     
       <h1 className="text-5xl md:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">
                        <Typewriter
                          words={["Internship 2025"]}
                          loop={1}
                          cursor
                          cursorStyle="|"
                          typeSpeed={150}
                          deleteSpeed={80}
                          delaySpeed={3000}
                        />
                      </h1>
      
    </div>
  )
}

export default Internship
