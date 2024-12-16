import React from 'react'
import { Link } from 'react-router-dom'

const AdminSideBar = () => {
    const links=[
        {
            name : "Dashboard",
            to : "/admin-dashboard"
        },
        {
            name : "Add Blog",
            to : "/admin-dashboard/add-blog"
        },
        {
            name : "Edit Blog",
            to : "/admin-dashboard/edit-blog"
        }
    ]
  return (
    <div className='p-4'>
      <h1 className='text-xl font-semibold'>Admin Page</h1>
      <hr className='my-4'/>
      <div className='flex flex-col gap-3'>
      {
        links.map((items,i)=>(
            <Link to={items.to} key={i} className='text-xl hover:scale-105 transition-all duration-300' >{items.name}</Link>
        ))
      }
      </div>
      <div>
        <button className='mt-5 bg-black text-white px-4 py-2 w-[100%] rounded'>Logout</button>
      </div>
    </div>
  )
}

export default AdminSideBar
