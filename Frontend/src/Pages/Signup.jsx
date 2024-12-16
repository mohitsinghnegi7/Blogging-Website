import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {toast} from 'react-toastify'
import axios from 'axios'
import { useSelector } from 'react-redux'

function Signup() {
  const navigate = useNavigate()
  const backendLink = useSelector((state)=>state.prod.link)

  const [inputs, setInputs] = useState({
    userName : "",
    email : "",
    password : ""
  })

  const change = (e)=>{
    const {name, value} = e.target;
    setInputs({
      ...inputs, [name] : value
    })
  }

  const submitHandle = async(e)=>{
    e.preventDefault()
    try{
    const res =   await axios.post(`${backendLink}/api/v1/users/signup`,
        inputs
      ,{
        withCredentials : true
      })

      toast.success(res.data.message);
      navigate('/login')
    }
    catch(err){
toast.error(err.response.data.message);

    }
    finally{
      setInputs({
        userName : "",
        email : "",
        password : ""
      })
    }
  }

  return (
    <div className='h-screen flex items-center justify-center'>
      <div className=' p-4 shadow-2xl rounded w-[80%] md:w-[60%] lg:w-[40%] flex  flex-col items-center justify-center'>
        <div className='text-2xl flex flex-col lg:flex-row gap-2 text-center '>
          <h1 className='font-bold'>Welcome : </h1>
        <span>Signup as a new user</span>
        </div>
      <form action='' onSubmit={submitHandle} className='flex flex-col w-[100%] mt-5 '>
        <div className='flex flex-col m-4  '>
          <label className='pr-3'>Username : </label>
          <input 
          type='text' 
          value={inputs.userName}
          name='userName' 
          required
          onChange={change}
          className='outline-none p-2 border mt-2 border-zinc-400 w-full rounded '/>
          
          </div>

          <div className='flex flex-col mr-4 ml-4 mb-4 '>
          <label className='pr-3'>Email : </label>
          <input 
          type='email' 
          name='email' 
          value={inputs.email} 
          onChange={change}
          className='outline-none p-2 border mt-2 border-zinc-400 rounded'/>
          </div>

          <div className='flex flex-col mr-4 ml-4 mb-4 '>
          <label className='pr-3'>Password : </label>
          <input 
          type='password' 
          required
          name='password' 
          value={inputs.password} 
          onChange={change}
          className='outline-none mt-2 p-2 border rounded border-zinc-400'/>
          </div>

        <div className='flex mr-4 ml-4 mt-4 mb-2'>
          <button className='bg-blue-500 text-white w-[100%]  py-2 rounded hover:bg-blue-700'>Signup</button>
        </div>

      </form>
      <h4 className='mt-3'>
        Already have an account? 
        <Link to="/login" className="text-blue-600 hover:text-blue-700 hover:font-semibold hover:underline" >  Login</Link>
        
        
      </h4>
      </div>
      
    </div>
  )
}

export default Signup
