import React, { useEffect, useState } from 'react'
import blog from '../assets/blog-photo.jpg'
import BlogCard from './BlogCard.jsx'
import { useSelector } from 'react-redux'
import axios from 'axios'

const RecentBlogs = () => {

  const [blogData,setBlogData] = useState()

  const backendLink = useSelector(state=>state.prod.link)
  useEffect(()=>{
    
    const fetch = async()=>{

      const res = await axios.get(`${backendLink}/api/v1/blog/recentBlogs`,{
        withCredentials : true
      })
      console.log(res);
      
      setBlogData(res.data.allBlogs);

    }
    fetch()
  },[])
  return (
    <div>
     
      <h1 className='text-2xl font-semibold mb-4 mt-4 underline'>Recent Blogs</h1>
      <div className='flex flex-col gap-8'>
      {
          blogData ? (
            <div>
               {blogData.map((item,i)=>(
            <div key={i} className=''>
              <BlogCard item={item}/>
            </div>
        ))}
            </div >
          ) :(
          <div className=' flex items-center justify-center'>Loading.....</div>)
        }
      </div>
    </div>
  )
}

export default RecentBlogs
