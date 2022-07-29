import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { Service } from '../components';

const Context = createContext();

export const StateContext = ({ children }) => {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantities, setTotalQuantities] = useState(0);
  const [qty, setQty] = useState(1);

  let foundService;
  let index;

  const onAdd = (service, quantity) => {
    const checkServiceInCart = cartItems.find((item) => item._id === service._id);
    
    setTotalPrice((prevTotalPrice) => prevTotalPrice + service.price * quantity);
    setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);
    
    if(checkServiceInCart) {
      const updatedCartItems = cartItems.map((cartService) => {
        if(cartService._id === Service._id) return {
          ...cartService,
          quantity: cartService.quantity + quantity
        }
      })

      setCartItems(updatedCartItems);
    } else {
      service.quantity = quantity;
      
      setCartItems([...cartItems, { ...service }]);
    }

    toast.success(`${qty} ${service.name} added to the cart.`);
  } 

  const onRemove = (service) => {
    foundService = cartItems.find((item) => item._id === service._id);
    const newCartItems = cartItems.filter((item) => item._id !== service._id);

    setTotalPrice((prevTotalPrice) => prevTotalPrice -foundService.price * foundService.quantity);
    setTotalQuantities(prevTotalQuantities => prevTotalQuantities - foundService.quantity);
    setCartItems(newCartItems);
  }

  const toggleCartItemQuanitity = (id, value) => {
    foundService = cartItems.find((item) => item._id === id)
    index = cartItems.findIndex((service) => service._id === id);
    const newCartItems = cartItems.filter((item) => item._id !== id)

    if(value === 'inc') {
      setCartItems([...newCartItems, { ...foundService, quantity: foundService.quantity + 1 } ]);
      setTotalPrice((prevTotalPrice) => prevTotalPrice + foundService.price)
      setTotalQuantities(prevTotalQuantities => prevTotalQuantities + 1)
    } else if(value === 'dec') {
      if (foundService.quantity > 1) {
        setCartItems([...newCartItems, { ...foundService, quantity: foundService.quantity - 1 } ]);
        setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price)
        setTotalQuantities(prevTotalQuantities => prevTotalQuantities - 1)
      }
    }
  }

  const incQty = () => {
    setQty((prevQty) => prevQty + 1);
  }

  const decQty = () => {
    setQty((prevQty) => {
      if(prevQty - 1 < 1) return 1;
     
      return prevQty - 1;
    });
  }

  return (
    <Context.Provider
      value={{
        showCart,
        setShowCart,
        cartItems,
        totalPrice,
        totalQuantities,
        qty,
        incQty,
        decQty,
        onAdd,
        toggleCartItemQuanitity,
        onRemove,
        setCartItems,
        setTotalPrice,
        setTotalQuantities 
      }}
    >
      {children}
    </Context.Provider>
  )
}

export const useStateContext = () => useContext(Context);