import React from 'react'
import { PiSquaresFourFill } from "react-icons/pi";
import { FiMap } from "react-icons/fi";
import { MdMenu } from "react-icons/md";
import { IoNotificationsOutline } from "react-icons/io5";
import { IoSettingsOutline } from "react-icons/io5";
import { FiLogOut } from "react-icons/fi";

const Sidebar = () => {
  return (
    <div className='row-span-3 bg-slate-800 flex flex-col justify-between items-center min-h-full rounded-2xl text-xl py-4'>
     <div className="wrapper">
     <div className="menu h-12 flex justify-center items-center">
        <MdMenu className='text-slate-400 cursor-pointer hover:text-slate-950 h-12'/>
      </div>
      <div className="weather">
        <PiSquaresFourFill className='text-slate-400 cursor-pointer hover:text-slate-950 h-12' />
      </div>
      <div className="map">
        <FiMap className='text-slate-400 cursor-pointer hover:text-slate-950 h-12'/>
      </div>
      <div className="notification">
        <IoNotificationsOutline className='text-slate-400 cursor-pointer hover:text-slate-950 h-12'/>
      </div>
      <div className="setting">
        <IoSettingsOutline className='text-slate-400 cursor-pointer hover:text-slate-950 h-12'/>
      </div>
     </div>

      <div className="logout h-12 flex flex-col justify-center items-center">
        <FiLogOut className='text-slate-400 hover:text-slate-950 cursor-pointer'/>
        <span className='text-xs text-slate-400 py-0.5'>Logout</span>
      </div>
    </div>
  )
}

export default Sidebar