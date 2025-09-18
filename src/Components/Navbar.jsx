import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../Context/AppContext'

function Navbar() {

  const { userData, setMenuToggle, menuToggle, logout, sendVerificationOtp, otpLoading, isVerified,posts,setPosts,data } = useContext(AppContext)

  const navigate = useNavigate()

  const [text, setText] = useState("");

const searching = (text) => {
  if (!text.trim()) {
    setPosts(data);  // restore all posts
    return;
  }

  const searchTerm = text.toLowerCase();
  const filtered = posts.filter((post) =>
    post.title?.toLowerCase().includes(searchTerm)
  );

  setPosts(filtered);
};

useEffect(() => {
  searching(text);
}, [text, data]);

  return (
    <div className='flex w-full  justify-center'>
      <div className='flex justify-evenly items-center w-[95%] sm:w-[90%]  text-white p-2 sm:justify-around '>
        <h1 onClick={() => navigate("/")} className='text-[14px]  sm:text-xl text-blue-500 select-none font-sans font-semibold'>EPHEMERA</h1>
        <div className='w-[55%]  md:w-[35%] flex relative '>

        <input type='text'
         onChange={(e) => setText(e.target.value)}
        placeholder='search here...' className='w-[70%] md:w-[60%] text-[10px] sm:px-5 sm:h-9 border px-2 border-white h-5 rounded-full'>

        </input>
        <span
        className='absolute right-1 sm:right-9 flex text-[10px] justify-center items-center sm:h-9 bg-white text-black h-5 text-center font-semibold font-sans border cursor-pointer rounded-full px-[5px] sm:px-3'>Search</span>
        </div>

        {userData ? <div onClick={() => setMenuToggle(!menuToggle)}
          className='w-8 sm:w-10 sm:h-10 h-8 flex select-none justify-center items-center rounded-full border relative bg-white text-black font-semibold text-[14px] sm:text-xl'>
          {userData.name[0].toUpperCase()}
          <div className={`absolute ${menuToggle ? "block" : "hidden"}  top-0 right-0 z-10 text-black
          rounded pt-10`}>
            <ul className="list-none w-[40vw] sm:w-[29vw] md:w-[25vw] lg:w-[20vw] xl:w-[15vw] m-1 sm:m-0 p-4 bg-gray-100 rounded-xl text-sm">
              <li onClick={() => logout()} className="text-center select-none text-[14px]  sm:text-[20px] sm:py-2 sm:px-2 rounded-xl hover:bg-gray-200 cursor-pointer pr-6">Logout</li>
              <li onClick={() => navigate("/")} className='text-center select-none text-[14px]  sm:text-[20px] sm:py-2 sm:px-2 rounded-xl hover:bg-gray-200 cursor-pointer pr-6 '>Home</li>
              <li onClick={() => navigate("/create")} className='text-center select-none text-[14px]  sm:text-[20px] sm:py-2 sm:px-2 rounded-xl hover:bg-gray-200 cursor-pointer pr-6'>Create</li>
              <li onClick={() => navigate("/About")} className='text-center select-none text-[14px]  sm:text-[20px] sm:py-2 sm:px-2 rounded-xl hover:bg-gray-200 cursor-pointer pr-6'>About</li>
              {otpLoading ? <div className="flex justify-center items-center"><div className=" text-center w-8 border-black h-8 rounded-full border-4 border-t-transparent animate-spin"></div></div>
                : <li onClick={() => sendVerificationOtp()} className={`text-center select-none mt-2 text-[14px] ${isVerified ? "hidden" : "block"}  sm:text-[20px] sm:py-2 sm:px-2 rounded-xl hover:bg-gray-200 cursor-pointer pr-4`}>Verify Account</li>}
            </ul>
          </div>
        </div> :
          <button onClick={() => navigate("/login")} className='p-3 select-none py-1 border-none focus:outline-none bg-white text-black rounded-full font-semibold '>Login</button>}

      </div>
    </div>
  )
}

export default Navbar