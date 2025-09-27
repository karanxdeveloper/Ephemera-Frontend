
import { useContext, useState } from 'react'
import { AppContext } from '../Context/AppContext'

function Login() {

  const { currState, setName, setMail, setPassword, name, email, password, setCurrState, register, loginLoading,login } = useContext(AppContext)




  return (
    <div className='text-white min-h-screen h-[100%] bg-black flex justify-center items-center overflow-y-auto'>
      <form className='w-[95%] sm:w-[60%] lg:w-[40%] xl:w-[29%]  py-10 flex flex-col  items-center gap-5 rounded-xl  md:w-[48%] 2xl:w-[24%]'>
        {currState == "Sign Up" ? <input className='border p-3 text-black rounded-md w-85 bg-white' placeholder='User Name' onChange={(e) => { setName(e.target.value) }} value={name} type="text" /> : ""}
        <input className='border p-3 rounded-md w-85 text-black bg-white' placeholder='Email' onChange={(e) => { setMail(e.target.value) }} value={email} type="mail" />
        <input className='border p-3 rounded-md w-85 text-black bg-white' placeholder='Password' onChange={(e) => { setPassword(e.target.value) }} value={password} type="password" />

        {currState === 'Sign Up' ? (
          <p className="text-gray-400 text-center text-xs mt-4">Already have an account {' '}
            <span onClick={() => setCurrState("Login")} className="text-blue-400 cursor-pointer underline">Login here</span>
          </p>
        ) : (
          <p className="text-gray-400 text-center text-xs mt-4">Don't have an account {' '}
            <span onClick={() => setCurrState("Sign Up")} className="text-blue-400 cursor-pointer underline">Sign up</span>
          </p>
        )}

        {loginLoading ? <div className="flex justify-center items-center"><div className=" text-center w-8 h-8 rounded-full border-4 border-blue-400 border-t-transparent animate-spin"></div></div>
          : <button onClick={currState == "Sign Up" ? register : login} className="border cursor-pointer text-center px-15 mt-5 font-semibold text-xl font-sans bg-blue-500 text-white py-2 rounded-full hover:bg-blue-600">{currState == "Sign Up" ? "Sign Up" : "Login"}</button>
        }


      </form>
    </div>
  )
}

export default Login