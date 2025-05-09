import React, { useEffect } from 'react'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import Footer from './components/Footer'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Add from './pages/Add'
import List from './pages/List'
import Orders from './pages/Orders'
import ViewFoodDetails from './components/ViewFoodDetails'
import { useState } from 'react'
import Update from './pages/Update'
// import ParticleLoader from './components/loaders/Particleloader'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import ProtectedRoute from './components/ProtectedRoute'
import { useDispatch } from 'react-redux'
import { authActions } from './store/auth'


const App = () => {

  const dispatch = useDispatch();
  useEffect(()=>{
    if(localStorage.getItem('id') &&
    localStorage.getItem('token')
    ){
      dispatch(authActions.login());
    }
  },[])
  
  
  return (
    <div className='mainBody text-white'>
        <Navbar/>
        <hr />
        <div className='flex flex-row'>
         <Sidebar/>
       
            <Routes>
              <Route path='/sign-in' element={<SignIn />} />
              <Route path='/sign-up' element={<SignUp />} />
              <Route path='/add-item' element={<ProtectedRoute><Add /></ProtectedRoute>} />
              <Route path='/update-item/:foodid' element={<ProtectedRoute><Update /></ProtectedRoute>} />
              <Route path='/list-of-items' element={<ProtectedRoute><List/></ProtectedRoute>} />
              <Route path='/' element={<ProtectedRoute><List/></ProtectedRoute>} />
              <Route path='/orders' element={<ProtectedRoute><Orders/></ProtectedRoute>} />
              <Route path='/food-details/:foodid' element={<ProtectedRoute><ViewFoodDetails /></ProtectedRoute>} />

            </Routes>
          
        </div>
        <hr />
        <Footer/>
    </div>
  )
}

export default App