import React from 'react'
import Navbar from '../Component/Navbar.jsx'
import Footer from '../Component/Footer.jsx'
import { Outlet } from 'react-router-dom'

function MainLayout() {
  return (
    <div className=''>
    <Navbar/>
      <main className='px-3 my-4'><Outlet/></main>
    <Footer/>
    </div>
  )
}

export default MainLayout
