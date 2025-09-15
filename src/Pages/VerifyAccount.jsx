import { useContext } from "react"
import { AppContext } from "../Context/AppContext"


function VerifyAccount() {

    const{setOtp,otp,verifyOtp,otpLoading} = useContext(AppContext)

  return (
     <div className='text-white min-h-screen h-[100%] bg-black flex justify-center items-center overflow-y-auto'>
      <form className='w-[95%] sm:w-[25%]  py-10 flex flex-col  items-center gap-5 rounded-xl bg-gray-700'>
        
        <input className='border p-3 rounded-md w-85' placeholder='Password' onChange={(e)=>setOtp(e.target.value)} value={otp}  type="password" />

       

       {/* <div className="flex justify-center items-center"><div className=" text-center w-8 h-8 rounded-full border-4 border-t-transparent animate-spin"></div></div> */}
  {otpLoading ? <div className="flex justify-center items-center"><div className=" text-center w-8 border-white h-8 rounded-full border-4 border-t-transparent animate-spin"></div></div>  :
          <button onClick={(e)=>verifyOtp(e)} className="border cursor-pointer text-center px-15 mt-5 font-semibold text-xl font-sans bg-gray-900 text-white py-2 rounded-full">Verify Email</button>}
       


      </form>
    </div>
    
  )
}

export default VerifyAccount