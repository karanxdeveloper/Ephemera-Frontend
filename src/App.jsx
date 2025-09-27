import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Slide, ToastContainer, Zoom } from 'react-toastify';
import Navbar from './Components/Navbar'; 

const Home = lazy(() => import('./Pages/Home'));
const Create = lazy(() => import('./Pages/Create'));
const Login = lazy(() => import('./Pages/Login'));
const About = lazy(() => import('./Pages/About'));
const View = lazy(() => import('./Pages/View'));
const Profile = lazy(() => import('./Pages/Profile'));
const UserProfile = lazy(() => import('./Pages/UserProfile'));
const VerifyAccount = lazy(() => import('./Pages/VerifyAccount'));
const ScrollingFeed = lazy(() => import('./Pages/ScrollingFeed'));

function App() {
  return (
    <>
      <Navbar /> 
      <ToastContainer position="top-center" autoClose={2000} hideProgressBar={true} transition={Slide} limit={1} />
      <Suspense
        fallback={
          <div className="flex justify-center items-center h-screen">
            <div className="w-12 h-12 border-4 border-t-transparent border-white rounded-full animate-spin"></div>
          </div>
        }
      >
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/create' element={<Create />} />
          <Route path='/About' element={<About />} />
          <Route path='/view/:id' element={<View />} />
          <Route path='/Profile' element={<Profile />} />
          <Route path='/UserProfile/:id' element={<UserProfile />} />
          <Route path='/VerifyAccount' element={<VerifyAccount />} />
          <Route path='/scroll' element={<ScrollingFeed />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
