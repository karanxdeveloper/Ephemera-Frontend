import  { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../Context/AppContext'

function Navbar() {

  const {userData,setMenuToggle,menuToggle,logout} = useContext(AppContext)

  const navigate= useNavigate()

  return (
    <div className='flex w-full bg-black justify-center'>
      <div className='flex justify-between items-center w-[95%] text-white p-2 sm:justify-around sm:w-[80%]'>
       <h1 onClick={() => navigate("/")} className='text-[15px] text-blue-500 font-sans font-semibold'>EPHEMERA</h1>
        <ul className='flex gap-6 font-semibold text-xl '>
          <li onClick={() => navigate("/")} className='cursor-pointer text-[15px]'>Home</li>
          <li onClick={() => navigate("/create")} className='cursor-pointer text-[15px]'>Create</li>
          <li onClick={() => navigate("/About")} className='cursor-pointer text-[15px]'>About</li>
        </ul>

        {userData ? <div onClick={() => setMenuToggle(!menuToggle)}
          className='w-8 h-8 flex justify-center items-center rounded-full border relative bg-white text-black font-semibold text-[14px]'>
          {userData.name[0].toUpperCase()}
          <div className={`absolute ${menuToggle ? "block" : "hidden"}  top-0 right-0 z-10 text-black
          rounded pt-10`}>
            <ul className="list-none w-[20vw] sm:w-[15vw] m-1 sm:m-0 p-4 bg-gray-100 rounded-xl text-sm">
              <li onClick={() => logout()} className="text-center  text-[14px] sm:text-[18px] sm:py-2 sm:px-2 rounded-xl hover:bg-gray-200 cursor-pointer pr-6">Logout</li>
            </ul>
          </div>
        </div> :
          <button onClick={()=>navigate("/login")} className='p-3 py-1 border-none focus:outline-none bg-white text-black rounded-full font-semibold text-[14px]'>Login</button>}

      </div>
    </div>
  )
}

export default Navbar