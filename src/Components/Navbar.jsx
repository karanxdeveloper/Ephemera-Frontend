import React from 'react'

function Navbar() {
  return (
    <div className='flex w-full bg-black justify-center'> 
        <div className='flex justify-around items-center w-[80%] text-white p-2'>
            <img className='w-15 h-15 rounded-full' src="https://static.vecteezy.com/system/resources/thumbnails/025/221/284/small_2x/picture-a-captivating-scene-of-a-tranquil-lake-at-sunset-ai-generative-photo.jpg" alt="" />
            <ul className='flex gap-6 font-semibold text-xl '>
                <li className='cursor-pointer'>Home</li>
                <li className='cursor-pointer'>Create</li>
                <li className='cursor-pointer'>About</li>
                <li className='cursor-pointer'>Subscribe</li>
            </ul>
        </div>
    </div>
  )
}

export default Navbar