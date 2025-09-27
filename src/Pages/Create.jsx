import { useContext, useEffect, useState } from "react"
import { AppContext } from "../Context/AppContext"
import defaultImage from "../assets/media.png";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Create() {
  const { media, setSelectedMedia, setTime, setTitle, title, expiresIn, CreatePost, createLoading, isVerified, tags, setTags, isLoggedIn,sendVerificationOtp } = useContext(AppContext)
  const [tagInput, setTagInput] = useState("")

  const navigate = useNavigate()

  const addTag = (e) => {
    e.preventDefault()
    if (tagInput.trim() !== "" && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()])
    }
    setTagInput("")
  }

  const removeTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove))
  }

  const MAX_VIDEO_DURATION = 61

  const [previewUrl, setPreviewUrl] = useState(null);

  const handleMediaChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.type.startsWith("video/")) {
      const video = document.createElement("video");
      video.preload = "metadata";

      video.onloadedmetadata = () => {
        URL.revokeObjectURL(video.src);

        if (video.duration > MAX_VIDEO_DURATION) {
          toast.error(`Video duration cannot exceed 60 seconds.`,{
                 style: {
          background: "#90cdf4",
          color: "#fff",
          borderRadius:"20px"
        }
            });
        } else {
          if (previewUrl) URL.revokeObjectURL(previewUrl);

          setSelectedMedia(file);
          setPreviewUrl(URL.createObjectURL(file));
        }
      };

      video.src = URL.createObjectURL(file);
    } else {
      if (previewUrl) URL.revokeObjectURL(previewUrl);

      setSelectedMedia(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    console.log(isVerified)
    isLoggedIn ? "" : (navigate("/login"), toast.info("Not logged in to use this feature", {
      style: {
        background: "#90cdf4",
        color: "#fff",
        borderRadius:"20px"
      }

      
    }

    ))
  }, [isLoggedIn,navigate])

  


  return isVerified ? (
    <div className="bg-black w-full min-h-screen flex justify-center items-center">
      <div className="w-[90%] lg:w-[80%] xl:w-[70%] h-auto rounded-md bg-transparent mt-10 flex flex-col lg:flex-row gap-6">


        <div className="flex flex-col items-center justify-start lg:w-1/2 w-full gap-4">
          <h3 className="font-semibold text-2xl select-none text-white font-sans">New Post</h3>

          <label
            className="w-full  flex justify-center items-center border rounded-md overflow-hidden"
            htmlFor="post"
          >
            {media ? (
              media.type.startsWith("video/") ? (
                <video className="max-h-[400px] w-auto  rounded-md" key={previewUrl} controls>

                  <source src={previewUrl} type={media.type} />
                  Your browser does not support the video tag.
                </video>
              ) : (
                <img
                  className="max-h-[400px] select-none w-auto h-auto object-contain rounded-md"
                  src={previewUrl}
                  alt="Preview"
                />
              )
            ) : (
              <img
                className="max-h-[400px] border border-blue-500 border-[5px]  select-none w-auto h-auto object-contain rounded-md"
                src={defaultImage}
                alt="Preview"
              />
            )}
          </label>


          <div className="flex flex-col items-center">
            <input onChange={handleMediaChange} className="hidden" type="file" id="post" accept="image/*,video/*" />
            <label
              htmlFor="post"
              className="cursor-pointer border-2 border-dashed border-gray-400 rounded-xl px-4 py-2 mt-2 text-white text-sm sm:text-base font-sans hover:bg-gray-800 transition"
            >
              📁 Upload Media
            </label>
            {media && (
              <p className="mt-2 text-gray-400 text-sm text-center truncate max-w-[150px]">{media.name}</p>
            )}
          </div>
        </div>


        <form className="flex flex-col items-center justify-center lg:w-1/2 w-full gap-4 p-3">

          <div className="flex gap-3 flex-wrap justify-center w-full">
            {[3600, 14400, 28800].map((time) => (
              <p
                key={time}
                onClick={() => setTime(time)}
                className={`border cursor-pointer select-none px-3 py-1 rounded-full 
                  ${expiresIn === time ? "bg-blue-500 text-white" : "bg-white text-black"}`}
              >
                {time / 3600} Hours
              </p>
            ))}
          </div>


          <div className="flex flex-col items-center w-[90%]">
            <div className="flex w-full border border-gray-400 rounded-full px-3 py-2">
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                placeholder="Add a tag (e.g. nature, animals)"
                className="flex-1 bg-transparent text-white outline-none"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault()
                    addTag(e)
                  }
                }}
              />
              <button
                type="button"
                onClick={addTag}
                className="ml-2 bg-blue-500 text-white px-3 py-1 rounded-full"
              >
                Add
              </button>
            </div>

            <div className="flex flex-wrap gap-2 mt-2 justify-center">
              {tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="bg-gray-700 text-white px-3 py-1 rounded-full flex items-center gap-2"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => removeTag(tag)}
                    className="text-red-400"
                  >
                    ✕
                  </button>
                </span>
              ))}
            </div>
          </div>


          <input
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            className="border-none text-center w-[90%] text-white px-3 py-2 font-semibold font-sans rounded-xl bg-gray-800"
            type="text"
            placeholder="Title"
          />


          {createLoading ? (
            <div className="flex justify-center items-center">
              <div className="text-center w-8 h-8 rounded-full border-4 border-blue-500 border-t-transparent animate-spin"></div>
            </div>
          ) : (
            <button
              onClick={(e) => CreatePost(e)}
              className="border select-none text-center px-10 mt-3 font-semibold text-lg font-sans bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-full"
            >
              Post
            </button>
          )}
        </form>
      </div>
    </div>
  ) : (
    <div className="bg-black w-full min-h-screen flex justify-center items-center">
      <div className="text-center p-8">
        <h1 className="text-xl md:text-2xl text-white mb-4">
          Please verify your account to create your first post
        </h1>
        <p className="text-gray-400 mb-6">
          Click button to send Verification Otp to you registered email
        </p>
        <button
          onClick={() => sendVerificationOtp()}
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-full transition"
        >
          Verify Email
        </button>
      </div>
    </div>
  )
}

export default Create
