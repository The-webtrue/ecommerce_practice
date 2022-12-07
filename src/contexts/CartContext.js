import React, {createContext, useState, useEffect} from 'react';

// create context
export const CartContext = createContext();
const CartProvider = ({children}) => {
  //cart state
  const [cart, setCart] = useState([]);
  //add to cart
  const addToCart = (product,id) => {
    const newItem = {...product, amount:1}
   // check if the item is already in the cart
   const cartItem = cart.find((item)=>{
    return item.id === id;
   });
  // if cart itm is alrady in the cart
   if (cartItem){
    const newCart = [...cart].map(item =>{
      if (item.id === id){
        return {...item, amount: cartItem.amount + 1}
      } else{
        return item;
      }
    });
    setCart(newCart);
   }
   else{
    setCart([...cart, newItem])
   }
  };
  
  // remove item from cart
  const removeFromCart = (id)=>{
    const newCart = cart.filter(item=>{
      return item.id !== id;
    })
    setCart(newCart);
  }
  //cclear cart
  const clearCart = ()=>{
    setCart([]);
  }
  return( 
  <CartContext.Provider value={{addToCart, cart, removeFromCart, clearCart}}>
    {children}
    </CartContext.Provider>);
};

export default CartProvider;
