import React, { useEffect, useState } from 'react'
import blog from '../assets/blog-photo.jpg'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { FaRegStar } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { toast } from 'react-toastify'

const Description = () => {
  const { id } = useParams()
  const [blogData, setBlogData] = useState()
  const backendLink = useSelector(state=>state.prod.link)
  const [color , setColor] = useState(false)
  useEffect(()=>{
    
    const fetch = async()=>{

      const res = await axios.get(`${backendLink}/api/v1/blog/getDescription/${id}`,{
        withCredentials : true
      })
      // console.log(res);
      
      setBlogData(res.data.blog);
      if(res.data.favourite === true){
        setColor(true)
      }
      
    }
    fetch()
  },[])

  const colorHandle = async()=>{
    if(!color){
      const res = await axios.put(`${backendLink}/api/v1/blog/addFavourite/${id}`,{},{
        withCredentials : true
      })
      toast.success(res.data.message);
      
    }
    else{
      const res = await axios.put(`${backendLink}/api/v1/blog/removeFavourite/${id}`,{},{
        withCredentials : true
      })
      toast.success(res.data.message);
    
    }
    setColor(!color)
  }
  return (
    <div className='h-screen'>
     
      {
          blogData ? (
            <div>
              <div className='w-full flex items-center justify-between'>
              <h1 className='text-2xl font-semibold'>{blogData.title}</h1>
              <div className='w-1/6 text-2xl flex justify-end lg:text-3xl'>
              <button onClick={colorHandle}>
              {color?(
                <FaStar className='hover:cursor-pointer text-red-600'/>
              ) : ( 
                <FaRegStar className='hover:cursor-pointer'/>
              )
               }
              </button>
              </div>
              </div>
      <img className='mt-4 w-full h-[400px] object-cover rounded' src={`${blogData.image}`} alt='blog-image'/>
      <p className='mt-4 mr-4 ml-4 mb-7'>{blogData.description}</p>
            </div >
          ) :(
          <div className='h-screen flex items-center justify-center'>Loading.....</div>)
        }
    </div>
  )
}

export default Description
