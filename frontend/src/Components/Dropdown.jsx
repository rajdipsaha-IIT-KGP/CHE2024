import React, { useState } from "react";

const Dropdown = ({ title, children }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="border border-gray-600 rounded-md mb-3 ">
      <div
        onClick={() => setOpen(!open)}
        className="flex justify-between items-center py-3 px-4 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-300"
      >
        <span className="font-semibold">{title}</span>
        {/* Icon with rotation animation */}
        <span
          className={`text-2xl transform transition-transform duration-300 ${
            open ? "rotate-45" : ""
          }`}
        >
          +
        </span>
      </div>

      {/* Content wrapper for animation */}
      <div
        className={`grid overflow-hidden transition-all duration-500 ease-in-out ${
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="px-4 pb-3 pt-1">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dropdown;