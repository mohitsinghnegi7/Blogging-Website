import React, { useEffect, useState } from 'react'
import { FaUser } from "react-icons/fa";
import { useSelector } from 'react-redux';
import axios from 'axios'
import { toast } from 'react-toastify';

const DashboardProfile = () => {
  
  const backendLink = useSelector(state=>state.prod.link)
  const [userData, setUserData] = useState(null) 
  
  useEffect(()=>{
    const fetch = async()=>{
  
      const res = await axios.get(`${backendLink}/api/v1/users/getProfileData`,{
        withCredentials : true
      })
      console.log(res.data.loggedInUser);
      
      setUserData(res.data.loggedInUser);
      
    }
    fetch();
  },[backendLink])


  
  
  const [passwords, setPassword] = useState({
    password : "",
    newPassword : "",
    confirmNewPassword : ""
  })

  const change = (e)=>{
    const {name, value} = e.target
    setPassword({...passwords,[name]: value})
  }
  
const handlePassword = async(e)=>{
  e.preventDefault()
  try{
    const res = await axios.patch(`${backendLink}/api/v1/users/changePassword`,passwords,{
      withCredentials : true
    })

    toast.success(res.data.message);
    // toast.success(res.data.data)
    
  }catch(err){
toast.error(err.response.data.error);
console.log(err);


  }
}



  return (
    <>
    {userData && <div className='flex flex-col'>
      <div className='flex flex-col md:flex-row items-center gap-8 md:gap-12'>
       <div>
       <div className='size-[16vh] rounded-full border-2 ml-4 overflow-hidden' >
        <div className='w-[100%] h-[100%] flex items-center justify-center ' >
          
              <FaUser className='size-[9vh] text-zinc-700' />
           
           </div>
        </div>
       
       </div>
       <div>
       {userData ? ( // Conditional rendering to ensure userData is not null
            <>
              <p className="text-zinc-600 text-normal md:text-2xl">{userData.email}</p>
              <h1 className="text-2xl md:text-5xl mt-2 font-semibold">{userData.userName}</h1>
            </>
          ) : (
            <p>Loading user data...</p> // Fallback content while fetching data
          )}
       </div>
      </div>
      <hr className='my-6'></hr>
      <div>
<form action='' onSubmit={handlePassword}>
  <div className='flex  flex-col'>
    <h1 className='text-2xl font-semibold mb-6'>Change Password</h1>
    <label htmlFor="">Current Password </label>
    <input 
        type='password' 
        placeholder='Current Password'
        required
        name='password' 
        value={passwords.password}
        onChange={change}
        className='outline-none mt-2 p-2 border rounded border-zinc-400 w-[44svh] md:w-[70vh]'/>
  </div>
  <div className='flex flex-col mt-4'>

    <label htmlFor="">New Password </label>
    <input 
        type='password' 
        placeholder='New Password'
        required
        name='newPassword' 
        value={passwords.newPassword}
         onChange={change}
        className='outline-none mt-2 p-2 border rounded border-zinc-400  w-[44vh] md:w-[70vh]'/>
  </div>
  <div className='flex flex-col mt-4'>

    <label htmlFor="" > Confirm New Password </label>
    <input 
        type='password' 
        placeholder='Confirm New Password'
        required
        name='confirmNewPassword' 
        value={passwords.confirmNewPassword}
         onChange={change}
        className='outline-none mt-2 p-2 border rounded border-zinc-400 w-[44vh] md:w-[70vh]'/>
  </div>
  <div className='mt-4'>
    <button className='bg-blue-600 hover:bg-blue-800 transition-all duration-300 text-white text-center px-4 py-2 rounded'>Update Password</button>

  </div>
</form>
      </div>

    </div>}</>
  )
}

export default DashboardProfile