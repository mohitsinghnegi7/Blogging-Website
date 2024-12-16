import React from 'react'

const UpdateBlog = () => {
  return (
    <div className='p-4 h-screen'>
    <h1 className='text-2xl font-semibold'>Update Blog</h1>

    <form action='' className='my-4 flex flex-col gap-4'>
      <input
          type='text'
          placeholder='Title'
          className=' outline-none p-4 bg-transparent text-3xl border-b font-semibold w-full border-zinc-700 '
          />

      <textarea
           type='Description'
           placeholder='Description'
           className=' outline-none p-3 bg-transparent text-2xl border-b font-semibold w-full border-zinc-700 '
      />
      
      <div>
          <input 
          type='file' 
          accept='.jpeg, .jpg, .png' 
          alt='' 
          className='bg-zinc-900 rounded text-white'></input>
      </div>

  <div>
      <button className='bg-blue-500 rounded hover:bg-blue-700 transition-all duration-300 px-4 py-2 shadow-xl text-white'>Update Blog</button>
      </div>
    </form>
  </div>
  )
}

export default UpdateBlog
