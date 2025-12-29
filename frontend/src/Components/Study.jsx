import { FaBookOpen } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
export default function Study() {
  const navigate = useNavigate();
const topics = [
  { name: "Chemical Process Calculations", slug: "cpc" },
  { name: "Thermodynamics", slug: "thermodynamics" },
  { name: "Mass Transfer", slug: "mass-transfer" },
  { name: "Mechanical Operations", slug: "mechanical-operations" },
  { name: "Fluid Mechanics", slug: "fluid-mechanics" },
  { name: "Heat Transfer", slug: "heat-transfer" },
  { name: "Chemical Reaction Engineering", slug: "cre" },
  { name: "Instrumentation and Control", slug: "instrumentation-control" },
  { name: "Process Dynamics", slug: "process-dynamics" },
];


  return (
    <div className="min-h-screen bg-gray-900 text-white px-6 py-10">

      {/* HEADING */}
      <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-12
        bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">
        NPTEL – Chemical Engineering
      </h1>

      {/* TOPIC GRID */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

        {topics.map((topic, index) => (
          <div
            key={index}
            className="group relative bg-gray-800 border border-gray-700 rounded-2xl p-6
                       cursor-pointer transition-all duration-300
                       hover:scale-105 hover:border-blue-500 hover:shadow-xl hover:shadow-blue-500/20 " onClick={() => navigate(`/study/${topic.slug}`)}

          >

            {/* Glow Effect */}
            <div className="absolute inset-0 rounded-2xl bg-blue-500/10 opacity-0 
                            group-hover:opacity-100 transition" />

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center space-y-4">
              <FaBookOpen className="text-4xl text-blue-400 group-hover:text-blue-500 transition" />
              <h2 className="text-xl font-semibold text-center">
                {topic.name}
              </h2>
            </div>
          </div>
        ))}

      </div>
    </div>
  );
}
