import React, { useState } from 'react'
import { FaArrowRight } from "react-icons/fa";
import { FaFileUpload } from "react-icons/fa";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function Update() {
    const [formData, setFormData] = useState({
        id : "",
        name: "",   
        category: "",
        description: "",  
        price: "",
        image: "",
      }); 
    const { foodid } = useParams();
    const [imageOption, setImageOption] = useState("url"); // "url" or "upload"
    // const [imageUrl, setImageUrl] = useState("");
    const navigate = useNavigate();

    useEffect(() => {  
        const fetchFood = async () => {
            try {
            const res = await axios.get(`https://space-caffe-backend.vercel.app/api/food/get-food-item-by-id/${foodid}`);
            setFormData((prev)=>{
                return {
                    id : res.data.foodItem._id,
                    name: res.data.foodItem.name,
                    category: res.data.foodItem.category,
                    description: res.data.foodItem.description,
                    price: res.data.foodItem.price,
                    image: res.data.foodItem.image,
                }
            });
            } catch (err) {
            console.error('Failed to fetch food item:', err);
            }
        };

        fetchFood();
      },[])
  

  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData((prev)=>({
      ...prev, [name] : value
    }));

  }

  const headers = {
     id : localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log(formData);
    const res = await axios.patch(`https://space-caffe-backend.vercel.app/api/food/update-food-item-details/${formData.id}`, {
        name: formData.name,
        description: formData.description,
        price: formData.price,
        image: formData.image,
        category: formData.category,
    }, {headers});
    console.log(res.data);
    navigate("/list-of-items");  
    setFormData({
      name: "",
      category: "",  
      description: "",
      price: "",
      image: "",
    })
  }



  return (
    <div className='w-full px-5'>
       <form className='flex flex-col gap-7 mx-auto mt-10 px-10 w-full md:w-[80%] bg-white/5 backdrop-blur-md py-10 rounded'>

            <div className='flex flex-col gap-2'>
                <label htmlFor="name">Name</label>
                <input onChange={handleChange} className='border-1 border-amber-500 rounded px-4 py-2 ' type="text" id="name" name="name" value={formData.name}  required />
            </div>
            <div className='flex flex-col gap-2'>
                <label htmlFor="description">Description</label>
                <input onChange={handleChange} className='border-1 border-amber-500 rounded px-4 py-2 ' type="text" id="description" name="description" value={formData.description} required />
            </div>
            <div className='flex flex-col gap-2'>
                <label htmlFor="price">Price</label>
                <input onChange={handleChange} className='border-1 border-amber-500 rounded px-4 py-2 ' type="number" id="price" name="price" value={formData.price} required />
            </div>
            <div className='flex flex-col gap-2'>
                <label htmlFor="category">Category</label>
                {/* <input onChange={handleChange} className='border-1 border-amber-500 rounded px-4 py-2 ' type="text" id="category" name="category" value={formData.category} required /> */}
                <select onChange={handleChange} className='text-white bg-[#0d1b2a] border-amber-500' name="category" id="category">
                  <option hidden value="">Select Category</option>
                  <option value="Pizza">Pizza</option>
                  <option value="Burger">Burger</option>
                  <option value="Sandwitch">Sandwitch</option>
                  <option value="French Fries">French Fries</option>
                  <option value="Beverages">Beverages</option>
                </select>
            </div>
            
          {imageOption === "url" ? (
              <div className='flex flex-col gap-2'>
                <label htmlFor="image">Image URL</label>
                <input onChange={handleChange}
                  className='border-1 border-amber-500 rounded px-4 py-2'
                  type="text"
                  id="image"
                  name="image"
                  value={formData.image}
                  placeholder="https://example.com/image.jpg"
                  required
                />
              </div>
             ) : "" // (
            //   <div className='flex flex-col gap-2'>
            //     <label htmlFor="imageFile">Upload Image</label>
            //     <input
            //       className='border-1 border-amber-500 rounded px-4 py-2'
            //       type="file"
            //       id="imageFile"
            //       name="imageFile"
            //       accept="image/*"
            //       onChange={(e) => setImageUrl(URL.createObjectURL(e.target.files[0]))} 
            //       required
            //     />
            //   </div>
            // )
            }
            {/* <div className='w-full flex items-center '>
                {imageOption === "upload" && imageUrl && (
                  <img src={imageUrl} alt="Preview" className="w-40 h-40 object-cover rounded" />
                )}
            </div> */}
            {/* <div className='flex gap-4'>
                <label onClick={()=>setImageOption("url")} className='flex items-center gap-2'>
                  <input type="radio" value="url" checked={imageOption === "url"}  />
                  <span className='ml-1'>Image URL</span>
                </label>
                <label onClick={()=>setImageOption("upload")} className='flex items-center gap-2'>
                  <input type="radio" value="upload" checked={imageOption === "upload"} />
                  <span className='ml-1'>Upload File</span>
                </label>
          </div> */}


            <button onClick={handleSubmit} className="bg-amber-500 rounded py-2 px-4 font-bold text-xl text-[#0d1b2a] flex items-center justify-center gap-2 transition-all duration-300 group">
                <p>Update Item</p>
                <span className="opacity-0 transform translate-x-[-10px] transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
                    <FaArrowRight />
                </span>
            </button>


        </form> 
    </div>
  )
  }
