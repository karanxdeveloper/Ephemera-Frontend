import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../Context/AppContext';
import { Home, User, PlusSquare, Info, ScrollText } from "lucide-react";

function Navbar() {
  const { userData, setMenuToggle, menuToggle, logout, sendVerificationOtp, otpLoading, isVerified, posts, setPosts, data } = useContext(AppContext)
  const navigate = useNavigate()
  const [text, setText] = useState("");

  const searching = (text) => {
    if (!text.trim()) {
      setPosts(data);
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
    <>
      <div className="flex w-full justify-center bg-black p-2">
        <div className="flex items-center justify-between w-[95%] sm:w-[90%] text-white">
          <h1
            onClick={() => navigate("/")}
            className="text-lg md:text-xl text-blue-500 select-none font-sans font-semibold cursor-pointer"
          >
            EPHEMERA
          </h1>

          <div className="flex justify-center w-[55%] lg:w-[35%] relative">
            <input
              type="text"
              onChange={(e) => setText(e.target.value)}
              placeholder="search here..."
              className="w-full outline-blue-400 text-sm md:text-base px-4 h-9 border border-white rounded-xl"
            />
          </div>

          <div className="hidden md:flex items-center">
            {userData ? (
              <div
                onClick={() => setMenuToggle(!menuToggle)}
                className="w-10 h-10 md:w-12 md:h-12 flex select-none justify-center items-center rounded-full border relative bg-white text-blue-500 font-semibold text-xl cursor-pointer"
              >
                {userData.name[0].toUpperCase()}
                <div
                  className={`absolute ${menuToggle ? "block" : "hidden"} top-0 right-0 z-10 text-black rounded pt-10`}
                >
                  <ul className="list-none w-[20vw] bg-white border-white font-medium m-2 p-4 rounded-xl text-sm">
                    <li onClick={() => navigate("/")} className="py-2 px-2 text-xl text-center rounded-xl hover:bg-gray-200 cursor-pointer">Home</li>
                    <li onClick={() => navigate("/scroll")} className="py-2 px-2 text-xl text-center rounded-xl hover:bg-gray-200 cursor-pointer">Scroll</li>
                    <li onClick={() => navigate("/create")} className="py-2 px-2 text-xl text-center rounded-xl hover:bg-gray-200 cursor-pointer">Create</li>
                    <li onClick={() => navigate("/profile")} className="py-2 px-2 text-xl text-center rounded-xl hover:bg-gray-200 cursor-pointer">Profile</li>
                    <li onClick={() => navigate("/About")} className="py-2 px-2 text-xl text-center rounded-xl hover:bg-gray-200 cursor-pointer">About</li>
                    <li onClick={() => logout()} className="py-2 px-2 text-xl text-center rounded-xl hover:bg-gray-200 cursor-pointer">Logout</li>
                    {!isVerified && !otpLoading && (
                      <li onClick={() => sendVerificationOtp()} className="py-2 px-2 text-xl text-center text-blue-500 rounded-xl hover:bg-gray-200 cursor-pointer">Verify Account</li>
                    )}
                    {otpLoading && <div className="flex justify-center items-center"><div className="w-8 h-8 border-black rounded-full border-4 border-t-transparent animate-spin"></div></div>}
                  </ul>
                </div>
              </div>
            ) : (
              <button
                onClick={() => navigate("/login")}
                className="px-4 py-1 bg-white text-black rounded-full font-semibold"
              >
                Login
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="md:hidden fixed bottom-0 w-full bg-black text-white border-t border-gray-700 flex justify-around py-2 z-50">
        <button onClick={() => navigate("/")} className="flex flex-col items-center">
          <Home size={22} />
          <span className="text-[10px]">Home</span>
        </button>
        <button onClick={() => navigate("/scroll")} className="flex flex-col items-center">
          <ScrollText size={22} />
          <span className="text-[10px]">Scroll</span>
        </button>
        <button onClick={() => navigate("/create")} className="flex flex-col items-center">
          <PlusSquare size={22} />
          <span className="text-[10px]">Create</span>
        </button>
        <button onClick={() => navigate("/profile")} className="flex flex-col items-center">
          <User size={22} />
          <span className="text-[10px]">Profile</span>
        </button>
        <button onClick={() => navigate("/about")} className="flex flex-col items-center">
          <Info size={22} />
          <span className="text-[10px]">About</span>
        </button>
      </div>
    </>
  )
}

export default Navbar;
