import React, { useEffect, useState } from 'react'
import { IoIosAddCircleOutline } from "react-icons/io";
import { RiFileList3Fill } from "react-icons/ri";
import onlineshopping from "../assets/online-shopping.png"
import {NavLink } from 'react-router-dom';
import { PackageOpen } from "lucide-react";

export default function Sidebar() {
      const [isMobile, setIsMobile] = useState(window.innerWidth <=  500);
      useEffect(()=>{
        const handleResize=()=>{
           setIsMobile(window.innerWidth <=  500)
         }
         window.addEventListener('resize', handleResize);
     
         return () => {
           window.removeEventListener("resize", handleResize);
         };
       },[])
       console.log(isMobile);

  return (
    <div className='sidebar flex flex-col h-[100vh]  md:w-[20%] py-5 justify-between items-end border-1 border-white '>
        <div className='flex flex-col gap-6 '>
                <NavLink to='/add-item' className={`flex items-center gap-3 justify-around  p-2  border-0 md:border-1 px-5 md:px-10 hover:text-amber-500   transition-all duration-300`}>
                <IoIosAddCircleOutline size={30} />
                    <p className={`hidden md:block`}>Add Items</p>
                </NavLink>
                <NavLink to='/list-of-items' className={`flex items-center gap-3 justify-around p-2 border-0 md:border-1   px-5 md:px-10 hover:text-amber-500   transition-all duration-300`}>
                <RiFileList3Fill size={30} />
                    <p className={`hidden md:block`}>List Items</p>
                </NavLink>
                <NavLink to='/orders' className={`flex items-center gap-3 justify-around p-2  border-0 md:border-1 px-5 md:px-10 hover:text-amber-500   transition-all duration-300`}>
                  <PackageOpen className="w-7 h-7 text-primary" />                
                    <p className={`hidden md:block`}>Orders</p>
                </NavLink>
        </div>
    </div>
  )
}
