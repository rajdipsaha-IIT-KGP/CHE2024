import React, { useRef } from "react";
import toast from "react-hot-toast";

const SwipeToast = ({ message, t }) => {
  const startX = useRef(null);

  const handleTouchStart = (e) => {
    startX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    if (startX.current === null) return;
    const diff = e.touches[0].clientX - startX.current;

    // Swipe more than 80px → dismiss
    if (Math.abs(diff) > 80) {
      toast.dismiss(t.id);
    }
  };

  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      className="select-none"
    >
      {message}
    </div>
  );
};

export default SwipeToast;
