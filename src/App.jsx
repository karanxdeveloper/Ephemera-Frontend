
import Navbar from './Components/Navbar'
import Home from './Pages/Home'
import Create from './Pages/Create'
import { Route, Routes } from 'react-router-dom'
import Login from './Pages/Login'

function App() {

  return (
    <>
    <div className='bg-gradient-to-t from-black to-sky-200 bg-contain h-screen'>

    <Navbar/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/create' element={<Create/>}/>
    </Routes>
    </div>
      
    </>
  )
}

export default App
