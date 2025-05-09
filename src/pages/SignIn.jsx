import React, { useState } from 'react'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../store/auth';
import SketchfabModel from '../animation/SketchfabModel';
import homePageAnimation from '../animation/homePageAnimation2.json';
import Lottie from "lottie-react";
import Loader from '../components/loaders/Loader';



export default function SignIn() {
    const [userData, setUserData] = useState({
        email: "",
        number : "",
        password : ""
    })

    const isLoggedIn = useSelector((state => state.auth.isLoggedIn));
    const dispatch = useDispatch();
    console.log(isLoggedIn);

    const [loginWithNumber, setLoginWithNumber] = useState(false);
    const navigate = useNavigate()



    const handleChange = (e)=>{
        const {name, value} = e.target;
        setUserData((prev)=>({
            ...prev, [name] : value
        }))
    }
    const handleSubmit = (e)=>{
        
        e.preventDefault();
        const fetch = async()=>{
            try{
            const res = await axios.post('https://space-caffe-backend.vercel.app/api/admin/admin-signin',userData);
            
            console.log(res.data);
            dispatch(authActions.login());
            localStorage.setItem("id" , res?.data?.id);
            localStorage.setItem("token" , res?.data?.token);
            alert("Signed In successfully");
            navigate('/');


            }catch(err){
                console.log(err.response.data);
                alert(err.response.data.message)
            }
        }

        fetch();
        setUserData({
            email: "",
            number : "",
            password : ""
        })
    }

    const handleNumber = (e)=>{
        e.preventDefault()
        console.log(loginWithNumber);
        setLoginWithNumber(!loginWithNumber)
    }


  return (
    <div className=' min-h-screen w-full flex items-center justify-center pt-10'>
            

  <div className='w-full md:w-[80%] h-auto p-8 rounded z-10 flex flex-col lg:flex-row gap-5'>
    {/* <Loader/> */}
                   <div className='w-full  lg:w-3/6 flex flex-col gap-8'>
                   <h1 className='font-md text-3xl lg:text-4xl font-bold text-blue-500 tracking-widest text-center '> SIGN IN  (for Admin)   </h1>
                   
                    <form action="" className='flex flex-col gap-6 w-full items-center'>                       

                        {
                            loginWithNumber ? 
                            (<div className='flex flex-col w-full gap-1'>
                                <label className='text-white' htmlFor="number">Number</label>
                                <input onChange={handleChange} className='bg-white/10 backdrop-blur-md text-white placeholder-white/70 focus:outline-none p-4 rounded-2xl' id='number' name='number' type="number"  value={userData.number}  />
                                </div>
                            ) : (
                                <div className='flex flex-col w-full gap-1'>
                                <label className='text-white' htmlFor="email">Email</label>
                                <input onChange={handleChange} className='bg-white/10 backdrop-blur-md text-white placeholder-white/70 focus:outline-none p-4 rounded-2xl' id='email' name='email' type="email" placeholder='Enter registered email'  value={userData.email}  />
                                </div>
                            )

                        }
                                               
                        
                        <div className='flex flex-col w-full gap-1'>
                            <label className='text-white' htmlFor="password">Password</label>
                            <input onChange={handleChange} className='bg-white/10 backdrop-blur-md text-white placeholder-white/70 focus:outline-none p-4 rounded-2xl' id='password' name='password' type="password" placeholder='Enter password'  value={userData.password}  />
                        </div>

                        <button onClick={handleSubmit} className='bg-custom-radial hover:bg-blue-500  border-2 border-blue-600  w-full rounded py-3 text-white font-semibold text-xl hover:rounded-4xl transition-all duration-500'>Sign in</button>

                        {/* <button onClick={handleNumber} className='text-blue-900 font-semibold hover:text-blue-700'>Sign in with {!loginWithNumber ? 'Number' : 'Email'}</button> */}
                        <div className='flex items-center gap-1'>
                        <div className='h-[1px] w-[50%] text-white bg-white'></div> <span className='text-white mx-2'>Or</span> <div className='h-[1px] w-[50%] text-white bg-white'></div>
                        </div>
                        <p className=' text-white text-center'>DON'T HAVE AN ACCOUNT ?   <Link  to='/sign-up' className='text-center text-amber-600 font-bold hover:text-amber-800 transition-all duration-300  ml-4'>Sign Up</Link></p>
                    </form>
                   </div>
                   {/*hidden md:w-2/6 lg:w-3/6 */}
                   <div className='lg:w-3/6 w-full lg:flex items-start justify-start flex-grow '>
                         <Lottie id='homeAnimate' animationData={homePageAnimation} loop={true} style={{width:'100%'}} />
                   </div>
        </div>
    </div>
  )
}
