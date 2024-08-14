'use client';
import React from 'react';



import {useMeals} from "@/app/provider/meals/meals";
import {useSelectedMeal} from "@/app/provider/order/selection";
import {Button} from "@nextui-org/react";
import MealModal from "@/app/components/page-ui/modal";
import Header from "@/app/components/page-ui/header";
import Cart from "@/app/components/page-ui/cart";
import MealCard from "@/app/components/page-ui/card";


const MealList = () => {
    const { meals } = useMeals();
    const { openModal } = useSelectedMeal();

    return (
        <div className="w-full">

                {meals?.map((meal) => (

                    // <div key={meal._id}
                    //      className="w-64 h-64 flex flex-col items-center justify-around shadow-sm bg-white rounded p-4">
                    //
                    //     <h1>{meal.main.name} - ${meal.main.price}</h1>
                    //     <Button onClick={() => openModal(meal)}>Customize</Button>
                    // </div>
                    <MealCard key={meal.id} meal={meal} openModal={openModal} />
                ))}
            <MealModal/>


        </div>
    );
};

export default MealList;
