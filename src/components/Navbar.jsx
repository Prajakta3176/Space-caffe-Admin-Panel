import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import { FaUserAstronaut } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { authActions } from '../store/auth';
// import { logout } from '../store/auth'; // if using redux

export default function Navbar() {
  const [showDropdown, setShowDropdown] = useState(false);
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn); // redux state
  const dispatch = useDispatch();

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleLogout = () => {
    dispatch(authActions.logout());
    setShowDropdown(false);
  };

  return (
    <div className='flex justify-between items-center py-4 px-7 h-[70px] w-full relative'>
      <Link to='/'><img src='' alt='Logo' /></Link>

      <p className='text-3xl text-amber-500 font-bold text-center'>Admin Panel</p>

      <div className='relative'>
        <div
          className='hover:text-amber-500 cursor-pointer'
          onClick={toggleDropdown}
        >
          <FaUserAstronaut size={25} />
        </div>

        {showDropdown && (
          <div className='absolute right-0 mt-2 from-black to-[#717c96] border-1 text-white rounded shadow-lg w-40 p-2 z-50'>
            {!isLoggedIn ? (
              <>
                <Link to='/sign-in' className='block px-4 py-2 hover:text-amber-500' onClick={() => setShowDropdown(false)}>Sign In</Link>
                <Link to='/sign-up' className='block px-4 py-2 hover:text-amber-500' onClick={() => setShowDropdown(false)}>Sign Up</Link>
              </>
            ) : (
              <>
                <span className='block px-4 py-2 text-sm text-gray-500'>Hello, Admin 👋</span>
                <button
                  onClick={handleLogout}
                  className='w-full text-left px-4 py-2 hover:text-amber-500'
                >
                  Logout
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
