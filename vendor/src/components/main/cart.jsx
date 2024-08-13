'use client'
import React from 'react';
import { useCart } from "@/app/store/add-cart";

const Cart = () => {
    const { cart, totalPrice, removeFromCart, incrementQuantity, decrementQuantity, checkout, isDrawerOpen, toggleDrawer } = useCart();

    return isDrawerOpen ? (
        <div className="fixed inset-0 z-50 flex">
            <div className="w-full max-w-md p-4 bg-white shadow-lg">
                <div className="flex items-center justify-between pb-4 border-b">
                    <h3 className="text-lg font-semibold">Cart</h3>
                    <button onClick={toggleDrawer} className="bg-black text-white">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="2"
                            stroke="currentColor"
                            className="w-6 h-6"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                {cart.length > 0 ? (
                    <ul className="space-y-4">
                        {cart.map((item, index) => (
                            <li key={index} className="flex justify-between items-center">
                                <div>
                                    <span>{item.main} - ${item.price.toFixed(2)}</span>
                                    <div className="text-sm text-gray-500">
                                        <div>Protein: {item.protein}</div>
                                        <div>Sauce: {item.sauce}</div>
                                        <div>Extras: {item.extras}</div>
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <button onClick={() => decrementQuantity(index)} className="px-2 py-1 text-white bg-red-600 hover:bg-red-700 rounded-l">-</button>
                                    <span className="px-4">{item.quantity}</span>
                                    <button onClick={() => incrementQuantity(index)} className="px-2 py-1 text-white bg-blue-600 hover:bg-blue-700 rounded-r">+</button>
                                    <button onClick={() => removeFromCart(index)} className="text-red-600 hover:text-red-800 ml-4">
                                        Remove
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No items in the cart.</p>
                )}
                <div className="pt-4 mt-4 border-t">
                    <p className="text-lg font-semibold">Total Price: ${totalPrice.toFixed(2)}</p>
                    <button onClick={checkout} className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                        Checkout
                    </button>
                </div>
            </div>
        </div>
    ) : null;
};

export default Cart;
