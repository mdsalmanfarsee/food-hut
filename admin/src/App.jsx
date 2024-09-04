import React from 'react'
import Navbar from './components/Navbar/Navbar'
import Sidebar from './components/sidebar/Sidebar'
import { Route, Routes } from 'react-router-dom'
import Add from './pages/Add/Add'
import Order from './pages/Order/Order'
import List from './pages/List/List'
import { ToastContainer } from 'react-toastify'; //add notification
import 'react-toastify/dist/ReactToastify.css';



const App = () => {
  //const url = 'https://foodhut-backend-rbo7.onrender.com'
  //const url = 'http://localhost:5175';
  const url = "https://food-hut-gules.vercel.app";
  return (
    <div>
      <ToastContainer />
      <Navbar />
      <hr />
      <div className="app-content">
        <Sidebar />
        <Routes>
          <Route path='/add' element={<Add url={url} />} />
          <Route path='/list' element={<List url={url} />} />
          <Route path='/order' element={<Order url={url} />} />
        </Routes>
      </div>
    </div>
  )
}

export default App