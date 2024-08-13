'use client'

import React from 'react';
import {useCart} from "../../app/store/add-cart";



const CartDrawer = () => {
    const { cart,  toggleDrawer } = useCart();
    return (
        <div>
            <div className="fixed top-4 right-4">
                <button className="relative" onClick={toggleDrawer}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                        className="w-6 h-6"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h18l-2 13H5L3 3z"/>
                        <path strokeLinecap="round" strokeLinejoin="round"
                              d="M16 14.5a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0zM18 18a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"/>
                    </svg>
                    {cart.length > 0 && (
                        <span
                            className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
                            {cart.length}
                        </span>
                    )}
                </button>
            </div>
        </div>
    );
};

export default CartDrawer;