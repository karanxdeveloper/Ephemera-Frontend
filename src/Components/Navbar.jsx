import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { AppContext } from '../Context/AppContext'

function Navbar() {

  const {userData,setMenuToggle,menuToggle,logout} = useContext(AppContext)

  const navigate= useNavigate()

  return (
    <div className='flex w-full bg-gradient-to-t from-sky-200 to-black justify-center'>
      <div className='flex justify-around items-center w-[80%] text-white p-2'>
        <img onClick={() => navigate("/")} className='w-15 h-15 rounded-full' src="https://static.vecteezy.com/system/resources/thumbnails/025/221/284/small_2x/picture-a-captivating-scene-of-a-tranquil-lake-at-sunset-ai-generative-photo.jpg" alt="" />
        <ul className='flex gap-6 font-semibold text-xl '>
          <li onClick={() => navigate("/")} className='cursor-pointer'>Home</li>
          <li onClick={() => navigate("/create")} className='cursor-pointer'>Create</li>
          <li onClick={() => navigate("/About")} className='cursor-pointer'>About</li>
        </ul>

        {userData ? <div onClick={() => setMenuToggle(!menuToggle)}
          className='w-10 h-10 flex justify-center items-center rounded-full border relative bg-white text-black font-semibold text-xl'>
          {userData.name[0].toUpperCase()}
          <div className={`absolute ${menuToggle ? "block" : "hidden"}  top-0 right-0 z-10 text-black
          rounded pt-10`}>
            <ul className="list-none w-[15vw] m-0 p-4 bg-gray-100 rounded-xl text-sm">
              <li onClick={() => logout()} className="py-2 px-2 text-[18px] rounded-xl hover:bg-gray-200 cursor-pointer pr-6">Logout</li>
            </ul>
          </div>
        </div> :
          <button onClick={()=>navigate("/login")} className='p-3 py-1 border-none focus:outline-none bg-white text-black rounded-full font-semibold text-lg'>Login</button>}

      </div>
    </div>
  )
}

export default Navbar