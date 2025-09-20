import { useContext, useEffect, useState } from "react";
import { AppContext } from "../Context/AppContext";
import { useLocation, useNavigate } from "react-router-dom";

function Home() {
  const { fetchData, data, loading, setLoading, posts, setPosts, isAccountVerified } = useContext(AppContext);


  const location = useLocation();

  const navigate = useNavigate()

  useEffect(() => {
    setLoading(true)
    fetchData().finally(() => setLoading(false))
    isAccountVerified()
  }, [location]);


  useEffect(() => {
    if (data && data.length > 0) {
      setPosts(data);
      setLoading(false);

      data.forEach((post) => {
        const expiryTime = new Date(post.expiresAt).getTime();
        const now = Date.now();
        const timeLeft = expiryTime - now;

        if (timeLeft > 0) {

          setTimeout(() => {
            setPosts((prev) => prev.filter((p) => p._id !== post._id));
          }, timeLeft);
        } else {
          setPosts((prev) => prev.filter((p) => p._id !== post._id));
        }
      });
    } else {
      setPosts([]);
    }
  }, [data]);



  return (
    <>
      <style>
        {`
          @keyframes glowPulse {
            0%, 100% {
    background-color: #1f2937;
  }
  50% {
    background-color:#374151; 
  }
          }

          .glow-box {
            animation: glowPulse 950ms ease-in-out infinite;
          }
        `}
      </style>
      <div className=" min-h-screen bg-black flex justify-center">
        <div className="w-[100%] sm:w-[85%]  grid grid-cols-1 sm:grid-cols-1 p-3 text-white">
          {loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {Array.from({ length: 12 }).map((_, i) => (
                <div
                  key={i}
                  className="bg-gray-800 h-[380px] rounded-lg overflow-hidden shadow-md flex items-center justify-center glow-box"
                >

                </div>
              ))}
            </div>
          ) : posts.length === 0 ? (
            <p className="text-center  w-[85vw] flex justify-center items-center text-white text-xl">
              No posts available yet.
            </p>
          ) : (
            <div className="flex justify-center ">
              <div className="columns-2 sm:columns-4 gap-2 w-[100%] sm:w-[90%] ">
                {posts.map((post) => (
                  <div
                    key={post._id}
                    onClick={() => { navigate(`/view/${post._id}`); }}
                    className=" mb-4 break-inside-avoid "
                  >{post.mediaType === "image" ?
                    <img
                      src={post.content}
                      alt={post.title}
                      className="w-full h-auto object-contain rounded-xl bg-black"
                    /> : <video
                      key={post._id}
                      autoPlay
                      muted
                      loop
                      className="w-full h-auto object-contain rounded-xl bg-black"
                    >
                      <source src={post.content} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>}


                  </div>
                ))}
              </div></div>
          )}
        </div>
      </div>
    </>)
}

export default Home;
