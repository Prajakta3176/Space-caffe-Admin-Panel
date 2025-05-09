import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";
import Loader from '../components/loaders/Loader';

export default function List() {
  const [foodItems, setFoodItems] = useState([]);

  const headers = {
    id : localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`
  }

  const fetch = async () => {
    const res = await axios.get("https://space-caffe-backend.vercel.app/api/food/get-all-food-items");
    setFoodItems(res.data.data);
  };

  useEffect(() => {
   
    fetch();
  }, []);

  const handleDelete = async (foodid) => { 
    try{
        const confirm = window.confirm("Do you want to delete this item?");
        if(!confirm) return;
        const res = await axios.delete(`https://space-caffe-backend.vercel.app/api/food/delete-food-item/${foodid}`,{headers});
        console.log(res.data);
        fetch();
    }catch(err){
        console.log(err);
    }
 }

  return (
    <div className='w-full px-5 text-center py-7 flex flex-col gap-5'>
      <h1 className=' text-start text-3xl font-bold mb-6 text-white'> 📋 List of items</h1>

      <div>
        {foodItems.length > 0 ? (
          <table className='w-full border border-amber-500 rounded-lg'>
            <thead className='bg-amber-500 text-white'>
              <tr>
                <th className='p-2'>Name</th>
                <th className='p-2'>Category</th>
                <th className='p-2 hidden md:block'>Description</th>
                <th className='p-2'>Price</th>
                <th className='p-2'>Image</th>
                <th className='p-2 hidden md:block'>Actions</th>
              </tr>
            </thead>
            <tbody>
              {foodItems.map((item) => (
                <tr key={item._id}>
                  <td className='p-2'>
                    <NavLink to={`/food-details/${item._id}`}>{item.name}</NavLink>
                  </td>
                  <td className='p-2'>{item.category}</td>
                  <td className='p-2 hidden md:block'>{item.description.slice(0, 40)}...</td>
                  <td className='p-2'>₹{item.price}</td>
                  <td className='p-2'>
                    <img src={item.image} alt={item.name} width="50" />
                  </td>
                  <td className='p-2  gap-2 justify-center hidden md:flex'>
                    <Link to={`/update-item/${item._id}`} className=' text-white px-3 py-1 rounded hover:text-blue-600'>
                      <FaRegEdit />
                    </Link>
                    <button onClick={()=>{handleDelete(item._id)}} className='bg-red-500 text-white px-2 py-1 rounded hover:bg-white hover:text-red-500'>
                    <MdOutlineDelete />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <Loader/>
        )}
      </div>
    </div>
  );
}
