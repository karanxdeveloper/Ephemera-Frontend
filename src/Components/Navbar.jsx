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
      <div className='flex items-center justify-between w-[95%] sm:w-[90%] text-white p-2'>
        <h1 onClick={() => navigate("/")} className='text-[14px] sm:text-lg md:text-xl text-blue-500 select-none font-sans font-semibold'>EPHEMERA</h1>
        <div className='flex justify-center w-[50%] sm:w-[40%] md:w-[45%] lg:w-[35%] relative'>

        <input type='text'
         onChange={(e) => setText(e.target.value)}
        placeholder='search here...' className='w-full outline-blue-400 sm:w-[90%] md:w-[85%] lg:w-[80%] text-[10px] sm:text-[15px] px-2 sm:px-5 h-5 sm:h-9 border border-white rounded-full'>

        </input>
        </div>

        {userData ? <div onClick={() => setMenuToggle(!menuToggle)}
          className='w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 flex select-none justify-center items-center rounded-full border relative bg-white text-blue-500 font-semibold text-[14px] sm:text-xl'>
          {userData.name[0].toUpperCase()}
          <div className={`absolute ${menuToggle ? "block" : "hidden"}   top-0 right-0 z-10 text-black
          rounded pt-10`}>
            <ul className="list-none w-[90vw] sm:w-[70vw] md:w-[45vw] lg:w-[30vw] xl:w-[20vw] bg-white border-white font-medium m-1 sm:m-2 p-3 sm:p-4 max-h-[70vh] overflow-y-auto rounded-xl text-sm">
              <li onClick={() => navigate("/")} className='text-center mt-2 select-none text-[18px] sm:text-[20px] py-2 px-2 rounded-xl hover:bg-gray-200 cursor-pointer'>Home</li>
              <li onClick={() => navigate("/scroll")} className='text-center mt-2 select-none text-[18px] sm:text-[20px] py-2 px-2 rounded-xl hover:bg-gray-200 cursor-pointer'>Scroll</li>
              <li onClick={() => navigate("/create")} className='text-center mt-2 select-none text-[18px] sm:text-[20px] py-2 px-2 rounded-xl hover:bg-gray-200 cursor-pointer'>Create</li>
              <li onClick={() => navigate("/profile")} className='text-center mt-2 select-none text-[18px] sm:text-[20px] py-2 px-2 rounded-xl hover:bg-gray-200 cursor-pointer'>Profile</li>
              <li onClick={() => navigate("/About")} className='text-center mt-2 select-none text-[18px] sm:text-[20px] py-2 px-2 rounded-xl hover:bg-gray-200 cursor-pointer'>About</li>
              <li onClick={() => logout()} className='text-center mt-2 select-none text-[18px] sm:text-[20px] py-2 px-2 rounded-xl hover:bg-gray-200 cursor-pointer'>Logout</li>
              {otpLoading ? <div className="flex justify-center items-center"><div className=" text-center w-8 border-black h-8 rounded-full border-4 border-t-transparent animate-spin"></div></div>
                : <li onClick={() => sendVerificationOtp()} className={`text-center select-none mt-2 text-[35px] ${isVerified ? "hidden" : "block"}  sm:text-[20px] sm:py-2 sm:px-2 rounded-xl hover:bg-gray-200 cursor-pointer pr-4`}>Verify Account</li>}
            </ul>
          </div>
        </div> :
          <button onClick={() => navigate("/login")} className='p-3 select-none py-1 border-none focus:outline-none bg-white text-black rounded-full font-semibold '>Login</button>}

      </div>
    </div>
  )
}

export default Navbar