import React from 'react'
import AdminSideBar from '../Component/AdminSideBar'
import { Outlet } from 'react-router-dom'

function AdminDashboard() {
  return (
    <div className='flex '>
   
     <div className=' w-1/6 h-screen border-r sticky '>
       <AdminSideBar/>
       </div>
     <div className='w-5/6 bg-zinc-200 overflow-y-scroll h-screen '>
      <Outlet/>
      </div>
      
    </div>
  )
}

export default AdminDashboard
