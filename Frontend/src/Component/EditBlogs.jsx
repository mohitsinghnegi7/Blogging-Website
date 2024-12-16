import React, { useEffect, useState } from 'react'

import blog from '../assets/blog-photo.jpg'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import axios from 'axios'

const EditBlogs = () => {
   const [blogData,setBlogData] = useState()
    const backendLink = useSelector(state=>state.prod.link)
  useEffect(()=>{
    
    const fetch = async()=>{

      const res = await axios.get(`${backendLink}/api/v1/blog/allBlogs`,{
        withCredentials : true
      })
    setBlogData(res.data.allBlogs);
        

    }
    fetch()
  },[backendLink])
  
  return (
    <div className='p-4 '>
      <h1 className='text-2xl font-semibold mb-4'>Edit Blogs</h1>
      <div className='grid grid-cols-3 gap-4'>
        {blogData ? ( blogData.map((item,i)=>(
            <div  className='bg-white rounded-md p-4 flex flex-col items-center justify-center'>
                 <img src={item.image} alt='' className='rounded-md object-cover'/>
              <div>
              <h1 className='text-xl lg:text-xl font-semibold m-2'>{item.title}</h1>
              <p className='text-normal m-2'>{item.description.slice(0,150)}......</p>
              </div>
              <div className='w-[100%] flex items-center gap-4 '>
                <Link to='/admin-dashboard/update-blog/:id' className='text-white text-center rounded w-[100%] hover:bg-blue-700 transition-all duration-300 bg-blue-500 px-4 py-2'>Edit</Link>
                <button className='text-white rounded w-[100%] hover:bg-red-700 text-center transition-all duration-300 bg-red-500 px-4 py-2'>Delete</button>
                </div>
            </div>
        ))
        
      ):(
        <div className='h-screen flex items-center justify-center'>Loading.....</div>
      )
        }
      </div>
    </div>
  )
}

export default EditBlogs
