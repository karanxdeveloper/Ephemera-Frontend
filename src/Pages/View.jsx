import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../Context/AppContext'
import { useNavigate, useParams } from 'react-router-dom'

function View() {

  const { id } = useParams()

  const navigate = useNavigate()

  const { viewPost, viewPostTitle, postUser, posts, openImage, postUserId, otpLoading, mediaType, isVerified, viewPostData, toggleLike, addComment, fetchComments } = useContext(AppContext)

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  
  useEffect(() => {
    if (id) {
      openImage(id); 
      fetchComments(id).then(setComments); 
    }
  }, [id]);

  
  const handleComment = async () => {
    if (!newComment.trim()) return;
    await addComment(viewPostData._id, newComment);
    const updated = await fetchComments(viewPostData._id);
    setComments(updated);
    setNewComment("");
  };

  useEffect(() => {
    if (id) {
      openImage(id)
      toggleLike(id)
    }
  }, [id])

  return isVerified ? (
    <>
      <div className=" min-h-screen bg-black flex-col flex  items-center ">
        {otpLoading ? <div className="flex justify-center w-full  h-[55%] items-center"><div className=" text-center w-8 h-8 rounded-full border-4 border-blue-500 border-t-transparent animate-spin"></div></div>
          : <div className='w-full  h-[55%] select-none flex justify-center items-center border rounded-md overflow-hidden'>
            {mediaType === "image" ?
              <img className='max-h-[500px] select-none w-auto h-auto object-contain rounded-md'
                src={viewPost} alt="image" /> :
              <video
                key={viewPost}
                controls
                className="max-h-[500px] select-none w-auto h-auto object-contain rounded-md"
              >
                <source src={viewPost} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            }


          </div>}
        <div className='w-[100%] px-3 mt-3   flex items-center gap-5 h-[10%] '>
          {postUser ? <p onClick={() => navigate(`/UserProfile/${postUserId}`)} className='w-10 h-10  rounded-full bg-white font-sans flex text-xl justify-center items-center font-bold text-black'>{postUser[0].toUpperCase()}</p> : <div className="flex justify-center items-center"><div className=" text-center w-8 h-8 rounded-full border-4 border-t-transparent animate-spin"></div></div>}
          <p className='w-[80%] text-[14px] text-white font-semibold font-sans sm:text-xl'>{viewPostTitle}</p>
          <button onClick={() => toggleLike(viewPostData._id)}>
            {viewPostData?.isLiked ? "❤️" : "🤍"} {viewPostData?.likesCount || 0}
          </button>
        </div>
        <p className='bg-white w-full h-[1px] mt-2'></p>


 
        <div className="w-full px-3 mt-3">
          {comments.slice(-2).map((c, i) => (
            <p key={i} className="text-white text-sm">
              <span className="font-bold">{c.user?.name}: </span>
              {c.text}
            </p>
          ))}

          {comments.length > 2 && (
            <button className="text-blue-400 text-xs mt-1">
              View all {comments.length} comments
            </button>
          )}

          <div className="flex gap-2 mt-2">
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment..."
              className="flex-1 p-2 rounded bg-gray-800 text-white"
            />
            <button onClick={handleComment} className="px-3 py-1 bg-blue-500 rounded">
              Post
            </button>
          </div>
        </div>

        <div className="flex justify-center mt-4">
          <div className="columns-2 sm:columns-4 gap-2 w-[100%] sm:w-[90%] ">
            {posts.map((post) => (
              <div
                key={post._id}
                onClick={() => { navigate(`/view/${post._id}`); scrollToTop }}
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
      </div>
    </>
  ) : (
    <div className=" min-h-screen bg-black justify-center flex w-full
      items-center">
      <h1 className='text-white text-lg'>You are not logged in...</h1>
    </div>
  )
}

export default View