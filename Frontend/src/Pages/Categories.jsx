import React, { useEffect, useState } from 'react'
import BlogCard from '../Component/BlogCard.jsx'
import blog from '../assets/blog-photo.jpg'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { useParams } from 'react-router-dom'


const Categories = () => {
  const backendLink = useSelector(state=>state.prod.link)
  const {id} = useParams()
  const [blogData, setBlogData] = useState("")
  useEffect(()=>{
    const fetch = async()=>{    
      const res = await axios.get(`${backendLink}/api/v1/category/getCategoryByBlog/${id}`,{
        withCredentials : true
      })
      setBlogData(res.data.blog);
      
      
  }
  fetch()
  },[backendLink])
  return (
    <div>
       <h1 className='text-2xl font-semibold mb-4 mt-4 '>All Blogs</h1>
      <div className={`flex flex-col gap-4 ${blogData.length===0? "h-screen":"h-normal"}`}>
      {
        blogData &&  blogData ? (
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

export default Categories
