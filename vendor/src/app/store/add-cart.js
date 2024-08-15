'use client'
import React, { createContext, useState, useContext } from 'react';
import axios from 'axios';

const CartContext = createContext();
const baseurl = 'https://enterprise-backend-l6pn.onrender.com';
export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const addToCart = (meal, options) => {
        const existingItemIndex = cart.findIndex(item => item.mealId === meal._id && item.protein === options['protein'] && item.sauce === options['sauce'] && item.extras === options['extras']);

        if (existingItemIndex >= 0) {
            const updatedCart = [...cart];
            updatedCart[existingItemIndex].quantity += 1;
            updatedCart[existingItemIndex].price += meal.main.price;
            setCart(updatedCart);
        } else {
            const newCartItem = {
                mealId: meal._id,
                main: meal.main.name,
                price: meal.main.price,
                protein: options['protein'] || '',
                sauce: options['sauce'] || '',
                extras: options['extras'] || '',
                quantity: 1
            };
            setCart((prevCart) => [...prevCart, newCartItem]);
        }

        setTotalPrice((prevTotal) => prevTotal + meal.main.price);
    };

    const removeFromCart = (index) => {
        const item = cart[index];
        setTotalPrice((prevTotal) => prevTotal - (item.price * item.quantity));
        setCart((prevCart) => {
            const updatedCart = [...prevCart];
            updatedCart.splice(index, 1);
            return updatedCart;
        });
    };

    const incrementQuantity = (index) => {
        const updatedCart = [...cart];
        updatedCart[index].quantity += 1;
        updatedCart[index].price += updatedCart[index].price / (updatedCart[index].quantity - 1);
        setCart(updatedCart);
        setTotalPrice((prevTotal) => prevTotal + updatedCart[index].price / (updatedCart[index].quantity - 1));
    };

    const decrementQuantity = (index) => {
        const updatedCart = [...cart];
        if (updatedCart[index].quantity > 1) {
            updatedCart[index].quantity -= 1;
            updatedCart[index].price -= updatedCart[index].price / (updatedCart[index].quantity + 1);
            setCart(updatedCart);
            setTotalPrice((prevTotal) => prevTotal - updatedCart[index].price / (updatedCart[index].quantity + 1));
        }
    };

    const checkout = async () => {
        try {
            const response = await axios.post(`${baseurl}/api/order`, cart);
            console.log('Order submitted:', response.data);
            setCart([]);
            setTotalPrice(0);
            setIsDrawerOpen(false);
        } catch (error) {
            console.error('Error submitting order:', error);
        }
    };

    const toggleDrawer = () => {
        setIsDrawerOpen(!isDrawerOpen);
    };

    return (
        <CartContext.Provider value={{ cart, totalPrice, addToCart, removeFromCart, incrementQuantity, decrementQuantity, checkout, isDrawerOpen, toggleDrawer }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
