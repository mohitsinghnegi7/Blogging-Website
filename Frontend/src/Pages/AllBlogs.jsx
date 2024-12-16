import React, { useEffect, useState } from 'react'
import BlogCard from '../Component/BlogCard.jsx'
import blog from '../assets/blog-photo.jpg'
import { useSelector } from 'react-redux'
import axios from 'axios'

function AllBlogs() {

  const [blogData, setBlogData] = useState()
  const [loading,setLoading] = useState(false)

  


const backendLink = useSelector(state=>state.prod.link)
  useEffect(()=>{
    setLoading(true)
    const fetch = async()=>{

      const res = await axios.get(`${backendLink}/api/v1/blog/allBlogs`,{
        withCredentials : true
      })
      setBlogData(res.data.allBlogs);
      
      setLoading(false)

    }
    fetch()
  },[])
  return (
    <div>
       <h1 className='text-2xl font-semibold mb-4 mt-4 '>All Blogs</h1>
      <div className='flex flex-col gap-4'>
       
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
          <div className='h-screen flex items-center justify-center'>Loading.....</div>)
        }
      </div>
    </div>
  )
}

export default AllBlogs
