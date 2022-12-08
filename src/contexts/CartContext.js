import React, {createContext, useState, useEffect} from 'react';
import { toast } from 'react-toastify';

// create context
export const CartContext = createContext();
const CartProvider = ({children}) => {
  //cart state
  const [cart, setCart] = useState([]);

  // item amount state
  const [itemAmount, setItemAmount] = useState(0);

  //total price state
  const [total, setTotal] = useState(0);
  useEffect(()=>{
    const total = cart.reduce((accumulator, currentItem)=>{
      return accumulator + currentItem.price * currentItem.amount
    }, 0);
    setTotal(total)
  })

  // update item amount
  useEffect(()=>{
    if(cart){
      const amount = cart.reduce((accumulator, currentItem)=>{
        return accumulator + currentItem.amount;
      }, 0);
      setItemAmount(amount)
    }
  });
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
    toast.success(`Added Successfully ${cartItem.amount + 1} times`)
   
   }
   else{
    setCart([...cart, newItem]);
    toast.success('Added Successfully')
   }
  };
  
  // remove item from cart
  const removeFromCart = (id)=>{
    const newCart = cart.filter(item=>{
      return item.id !== id;
    })
    setCart(newCart);
    toast.success('Item Deleted Successfully');
  }
  //cclear cart
  const clearCart = ()=>{
    setCart([]);
    toast.success('Cart Clear Successfully');
  };

  // incrase amount
  const increaseAmount = (id)=>{
   const cartItem = cart.find((item)=> item.id === id);
   addToCart(cartItem, id);
  };

  //decrease amoutn
  const decreaseAmoutn = (id)=>{
    const cartItem = cart.find(item=> {
      return item.id === id;
    });
    if(cartItem){
      const newCart = cart.map(item=>{
        if(item.id === id){
          return{...item, amount: cartItem.amount - 1}
        } else{
          return item;
        }
      });
      setCart(newCart);
    } 
      if(cartItem.amount < 2){
        removeFromCart(id)
      }
    
    
  }
  return( 
  <CartContext.Provider value={{
    addToCart, 
    cart, 
    removeFromCart, 
    clearCart, 
    increaseAmount, 
    decreaseAmoutn,
    itemAmount,
    total
    }}>
    {children}
    </CartContext.Provider>);
};

export default CartProvider;
