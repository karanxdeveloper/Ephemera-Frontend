
import { useContext } from 'react'
import { AppContext } from '../Context/AppContext'

function Login() {
  
  const {currState,setName,setMail,setPassword,name,email,password,setCurrState,register,login} = useContext(AppContext)


  return (
    <div className='text-white min-h-screen h-[100%] bg-black flex justify-center items-center overflow-y-auto'>
      <form className='w-[95%] sm:w-[25%]  py-10 flex flex-col  items-center gap-5 rounded-xl bg-gray-700'>
       {currState == "Sign Up" ? <input className='border p-3 rounded-md w-85' placeholder='User Name' onChange={(e)=>{setName(e.target.value)}} value={name} type="text" /> : ""} 
        <input className='border p-3 rounded-md w-85' placeholder='Email' onChange={(e)=>{setMail(e.target.value)}} value={email} type="mail" />
        <input className='border p-3 rounded-md w-85' placeholder='Password' onChange={(e)=>{setPassword(e.target.value)}} value={password} type="password" />

      {currState === 'Sign Up' ? (
          <p className="text-gray-400 text-center text-xs mt-4">Already have an account {' '}
            <span onClick={() => setCurrState("Login")} className="text-blue-400 cursor-pointer underline">Login here</span>
          </p>
        ) : (
          <p className="text-gray-400 text-center text-xs mt-4">Don't have an account {' '}
            <span onClick={() => setCurrState("Sign Up")} className="text-blue-400 cursor-pointer underline">Sign up</span>
          </p>
        )}

        <button onClick={currState == "Sign Up" ? register:login} className="border text-center px-15 mt-5 font-semibold text-xl font-sans bg-gray-900 text-white py-2 rounded-full">{currState=="Sign Up" ? "Sign Up" : "Login"}</button>

      </form>
    </div>
  )
}

export default Login