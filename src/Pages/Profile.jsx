import { useContext, useEffect } from "react"
import { AppContext } from "../Context/AppContext"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

function Profile() {
    const { ProfileInfo, profilePosts, userData, isLoggedIn } = useContext(AppContext)
    const navigate = useNavigate()

    const postCount = profilePosts?.length || 0;

    useEffect(() => {
        if (!isLoggedIn) {
            navigate("/login")
            toast.info("Not logged in to use this feature",{
                style: {
                background: "#90cdf4",
                color: "#fff",
                borderRadius:"20px"
            }
            })
            return 
        }
        ProfileInfo()
    }, [isLoggedIn, navigate])

    if (!isLoggedIn || !userData) {
        return  (
        <div className="bg-black min-h-screen text-white flex items-center justify-center">
            <div>Loading...</div>
        </div>
    )
    }

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" })
    }

    return (
        <div className="bg-black min-h-screen text-white">
            <div className="w-full h-auto md:py-10 border-b border-blue-300  flex flex-col md:flex-row justify-center md:justify-around items-center gap-6 px-4 py-6">

                <h1 className="
          flex justify-center items-center border border-[8px] border-blue-600
          text-5xl sm:text-6xl md:text-7xl xl:text-8xl
          h-20 w-20 sm:h-24 sm:w-24 select-none md:h-28 md:w-28 xl:h-40 xl:w-40
          rounded-full bg-blue-500 text-white
        ">
                    {userData.name[0].toUpperCase()}
                </h1>

                <ul className="
          flex flex-col gap-2 sm:gap-3
          font-sans
          text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl
          w-full sm:w-[80%] md:w-[60%] lg:w-[50%]
          text-center md:text-left
        ">
                    <li>
                        Name : <span className="ml-2 select-none ">{userData.name}</span>
                    </li>

                    <li>
                        Posts : <span className="ml-2 select-none ">{postCount}</span>
                    </li>
                </ul>
            </div>

            {profilePosts && profilePosts.length > 0 ? (
                <div className="flex justify-center mt-6 px-2 sm:px-4">
                    <div
                        className="
              columns-2
              sm:columns-3
              md:columns-3
              lg:columns-3
              xl:columns-4
              gap-3
              w-full sm:w-[95%] md:w-[90%] lg:w-[85%]
            "
                    >
                        {profilePosts.map((profilePost) => (
                            <div
                                key={profilePost._id}
                                onClick={() => {
                                    navigate(`/view/${profilePost._id}`)
                                    scrollToTop()
                                }}
                                className="mb-4 break-inside-avoid cursor-pointer"
                            >
                                {profilePost.mediaType === "image" ?
                                    <img
                                        src={profilePost.content}
                                        alt={profilePost.title}
                                        className="w-full h-auto object-contain rounded-xl bg-black"
                                    />
                                    :
                                    <video
                                        key={profilePost._id}
                                        autoPlay
                                        muted
                                        loop
                                        className="w-full h-auto object-contain rounded-xl bg-black"
                                    >
                                        <source src={profilePost.content} type="video/mp4" />
                                        Your browser does not support the video tag.
                                    </video>
                                }
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="flex justify-center mt-6">
                    <h1 className="text-lg sm:text-xl md:text-2xl">No posts</h1>
                </div>
            )}
        </div>
    )
}

export default Profile
