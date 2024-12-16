import React from 'react'
import { Link } from 'react-router-dom'


const BlogCard = ({item}) => {
  console.log(item.image);
  
  
  return (
    <div className='flex flex-col md:flex-row gap-4 m-2 '>
      <div className='md:w-2/6 w-full mt-3 '>
        <img src={item.image} alt='' className='rounded-md object-cover mt-3'/>
      </div>
      <div className='md:w-3/6 w-full flex flex-col gap-3 md:gap-7 lg:mt-3 '>
      <div>
        <h1 className='text-xl lg:text-2xl font-bold'>{item.title}</h1>
        <p className='text-normal'>{item.description.slice(0,300)}......</p>
        </div>
        <div>
        <Link to={`/description/${item._id}`} className='bg-blue-500 px-4 py-3 rounded text-white text-normal md:text-xl hover:bg-blue-700 transition-all duration-300  pt-3'>Read Blog</Link>
        </div>
      </div>
    </div>
  )
}

export default BlogCard
