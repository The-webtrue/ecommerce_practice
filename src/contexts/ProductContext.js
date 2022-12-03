import React from 'react';
import {createContext, useState, useEffect} from 'react';

// crerate context
export const ProductContext = createContext();

const ProductProvider = ({children}) => {
  const [products, setProducts] = useState([]);
  // fetch products
  useEffect(()=>{
    const fetchProducts = async ()=>{
      const respons = await fetch('https://fakestoreapi.com/products');
      const data = await respons.json();
      // console.log(data);
      setProducts(data);
    };
    fetchProducts();
  },[])
  return <ProductContext.Provider value={{products}}>{children}</ProductContext.Provider>;
};

export default ProductProvider;
