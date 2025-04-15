import React from 'react'
import { IoSearchOutline } from "react-icons/io5";
import Toggle from './Toggle';


const Search = () => {
  return (
    <div className='col-span-2 flex justify-end items-center'>
      <div className="search w-3xs py-2 flex justify-evenly items-center rounded-3xl bg-slate-300 text-base">
        <IoSearchOutline className='text-base' /> 
        <input className='border-none outline-none' type="search" placeholder='search your location' />
      </div>
      <Toggle className='mx-2' />
    </div>
  )
}

export default Search