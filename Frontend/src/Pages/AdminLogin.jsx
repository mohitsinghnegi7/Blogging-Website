import React, { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'


const AdminLogin = () => {
  const backendLink = useSelector(state=>state.prod.link)
  const navigate = useNavigate()
    const [inputs, setInputs] = useState({
        email : "",
        password : ""
      })
    
      const change = (e)=>{
        const {name, value} = e.target;
        setInputs({
          ...inputs, [name] : value
        })
      }

      const handleLogin = async(e)=>{
        e.preventDefault()
        
          try{
          const res =   await axios.post(`${backendLink}/api/v1/admin/login`,
              inputs
            ,{
              withCredentials : true
            })
      console.log(res);
      
            // dispatch(authAction.login())
      
            toast.success(res.data.message);
            navigate('/admin-dashboard')
        }
        catch(err){
          //console.log(err);
          toast.error(err.response.data.message);
        }
      }

  return (
     <div className='h-screen flex items-center justify-center'>
    <div className=' p-4 shadow-2xl roundedw-[80%] md:w-[60%] lg:w-[40%] flex  flex-col items-center justify-center'>
      <div className='text-2xl flex flex-col lg:flex-row gap-2 text-center '>
        <h1 className='font-bold'>Admin Login! </h1>
      <span>Please Login here</span>
      </div>
    <form action='' onSubmit={handleLogin} className='flex flex-col w-[100%] mt-5 '>
      
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
        <button className='bg-blue-500 text-white w-[100%]  py-2 rounded hover:bg-blue-700'>Login</button>
      </div>
    </form>
   
    </div>
    </div>
  )
}

export default AdminLogin
