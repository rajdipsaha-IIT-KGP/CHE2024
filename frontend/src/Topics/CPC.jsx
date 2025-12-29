import { useState } from "react";
import { FaYoutube } from "react-icons/fa";

export default function CPC() {
  const lectures = [
    {
      title: "Lecture 1: Introduction to CPC",
      videoId: "prWWHSVQjjc",
    },
    {
      title: "Lecture 2: Different Unit systems: SI, CGS,MKS system",
      videoId: "vghZUvWD3Ss",
    },
    {
      title: "Lecture 3-4:Cocentration of water in a reaction mixture",
      videoId: "pVJlJWdAyWs",
    },
    {
      title: "CPC/ Lecture 05 Conversion of units"
,
      videoId: "4EWmB9JVcBo",
    },
    {
      title: "CPC Lecture 06-08 Empirical Equations Conversion Temperature",

      videoId: "7X3LNoSydQc",
    },
    {
      title: "Lec 09-12 Concept of Mole, Molecular weight, and Density of solutions",

      videoId: "bYW70-nsfGc",
    },
    {
      title: "Lecture 13 Molecular Mass, Equivalent Mass, Mass to Mole conversions",

      videoId: "6YkZhlYgm",
    },
    {
      title: "Lecture 14 Mass density, specific gravity, API Gravity, Barrels of Oil equivalents"
,
      videoId: "5Clv3QDDSu8",
    },
    {
      title: "Lecture 15 Mole Fraction Mass Fraction Composition of Mixtures in Mole and mass basis"
,
      videoId: "OD7HTMAcOAM",
    },
    {
      title: "Lecture 16 AVERAGE MOLECULAR WEIGHT Determination"
,
      videoId: "yh50gsKgeag",
    },
  ];

  const [watched, setWatched] = useState({});
  const [currentVideo, setCurrentVideo] = useState(null);

  const toggleWatched = (index) => {
    setWatched((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white px-6 py-10 border border-gray-700 mb-5 rounded-2xl">

      {/* COURSE TITLE */}
      <h1 className="text-4xl font-extrabold text-center mb-10
        bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">
        Chemical Process Calculations (CPC)
      </h1>

      {/* TABLE */}
      <div className="max-w-6xl mx-auto overflow-x-auto border border-gray-700 rounded-2xl shadow-2xl">
        <table className="w-full border border-gray-700 rounded-2xl overflow-hidden">
          <thead className="bg-gray-800">
            <tr>
             
              <th className="p-4 text-left">Topic</th>
              <th className="p-4 text-center w-20">Watch</th>
            </tr>
          </thead>

          <tbody>
            {lectures.map((lec, index) => (
              <tr
                key={index}
                className={`border-t border-gray-700 hover:bg-gray-800 transition ${
                  currentVideo === lec.videoId ? "bg-gray-800" : ""
                }`}
              >
                {/* CHECKBOX */}
               

                {/* TOPIC NAME */}
                <td className="p-4 text-lg">{lec.title}</td>

                {/* YOUTUBE ICON */}
                <td className="p-4 text-center">
                  <FaYoutube
                    onClick={() => setCurrentVideo(lec.videoId)}
                    className="text-red-500 text-3xl cursor-pointer hover:scale-110 transition"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* VIDEO PLAYER */}
      {currentVideo && (
        <div className="max-w-6xl mx-auto mt-12">
          <div className="aspect-video w-full rounded-2xl overflow-hidden shadow-2xl border border-gray-700">
            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${currentVideo}`}
              title="CPC Lecture"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </div>
  );
}
