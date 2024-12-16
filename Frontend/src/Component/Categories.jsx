import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Categories = () => {
  const backendLink = useSelector(state=>state.prod.link)
  const [actualCategory, setActualCategory] = useState("")
  useEffect(()=>{
    const fetch = async()=>{    
      const res = await axios.get(`${backendLink}/api/v1/category/getCategory`,{
        withCredentials : true
      })
      setActualCategory(res.data.categories);
      
  }
  fetch()
  },[backendLink])

  return (
    <div className='mb-4 py-3'>
        <h1 className=' text-2xl font-semibold mb-4'>Categories</h1>
    <div className='grid grid-cols-2 lg:grid-cols-4 gap-4'>
     
       {
                actualCategory && actualCategory.map((items,i)=>(
                  <Link  to={`cat/${items._id}`} key={i} value={items.title}  className='px-4 ml-3 py-3 text-normal md:text-xl bg-red-300 rounded-sm font-semibold'>{items.title}</Link>
                ))
              }
    </div>

    </div>
  )
}

export default Categories
