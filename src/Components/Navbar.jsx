import  { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../Context/AppContext'

function Navbar() {

  const {userData,setMenuToggle,menuToggle,logout} = useContext(AppContext)

  const navigate= useNavigate()

  return (
    <div className='flex w-full bg-black justify-center'>
      <div className='flex justify-evenly items-center w-[95%] sm:w-[90%] text-white p-2 sm:justify-around '>
       <h1 onClick={() => navigate("/")} className='text-[14px] sm:text-xl text-blue-500 select-none font-sans font-semibold'>EPHEMERA</h1>
        <ul className='flex gap-6 font-semibold text-[14px] sm:text-xl select-none'>
          <li onClick={() => navigate("/")} className='cursor-pointer '>Home</li>
          <li onClick={() => navigate("/create")} className='cursor-pointer'>Create</li>
          <li onClick={() => navigate("/About")} className='cursor-pointer'>About</li>
        </ul>

        {userData ? <div onClick={() => setMenuToggle(!menuToggle)}
          className='w-8 sm:w-10 sm:h-10 h-8 flex select-none justify-center items-center rounded-full border relative bg-white text-black font-semibold text-[14px] sm:text-xl'>
          {userData.name[0].toUpperCase()}
          <div className={`absolute ${menuToggle ? "block" : "hidden"}  top-0 right-0 z-10 text-black
          rounded pt-10`}>
            <ul className="list-none w-[20vw] sm:w-[15vw] m-1 sm:m-0 p-4 bg-gray-100 rounded-xl text-sm">
              <li onClick={() => logout()} className="text-center select-none text-[14px]  sm:text-[20px] sm:py-2 sm:px-2 rounded-xl hover:bg-gray-200 cursor-pointer pr-6">Logout</li>
            </ul>
          </div>
        </div> :
          <button onClick={()=>navigate("/login")} className='p-3 select-none py-1 border-none focus:outline-none bg-white text-black rounded-full font-semibold text-lg '>Login</button>}

      </div>
    </div>
  )
}

export default Navbar