'use client'
import React, { useState, useEffect } from 'react';

import { Button } from '@/components/ui/button';
import {useMeals} from "@/app/store/meal";
import {useSelectedMeal} from "@/app/store/select";
import MealModal from "../../../../components/main/modal";
import CartDrawer from "../../../../components/main/cart-drawer"; // Replace with your button component



const AllMealsComponent = () => {
    const { meals } = useMeals();
    const { openModal } = useSelectedMeal();

    return (
        <div className="w-full min-h-screen space-y-4 ">


            <div className="flex p-10 w-full  min-h-screen gap-5 flex-col md:flex-row justify-center">
                {meals.map((meal) => (
                    <div key={meal._id} className="w-64 h-72 flex flex-col items-center justify-around  rounded bg-red-400 p-4 border border-green-600 ">
                        <img src={meal.imageUrl} className={`object-fill object-top h-52 `}/>
                        <div className={`w-full h-52 flex flex-col items-start justify-center gap-5 bg-green-700 border border-green-600 bg-green-700`}>

                            <div className="w-full flex items-center gap-10 justify-center">

                                     <h1>{meal.main.name} </h1>
                                     <p>- ${meal.main.price}</p>
                            </div>

                        <Button onClick={() => openModal(meal)}>Customize</Button>
                        </div>
                    </div>
                ))}
            </div>

            <MealModal/>

        </div>

        )
};

export default AllMealsComponent;
