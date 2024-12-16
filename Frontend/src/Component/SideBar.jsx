import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { authAction } from '../store/auth'
import { toast } from 'react-toastify'

const SideBar = () => {

    const SideBarLinks=[
        {
            name : "Dashboard",
            to : "/profile"
        },
        {
            name : "Favourites",
            to : "/profile/favourites"
        },
      
    ]
    

    const dispatch = useDispatch();
    const backendLink = useSelector(state=>state.prod.link)
    const navigate = useNavigate()
    const logoutHandle = async()=>{
     const res =   await axios.post(`${backendLink}/api/v1/users/logout`,{
        withCredentials : true
      })
      toast.success(res.data.message);
      dispatch(authAction.logout())
      navigate('/')
      

    }
  return (
    <div className='w=[100%] lg:border-r h-screen flex flex-col gap-8  lg:gap-4 p-4 justify-center items-center lg:justify-normal lg:items-start'>
      {
        SideBarLinks.map((items,i)=>(
            <Link className=" hover:font-semibold" to={items.to}>{items.name}</Link>
        ))
      }
      <button className='bg-zinc-500 text-white rounded w-[100%] text-center py-1 hover:bg-zinc-700'
      onClick={logoutHandle}>Logout</button>
    </div>
  )
}

export default SideBar
