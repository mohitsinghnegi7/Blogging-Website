import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { ImageToBase64 } from '../utils/ImageToBase64'
import { toast } from 'react-toastify'


const AddBlogs = () => {
  const [title, setTitle] = useState("")
  const [description , setDescription ] = useState("")
  const [image , setImage] = useState("")
  const [loading, setLoading] = useState(false)
  const backendLink = useSelector(state=>state.prod.link)
  const [category, setCategory] = useState("")
  const [actualCategory, setActualCategory] = useState()
  const [categoryId, setCategoryId] = useState()

  const uploadImage =async(e)=>{
    // console.log(e.target.files);
    
    const data = await ImageToBase64(e.target.files[0])
  //console.log(data)
    setImage(data )

  }

  const handleAddBlog = async(e)=>{
    e.preventDefault()
    try{
      setLoading(true)
    const res = await axios.post(`${backendLink}/api/v1/admin/addBlog`,{
      title,
      description,
      image,
      categoryId
    },
  {
    withCredentials : true
  })
  toast.success(res.data.message);


  setTitle("")
  setDescription("")
  setImage("")
  setCategoryId("")
  setLoading(false)
  
    }
    catch(err){
      setLoading(false)
      toast.error(err.response.data.message);
      console.log(err);
      
      
    }

    
  }

  const handleCategory = async(e)=>{
    e.preventDefault()
    try{
      const res = await axios.post(`${backendLink}/api/v1/category/addCategory`,{category},{
        withCredentials : true
      })
      console.log(res);
      
      toast.success(res.data.message);
       setCategory(" ")
      
    }
    catch(err){
     toast.error(err.response.data.message);
      // console.log(err);
      
    }
  }

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
    <div className='p-4 h-screen'>
      <h1 className='text-2xl font-semibold'>Add Blogs</h1>

      <form action='' className='my-4 flex flex-col gap-4' onSubmit={handleAddBlog}>
        <input
            type='text'
            placeholder='Title'
            
            onChange={(e)=>{
              setTitle(e.target.value)
            }}
            className=' outline-none p-4 bg-transparent text-3xl border-b font-semibold w-full border-zinc-700 '
            />

        <textarea
             type='Description'
             placeholder='Description'
             onChange={(e)=>{
               setDescription(e.target.value)
             }}
             className=' outline-none p-3 bg-transparent text-2xl border-b font-semibold w-full border-zinc-700 '
        />
        
        <div className='flex items-center justify-between'>
            <input 
            type='file' 
            accept='.jpeg, .jpg, .png' 
            onChange={ uploadImage}

            alt='' 
            className='bg-zinc-900 rounded text-white'></input>
            <select name='category ' className='px-4 py-2 rounded shadow' id=''  onClick={(e)=>setCategoryId(e.target.value)}>
              <option value="">Select Category</option>
              {
                actualCategory && actualCategory.map((items,i)=>(
                  <option value={items.title} key={i}>{items.title}</option>
                ))
              }
              
            </select>
        </div>

    <div>
      {
        loading ? (
          <div>
            <button className='bg-blue-300 rounded w-fit  transition-all duration-300 px-4 py-2 shadow-xl text-white'>Adding Blogs .....</button>
            </div>
        ): (
          <button className='bg-blue-500 rounded hover:bg-blue-700 transition-all duration-300 px-4 py-2 shadow-xl text-white'>Add Blog</button>
        )
      }
        
        </div>
      </form>

      <hr/>
      <h1 className='text-2xl font-semibold'>Add new Category</h1>
      <form className='mt-4' onSubmit={handleCategory}>
        <input type='text'
        placeholder='New Category'
        className='bg-none border outline-none px-4 py-2 rounded bg-gray-50'
        required
        onChange={(e)=>{
          setCategory(e.target.value)
        }}

        />
        <button className='ms-4 bg-blue-500 px-4 py-2 rounded text-white hover:bg-blue-700'>Add Category</button>
      </form>
    </div>
  )
}

export default AddBlogs
