import React from 'react';
import AddMealForm from "@/components/main/meal-form";


const AddMeal = () => {
    return (
        <div className={` w-full min-h-screen flex flex-col justify-center items-center  gap-10 lg:py-30 py-10`}>
            <div className={`lg:w-[40%] h-20 px-8 lg:px-0`}>

            <h1 className={`font-bold lg:text-5xl`}>Add Meal</h1>
                <p>Reference site about Lorem Ipsum, giving information on its origins, as well as a random Lipsum generator.</p>
            </div>
            <AddMealForm/>
        </div>
    );
};

export default AddMeal;