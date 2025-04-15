import { useState } from "react";
import React from 'react'
import { GrLocation } from "react-icons/gr";
import { FaAngleDown } from "react-icons/fa";
import { WiDegrees } from "react-icons/wi";

const Weather = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className='bg-gray-500 rounded-xl' >
      <div className="location flex justify-between items-center text-white">
        <div className=''>
          <GrLocation className='' />
          <span>Swat, Pakistan</span>
        </div>
        <div className="relative inline-block">
          {/* Dropdown Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="px-2 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          > 
            <WiDegrees className="text-5xl" />
            <FaAngleDown />
          </button>

          <div
            className={`absolute left-0 mt-2 w-40 bg-white shadow-lg rounded-md overflow-hidden transition-all duration-300 ${
              isOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
            }`}
          >
            <ul className="text-gray-800">
              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Option 1</li>
              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Option 2</li>
              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Option 3</li>
            </ul>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Weather