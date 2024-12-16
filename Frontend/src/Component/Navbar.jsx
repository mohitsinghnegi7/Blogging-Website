import React from 'react'
import { Link } from 'react-router-dom'
import { IoReorderThreeOutline } from "react-icons/io5";
import { useSelector } from 'react-redux';


function Navbar() {
  const links = [
    {
      name : "Home",
      to : '/'
    },
    {
      name : "All Blogs",
      to : "/all-blogs"
    },
    {
      name : "Profile",
      to : "/profile"
    },
    {
      name : "Login",
      to : "/login"
    }
  ]

  const isLoggedIn = useSelector(state=>state.auth.isLoggedIn)

  if(!isLoggedIn){
    links.splice(2,1);
  }
  else{
    links.splice(3,1)
  }


  return (
    <div>
      <nav className='flex items-center justify-between px-3 py-2 border-b-2 m-2 border-zinc-300'>
        <div className='brandName'>
        <Link to={"/"} className='text-xl font-semibold'>
        Blog Website
        </Link>

        </div>
        <div className='hidden lg:flex items-center '>
          {links.map((item,i)=>(
            <Link className='ms-8 hover:text-blue-600 hover:underline transition-all duration-300' key={i} to={item.to}>
              {item.name}
            </Link>
          ))}
         {!isLoggedIn &&  <Link className='bg-black hover:bg-blue-500 text-white p-1 px-3 mx-8 rounded-md' to={'/signup'}>
         SignUp</Link>}
        </div>
        <div className='block lg:hidden items-center text-3xl'>
        <button><IoReorderThreeOutline /></button>
        </div>
      </nav>
    </div>
  )
}

export default Navbar
