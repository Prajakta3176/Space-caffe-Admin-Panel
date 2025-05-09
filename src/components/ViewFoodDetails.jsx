import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { FaRegEdit } from 'react-icons/fa';
import { MdOutlineDelete } from 'react-icons/md';
// import ReviewSection from '../review/ReviewSection';
import { useNavigate } from 'react-router-dom';
import ParticleLoader from './loaders/Particleloader';

export default function ViewFoodDetails() {

  const { foodid } = useParams();
  const [foodData, setFoodData] = useState({});
  const [loading, setLoading] = useState(true);
  const isLoggedIn = useSelector((state)=> state.auth.isLoggedIn);
  const navigate = useNavigate();

  useEffect(() => {

    const fetchFood = async () => {
      try {
        const res = await axios.get(`https://space-caffe-backend.vercel.app/api/food/get-food-item-by-id/${foodid}`);
        setFoodData(res.data.foodItem);
        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch food item:', err);
      }
    };

    fetchFood();
  }, [foodid]);


  if (loading) {
    return (
      <ParticleLoader/>
    );
  }

  const headers = {
    id : '6803b60fd97d0d4662e66c8e',
    authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4MDNiNjBmZDk3ZDBkNDY2MmU2NmM4ZSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTc0NTA3MzcwNiwiZXhwIjoxNzQ2MzY5NzA2fQ.NUlQAnSHi17dDXrhOOb76M6U6nC_cih2YsyNYhAWRWw`,
  }

const handleDelete = async () => { 

    try{
        const confirm = window.confirm("Do you want to delete this item?");
        if(!confirm) return;
        const res = await axios.delete(`https://space-caffe-backend.vercel.app/api/food/delete-food-item/${foodid}`,{headers});
        console.log(res.data);
        navigate("/list-of-items");
    }catch(err){
        console.log(err);
    }
 }



  return (
    <div className="w-full min-h-screen  bg-cover bg-center flex flex-col items-center justify-center px-4 py-10">
      <div className="relative rounded-2xl p-6 md:p-10 w-full max-w-5xl flex flex-col md:flex-row gap-6">
        
        {/* Glass background */}
        <div className="absolute inset-0 bg-[#0b0f2f] opacity-60 backdrop-blur-sm rounded-2xl z-0"></div>

        {/* Actual content */}
        <div className="relative z-10 text-white w-[100%] md:w-[50%]">
          <div className=" p-2 rounded-xl shadow-xl hover:scale-105 transition-all duration-300 w-full flex items-center justify-center">
            <img
              src={foodData.image}
              alt={foodData.name}
              className="rounded-xl object-cover"
            />
          </div>
        </div>

        <div className="relative z-10 w-full md:w-1/2 text-white">
          <h1 className="text-3xl md:text-4xl font-bold tracking-widest text-zinc-200 mb-4">{foodData.name}</h1>
          <p className="text-sm text-zinc-300 mb-4">{foodData.description}</p>

          <p className="text-xl font-semibold text-zinc-200 mb-2">&#8377; {foodData.price} /-</p>

          <div className="flex items-center text-amber-400 text-xl mb-4">
            {Array.from({ length: 5 }, (_, i) => (
              <span key={i}>{i < foodData.averageRating ? '★' : '☆'}</span>
            ))}
            <span className="ml-2 text-white">{parseFloat(foodData.averageRating).toFixed(1)}</span>
          </div>

          <div className='flex gap-2 items-center justify-between w-[30%]'>
            <Link to={`/update-item/${foodid}`} className=' text-white text-xl font-semibold bg-blue-500 flex gap-2 items-center justify-center px-3 py-1 rounded hover:text-blue-500 hover:bg-white'>
                Edit <FaRegEdit />
            </Link>
            <button onClick={handleDelete} className='bg-red-500 font-semibold text-white text-xl  px-2 py-1 rounded hover:bg-white flex gap-2 items-center justify-center hover:text-red-500'>
            Delete <MdOutlineDelete />
            </button>
        </div>
         
        </div>
        
      </div>
      <div className='w-full'>
      {/* <ReviewSection foodData={foodData} foodid={foodid}/> */}

      </div>
    </div>
  );
}
