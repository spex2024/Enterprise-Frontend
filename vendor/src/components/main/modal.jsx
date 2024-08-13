'use client'

import React from 'react';

import {Label} from "../ui/label";
import {useSelectedMeal} from "@/app/store/select";
import {useCart} from "@/app/store/add-cart";
import {RadioGroup, RadioGroupItem} from "../ui/radio-group";



const MealModal = () => {
    const { selectedMeal, closeModal, handleOptionChange, selectedOptions } = useSelectedMeal();
    const { addToCart } = useCart();

    if (!selectedMeal) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-50">
            <div className="relative p-4 w-full max-w-2xl">
                <div className="relative bg-white rounded-lg shadow">
                    <div className="flex items-center justify-between p-4 border-b rounded-t">
                        <button
                            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg w-8 h-8 ml-auto inline-flex justify-center items-center"
                            onClick={closeModal}
                        >
                            <svg
                                className="w-3 h-3"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 14 14"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                />
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                    </div>
                    <div className="p-4 space-y-4">
                        <h3 className="text-xl font-semibold text-gray-900">Main Dish</h3>
                        <div className="flex items-center space-x-2">
                            <span>{selectedMeal.main.name}</span>
                            <span>${selectedMeal.main.price}</span>
                        </div>
                    </div>
                    <div className="p-4 space-y-4">
                        <h3 className="text-xl font-semibold text-gray-900">Protein</h3>
                        <RadioGroup value={selectedOptions['protein'] || ''} onValueChange={(value) => handleOptionChange('protein', value)}>
                            {selectedMeal.protein.map((option, index) => (
                                <div key={index} className="flex items-center space-x-2">
                                    <RadioGroupItem value={option.name} id={`protein-${index}`} />
                                    <Label htmlFor={`protein-${index}`}>{option.name}</Label>
                                </div>
                            ))}
                        </RadioGroup>
                    </div>
                    <div className="p-4 space-y-4">
                        <h3 className="text-xl font-semibold text-gray-900">Sauce</h3>
                        <RadioGroup value={selectedOptions['sauce'] || ''} onValueChange={(value) => handleOptionChange('sauce', value)}>
                            {selectedMeal.sauce.map((option, index) => (
                                <div key={index} className="flex items-center space-x-2">
                                    <RadioGroupItem value={option.name} id={`sauce-${index}`} />
                                    <Label htmlFor={`sauce-${index}`}>{option.name}</Label>
                                </div>
                            ))}
                        </RadioGroup>
                    </div>
                    <div className="p-4 space-y-4">
                        <h3 className="text-xl font-semibold text-gray-900">Extras</h3>
                        <RadioGroup value={selectedOptions['extras'] || ''} onValueChange={(value) => handleOptionChange('extras', value)}>
                            {selectedMeal.extras.map((option, index) => (
                                <div key={index} className="flex items-center space-x-2">
                                    <RadioGroupItem value={option.name} id={`extras-${index}`} />
                                    <Label htmlFor={`extras-${index}`}>{option.name}</Label>
                                </div>
                            ))}
                        </RadioGroup>
                    </div>
                    <div className="flex items-center justify-end p-4 border-t">
                        <button
                            onClick={() => {
                                addToCart(selectedMeal, selectedOptions);
                                closeModal();
                            }}
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg px-5 py-2.5"
                        >
                            Add to Cart
                        </button>
                        <button onClick={closeModal} className="text-sm font-medium text-gray-900 ml-3 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:outline-none px-5 py-2.5">
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MealModal;
