import  { useContext, useEffect, useState } from 'react'
import { AppContext } from '../Context/AppContext'


function Home() {

  const {data} = useContext(AppContext)
  const [loading,setLoading] = useState(true)

  useEffect(()=>{
  if (data !== undefined) {
  setLoading(false);
}
  },[data])

return (
  <div className='bg-gradient-to-t from-black to-sky-200 min-h-screen flex justify-center'>
    <div className='w-[80%] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-2 text-white'>
      {loading ? (
          Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className="bg-gray-800 h-[280px] rounded-lg overflow-hidden shadow-md flex items-center justify-center"
            >
              <img 
                src="/stickman-loading.gif"
                alt="Loading..."
                className="w-[80%] h-[80%] rounded-full"
              />
            </div>
          ))
        ) : !data || data.length === 0 ? (
        <p className="text-center text-white text-xl">No posts available yet.</p>
      ) : (
        data.map((post) => (
          <div key={post._id} className='bg-gray-800 h-[280px] rounded-lg overflow-hidden shadow-md'>
            <img src={post.content} alt={post.title} className='w-full h-48 object-cover' />
            <div className='p-4'>
              <h2 className='text-lg font-semibold'>{post.title}</h2>
            </div>
          </div>
        ))
      )}
    </div>
  </div>
)

}

export default Home