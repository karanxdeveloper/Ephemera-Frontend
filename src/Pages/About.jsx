
import { Shield, Settings, Clock } from 'lucide-react'; 
import { useNavigate } from 'react-router-dom';

function About() {

    const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-black text-white flex flex-col justify-center items-center px-4 sm:px-8 py-10 select-none">
      
    
      <div className="text-center mb-8 sm:mb-12">
        <div className="flex justify-center mb-2">
          <Shield size={32} className="text-blue-500" />
        </div>
        <h1 className="text-xl sm:text-3xl font-bold mb-2">YOUR STORY, YOUR RULES</h1>
        <p className="text-sm sm:text-base text-gray-300">
          Experience social media redefined with privacy and control
        </p>
      </div>


      <div className="flex flex-col sm:flex-row gap-2 sm:gap-6 mb-4 w-full max-w-4xl">

        <div className="flex-1 bg-gray-900 p-4 rounded-xl flex flex-col items-center text-center hover:scale-105 transition-transform">
          <Shield size={28} className="mb-2 text-white" />
          <h2 className="font-semibold mb-1">PRIVACY FIRST</h2>
          <p className="text-xs sm:text-sm text-gray-400">
            Your data is protected. Share confidently with robust privacy controls on every post.
          </p>
        </div>

  
        <div className="flex-1 bg-gray-900 p-4 rounded-xl flex flex-col items-center text-center hover:scale-105 transition-transform">
          <Settings size={28} className="mb-2 text-white" />
          <h2 className="font-semibold mb-1">TOTAL CONTROL</h2>
          <p className="text-xs sm:text-sm text-gray-400">
            Decide who sees what, next step by step. You have complete ownership.
          </p>
        </div>

      
        <div className="flex-1 bg-gray-900 p-4 rounded-xl flex flex-col items-center text-center hover:scale-105 transition-transform">
          <Clock size={28} className="mb-2 text-white" />
          <h2 className="font-semibold mb-1">LIVE IN THE MOMENT</h2>
          <p className="text-xs sm:text-sm text-gray-400">
            No pressure for content to last forever. Share things with freedom.
          </p>
        </div>
      </div>


      <button className="bg-blue-500 px-6 py-2 rounded-full font-semibold hover:bg-blue-600 transition-colors mb-4" onClick={()=>navigate("/")}>
        EXPLORE FEATURES
      </button>
    </div>
  )
}

export default About;
