import React, { useState } from 'react'
import SideBar from '../Component/SideBar'
import { Outlet } from 'react-router-dom'
import { BsArrowRight } from "react-icons/bs";
import { RxCross2 } from "react-icons/rx";

function Profile() {
  const [sideBar, setSideBar] = useState(false)
  return (
    <div className='mb-4 py-4 flex h-screen  items-start justify-between gap-8'>
     
      <div className={`bg-white ${sideBar ? "text-2xl h-screen" : "hidden"} h-screen text-3xl  lg:text-normal lg:h-auto  lg:block fixed top-0 left-0 w-[70%] flex flex-col p-4 lg:p-0 border-r items-center z-[10] justify-center lg:relative lg:w-1/6`}>
      <div className='absolute lg:hidden top-10 right-8'>
        <button className='text-4xl' onClick={()=>setSideBar(!sideBar)}><RxCross2 /></button>
      </div>
      <SideBar/>
      </div>


      <div className='absolute top-17 left-5 lg:hidden z-[2]'>
     <button onClick={()=>setSideBar(!sideBar)}>
      <BsArrowRight className='text-3xl'/>
      </button>
      
      </div>

    
      <div className='w-full lg:w-5/6 h-screen overflow-y-auto'>
      
      <Outlet/>

      </div>
    </div>
  )
}

export default Profile
