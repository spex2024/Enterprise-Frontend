import React from 'react';
import FoodProduct from "@/app/components/page-ui/food-product";
import Header from "@/app/components/page-ui/header";
import Cart from "@/app/components/page-ui/cart";
import MealModal from "@/app/components/page-ui/modal";

const MealList = () => {
    return (
        <div className={`min-h-screen `}>
            <FoodProduct/>
            <MealModal/>
            <Cart/>
        </div>
    );
};

export default MealList;