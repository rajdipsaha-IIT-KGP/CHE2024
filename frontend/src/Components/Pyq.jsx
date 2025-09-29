import React from "react";
import { Typewriter } from "react-simple-typewriter";
import Dropdown from "./Dropdown";


const Pyq = () => {
  const years = [{
    name: "1st Year",
    semesters: [
      {
        name: "Semester 1",
        subjects: [
          { name: "Advanced Calculus", link: "https://drive.google.com/maths-link" },
          { name: "Basic Engineering Mechanics", link: "https://drive.google.com/physics-link" },
          {
            name:"Chemical Process Calculations",
            link:"https://drive.google.com/chem-process-link"
          },
          {
            name:"Basic Electronics",
            link:"https://drive.google.com/electronics-link"
          },
        ],
      },
      {
        name: "Semester 2",
        subjects: [
          { name: "1.PROGRAMMING AND DATA STRUCTURES", link: "https://drive.google.com/chem-link" },
          { name: "2.LINEAR ALGEBRA, NUMERICAL AND COMPLEX ANALYSIS", link: "https://drive.google.com/bio-link" },
           { name: "3.ELECTRICAL TECHNOLOGY", link: "https://drive.google.com/bio-link" },
            { name: "4.CHEMICAL ENGINEERING THERMODYNAMICS", link: "https://drive.google.com/bio-link" },
        ],
      },
    ],
  },
  {
    name: "2nd Year",
    semesters: [
      {
        name: "Semester 3",
        subjects: [
          { name: "Thermodynamics", link: "https://drive.google.com/thermo-link" },
          { name: "Fluid Mechanics", link: "https://drive.google.com/fluid-link" },
        ],
      },
      {
        name: "Semester 4",
        subjects: [
          { name: "Material Science", link: "https://drive.google.com/material-link" },
        ],
      },
    ],
  },
  {
    name: "3rd Year",
    semesters: [
      {
        name: "Semester 5",
        subjects: [
          { name: "Thermodynamics", link: "https://drive.google.com/thermo-link" },
          { name: "Fluid Mechanics", link: "https://drive.google.com/fluid-link" },
        ],
      },
      {
        name: "Semester 6",
        subjects: [
          { name: "Material Science", link: "https://drive.google.com/material-link" },
        ],
      },
    ],
  },
  {
    name: "4th Year",
    semesters: [
      {
        name: "Semester 7",
        subjects: [
          { name: "Thermodynamics", link: "https://drive.google.com/thermo-link" },
          { name: "Fluid Mechanics", link: "https://drive.google.com/fluid-link" },
        ],
      },
      {
        name: "Semester 8",
        subjects: [
          { name: "Material Science", link: "https://drive.google.com/material-link" },
        ],
      },
    ],
  },
]

  return (
    <div className="flex flex-col items-center text-white w-full max-w-md mx-auto mt-0">
      {/* Heading */}
      <h4 className="mt-0 text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600 mb-4">
        <Typewriter
          words={["PYQ Archive"]}
          loop={1}
          cursor
          cursorStyle="|"
          typeSpeed={150}
          deleteSpeed={80}
          delaySpeed={3000}
        />
      </h4>

      {/* Dropdown */}
      <div className="w-full ">
        {years.map((year, yIndex) => (
          <Dropdown key={yIndex} title={year.name}>
            {year.semesters.map((sem, sIndex) => (
              <Dropdown key={sIndex} title={sem.name}>
                <ul className="pl-4 space-y-2 text-sm text-gray-300">
                  {sem.subjects.map((subj, subIndex) => (
                    <li key={subIndex}>
                      <a
                        href={subj.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-blue-400 transition-colors duration-300 "
                      >
                        {subj.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </Dropdown>
            ))}
          </Dropdown>
        ))}
      </div>
    </div>
  );
};

export default Pyq;
