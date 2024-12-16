import React from 'react'
import Header from '../Component/header'
import Categories from '../Component/Categories'
import RecentBlogs from '../Component/RecentBlogs'
import blog from '../assets/blog.jpg'


function Home() {
  return (
    <div className='m-3'>
      <Header/>
      {/* <img src={blog} alt=''></img> */}
      <Categories/>
      <RecentBlogs/>
    </div>
  )
}

export default Home
