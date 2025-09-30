import React, { useState } from "react";
import Dropdown from "./Dropdown";
import electives from "../data/electives";

const Elective = () => {
  const [search, setSearch] = useState("");

  const filteredElectives = electives.filter((elective) =>
    elective.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      {/* Heading */}
      <div className="text-5xl md:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600 text-center my-8">
        Electives
      </div>

      {/* Search bar */}
      <div className="flex justify-center my-6">
        <input
          type="text"
          placeholder="Search electives..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-3/4 md:w-1/2 px-4 py-2 rounded-2xl shadow-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
        />
      </div>

      {/* Dropdowns */}
      <div className="w-full">
        {filteredElectives.length > 0 ? (
          filteredElectives.map((elective, index) => (
            <Dropdown key={index} title={elective.name}>
              {elective.content.map((content, idx) => (
                <Dropdown key={idx} title={content.name}>
                  <p className="text-white font-bold">{content.description}</p>
                </Dropdown>
              ))}

              {elective.grading.map((grade, ind) => (
                <Dropdown key={ind} title={grade.name}>
                  <p className="text-white font-bold">{grade.description}</p>
                </Dropdown>
              ))}
            </Dropdown>
          ))
        ) : (
          <p className="text-center text-gray-400 mt-6 font-semibold">
            No electives found.
          </p>
        )}
      </div>
    </div>
  );
};

export default Elective;
