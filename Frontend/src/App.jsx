import React, { useEffect } from 'react'
import {BrowserRouter, Routes , Route} from 'react-router-dom'
import Home from './Pages/Home.jsx'
import MainLayout from './layout/MainLayout.jsx'
import Profile from './Pages/Profile.jsx'
import OtherLayout from './layout/OtherLayout.jsx'
import Login from './Pages/Login.jsx'
import Signup from './Pages/Signup.jsx'
import AllBlogs from './Pages/AllBlogs.jsx'
import DashboardProfile from './Component/DashboardProfile.jsx'
import Favourites from './Component/Favourites.jsx'
import LikedBlogs from './Component/LikedBlogs.jsx'
import Description from './Pages/Description.jsx'
import Categories from './Pages/Categories.jsx'
import AdminLogin from './Pages/AdminLogin.jsx'
import AdminDashboard from './Pages/AdminDashboard.jsx'
import AdminDashboardCom from './Component/AdminDashboardCom.jsx'
import AddBlogs from './Component/AddBlogs.jsx'
import EditBlogs from './Component/EditBlogs.jsx'
import UpdateBlog from './Component/UpdateBlog.jsx'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { authAction } from './store/auth.js'


function App() {

  const backendLink = useSelector(state=>state.prod.link)
  const dispatch = useDispatch()
  useEffect(()=>{
    const fetch = async()=>{

      const res = await axios.get(`${backendLink}/api/v1/users/check-cookie`,{
        withCredentials : true
      })
      if(res.data.message===true){
        dispatch(authAction.login())
      }
      

    }
    fetch()
  },[])
  return (
    <>
    <ToastContainer/>
    <Routes>
        <Route path='/'element={<MainLayout/>}>
            
            <Route index element={<Home/>}/>
            
            <Route path='/profile' element={<Profile/>}>
            
                   <Route index element={<DashboardProfile/>}/>
                   <Route path='/profile/favourites' element={<Favourites/>}/>
                   <Route path='/profile/liked-blogs' element={<LikedBlogs/>}/>
            </Route>

            <Route path='/all-blogs' element={<AllBlogs/>}/>
            <Route path='/description/:id' element={<Description/>}/>
            <Route path='/cat/:id' element={<Categories/>}/>
        </Route>

        <Route element={<OtherLayout/>}>
            <Route path='/login' element={<Login/>}/>
            <Route path='/signup' element={<Signup/>}/>
            <Route path='/admin-login' element={<AdminLogin/>}/>
           
            <Route path='/admin-dashboard' element={<AdminDashboard/>}>
                <Route index element={<AdminDashboardCom/>}/>
                <Route path='/admin-dashboard/add-blog' element={<AddBlogs/>} />
                <Route path='/admin-dashboard/edit-blog' element={<EditBlogs/>} />
                <Route path='/admin-dashboard/update-blog/:id' element={<UpdateBlog/>}/>
            </Route>
        </Route>

    </Routes>
    </>
  )
}

export default App
