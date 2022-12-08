import React, { useContext } from 'react';
import { SidebarContext } from '../contexts/SidebarContext';
import { CartContext } from '../contexts/CartContext';
import {BsBag} from 'react-icons/bs'
import { Link } from 'react-router-dom';
import logo from '../img/logo.svg'
import { useState } from 'react';
import { useEffect } from 'react';

const Header = () => {
  //header state
  const [isActive, setIsActive] = useState(false)
  const {isOpen,setIsOpen} = useContext(SidebarContext);
  const {itemAmount} = useContext(CartContext);
  //even listern
  useEffect(()=>{
    window.addEventListener('scroll', ()=>{
      window.scrollY > 60 ? setIsActive(true) : setIsActive(false);
    })
  })
  return (
  <header className={`${isActive? 'bg-white py-4 shadow-md':'bg-none py-6'} fixed w-full z-10`}>
    <div className='flex container mx-auto items-center justify-between h-full translate-all' >
    {/* logo */}
    <Link to={'/'}>
      <div>
        <img className='w-[40px]' src={logo} alt="" />
      </div>
    </Link>
      {/* cart */}
      <div className='cursor-pointer flex relative' onClick={()=> setIsOpen(!isOpen)}>
        <BsBag className='text-2xl '/>
        <div className='bg-red-500 absolute -right-2 -bottom-2 text-[12px] w-[18px] h-[18px] rounded-full flex justify-center items-center text-white'>{itemAmount}</div>
        
      </div>
    </div>
  </header>
  );
};

export default Header;
