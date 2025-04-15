import React, { useState } from "react";

export default function Toggle() {
  const [isOn, setIsOn] = useState(false);

  return (
    <button
      onClick={() => setIsOn(!isOn)}
      className={`w-16 h-8 flex items-center p-1 rounded-full transition duration-300
        ${isOn ? "bg-green-500" : "bg-gray-400"}`}
    >
      <div
        className={`w-6 h-6 bg-white rounded-full shadow-md transform transition 
          ${isOn ? "translate-x-8" : "translate-x-0"}`}
      />
    </button>
  );
}
