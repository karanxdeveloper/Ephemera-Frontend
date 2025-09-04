import React, { useState } from 'react'

function Login() {

  const [currState,setCurrState] = useState("Sign Up")
  const [name,setName] = useState("")
  const [mail,setMail] = useState("")
  const [password,setPassword] = useState("")


  return (
    <div className='text-white min-h-screen h-[100%] bg-gradient-to-t from-black to-sky-200 flex justify-center items-center overflow-y-auto'>
      <form className='w-[25%]  py-10 flex flex-col  items-center gap-5 rounded-xl bg-gray-700'>
       {currState == "Sign Up" ? <input className='border p-3 rounded-md w-85' placeholder='User Name' onChange={(e)=>{setName(e.target.value)}} value={name} type="text" /> : ""} 
        <input className='border p-3 rounded-md w-85' placeholder='Email' onChange={(e)=>{setMail(e.target.value)}} value={mail} type="mail" />
        <input className='border p-3 rounded-md w-85' placeholder='Password' onChange={(e)=>{setPassword(e.target.value)}} value={password} type="password" />

        {currState=="Sign Up" ? <p>Already have an account <span className='text-blue-400'>Login</span></p> : <p>Create a New Account <span  className='text-blue-400'>Sign Up</span></p>}

        <button className="border text-center px-15 mt-5 font-semibold text-xl font-sans bg-gray-900 text-white py-2 rounded-full">{currState=="Sign Up" ? "Sign Up" : "Login"}</button>

      </form>
    </div>
  )
}

export default Login