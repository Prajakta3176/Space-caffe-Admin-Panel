import React, { useState } from 'react'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import homePageAnimation from '../animation/homePageAnimation2.json';
import Lottie from "lottie-react";

export default function SignUp() {

    const [userData, setUserData] = useState({
        fullname : "",
        email: "",
        number : "",
        password : ""
    })
    const [inCorrectPass, setIncorrectPass] = useState(false);
    const navigate = useNavigate();


    const handleChange = (e)=>{
        const {name, value} = e.target;
        setUserData((prev)=>({
            ...prev, [name] : value
        }))
    }
    const handleSubmit = (e)=>{
        
        e.preventDefault();

        if(userData.password.length < 8){
            setIncorrectPass(true);
            return ;
        }

        if(userData.number.length < 10 || userData.number.length > 10){
            return alert("Please enter valid number.")
        }

        const fetch = async()=>{
            const res = await axios.post('https://space-caffe-backend.vercel.app/api/admin/admin-signup',userData);
            console.log(res.data.message);
            alert(res.data.message);
            navigate('/sign-in')
        }

        fetch();
        setUserData({
            fullname : "",
            email: "",
            number : "",
            password : ""
        })
    }



  return (
    <div className=' min-h-screen w-full flex items-center justify-center'>
        <div className='w-full md:w-[80%] h-auto p-8 rounded flex lg:flex-row flex-col-reverse gap-5'>
                <div className='lg:w-3/6 w-full lg:flex items-start justify-start flex-grow '>
                         <Lottie id='homeAnimate' animationData={homePageAnimation} loop={true} style={{width:'100%'}} />
                   </div>

                   <div className='w-full lg:w-3/6 flex flex-col gap-7'>
                   <h1 className='font-md text-3xl lg:text-4xl font-bold text-blue-500 tracking-widest text-center '> SIGN UP (for Admin)      </h1>
                    <form action="" className='flex flex-col gap-6 w-full'>
                        <div className='flex flex-col w-full gap-1'>
                        <label htmlFor="name">Name</label>
                        <input onChange={handleChange} className='bg-white/10 backdrop-blur-md text-white placeholder-white/70 focus:outline-none p-4 rounded-2xl' id='name' name='fullname' type="text" placeholder='Enter your fullname' value={userData.fullname} />
                        </div>

                        <div className='flex flex-col w-full gap-1'>
                        <label htmlFor="email">Email</label>
                        <input onChange={handleChange} className='bg-white/10 backdrop-blur-md text-white placeholder-white/70 focus:outline-none p-4 rounded-2xl' id='email' name='email' type="email" placeholder='Enter email' value={userData.email}  />
                        </div>

                        <div className='flex flex-col w-full gap-1'>
                        <label htmlFor="number">Number</label>
                        <input onChange={handleChange} className='bg-white/10 backdrop-blur-md text-white placeholder-white/70 focus:outline-none p-4 rounded-2xl' id='number' name='number' type="number" placeholder='Enter number' value={userData.number}  />
                        </div>
                        
                        <div className='flex flex-col w-full gap-1'>
                            <label htmlFor="password">Password</label>
                            <input onChange={handleChange} className={`bg-white/10 backdrop-blur-md text-white placeholder-white/70 focus:outline-none p-4 rounded-2xl ${inCorrectPass ? "border-2 border-red-600" : ""}`} id='password' name='password' type="password" placeholder='Enter strong password' value={userData.password}  />
                        </div>

                        <button onClick={handleSubmit} className='border border-blue-500 rounded py-3 text-white font-semibold text-xl hover:bg-blue-900 hover:rounded-4xl transition-all duration-400'>Sign up</button>
                        <p className='text-center font-semibold text-white'>Already have an account ? <Link to='/sign-in' className='text-amber-600 hover:underline transition-all duration-300'>Sign in</Link></p>
                    </form>
                   </div>
                 
                   
        </div>
    </div>
  )
}
