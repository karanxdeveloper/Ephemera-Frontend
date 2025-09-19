import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../Context/AppContext'
import { useNavigate, useParams } from 'react-router-dom'

function View() {

  const {id} = useParams()

  const navigate = useNavigate()

    const { viewPost,viewPostTitle,postUser,posts,openImage,postUserId,otpLoading} = useContext(AppContext)

    const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

    useEffect(()=>{
        if(id){
          openImage(id)
        }
    },[id])

  return (
    <>
    <div className=" min-h-screen bg-black flex-col flex  items-center ">
       {otpLoading ? <div className="flex justify-center w-full  h-[55%] items-center"><div className=" text-center w-8 h-8 rounded-full border-4 border-blue-500 border-t-transparent animate-spin"></div></div> 
       : <div className='w-full  h-[55%] select-none flex justify-center items-center border rounded-md overflow-hidden'>
            <img className='max-h-[500px] select-none w-auto h-auto object-contain rounded-md'
            src={viewPost} alt="image" />

        </div>}
        <div className='w-[100%] px-3 mt-3   flex items-center gap-5 h-[10%] '>
          {postUser ? <p onClick={()=>navigate(`/UserProfile/${postUserId}`)} className='w-10 h-10  rounded-full bg-white font-sans flex text-xl justify-center items-center font-bold text-black'>{postUser[0].toUpperCase()}</p> :<div className="flex justify-center items-center"><div className=" text-center w-8 h-8 rounded-full border-4 border-t-transparent animate-spin"></div></div>}  
            <p className='w-[80%] text-[14px] text-white font-semibold font-sans sm:text-xl'>{viewPostTitle}</p>
            
        </div>
        <p className='bg-white w-full h-[1px] mt-2'></p>

        <div className="flex justify-center mt-4">
              <div className="columns-2 sm:columns-4 gap-2 w-[100%] sm:w-[90%] ">
                {posts.map((post) => (
                  <div
                    key={post._id}
                    onClick={()=>{navigate(`/view/${post._id}`);scrollToTop()}}
                    className=" mb-4 break-inside-avoid "
                  >
                    <img
                      src={post.content}
                      alt={post.title}
                      className="w-full h-auto object-contain rounded-xl bg-black"
                    />

                  </div>
                ))}</div></div>
    </div>
    </>
  )
}

export default View