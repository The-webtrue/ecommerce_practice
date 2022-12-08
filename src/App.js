import React from 'react';
import {BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';
// toast import
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return <div className='overflow-hidden'>
    <Router>
      <Header/>
      <Routes>
        <Route path='/' element={<Home></Home>}></Route>
        <Route path='product/:id' element={<ProductDetails></ProductDetails>}></Route>
      </Routes>
      <Sidebar/>
      <Footer/>
    </Router>
    <ToastContainer />
  </div>;
};

export default App;
