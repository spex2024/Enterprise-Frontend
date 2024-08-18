"use client";
import React, { useEffect } from "react";
import { ShoppingBasket } from "lucide-react";

import useSelectedMealStore from "../../app/store/selection";
import useMealStore from "../../app/store/meal";
import Link from "next/link";

const FoodProductCard = () => {
  const { meal, fetchMeals } = useMealStore();
  const { openModal } = useSelectedMealStore();

  useEffect(() => {
    fetchMeals();
  }, [fetchMeals]);

  // Extracting meals array from the meal object
  const meals = meal?.meals || [];
  const vendorName = meal?.vendorName || "";
  const vendorLocation = meal?.vendorLocation || "";

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-4 justify-center lg:px-10 place-items-center px-5">
      {meals.map((mealItem) => (
        <div
          key={mealItem._id}
          className="group my-10 w-full lg:max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md m-4"
        >
          <Link
            className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl"
            href="#"
          >
            <img
              alt="mealimage"
              className="peer absolute top-0 right-0 h-full w-full object-cover"
              src={mealItem.imageUrl}
            />
          </Link>
          <div className="mt-4 px-5 pb-5">
            <div className="mt-2 mb-5 flex items-center justify-between">
              <Link href="#">
                <h5 className="text-2xl tracking-tight text-slate-900 font-bold">
                  {mealItem.main?.name || ""}
                </h5>
              </Link>
              <button onClick={() => openModal(mealItem)}>
                <ShoppingBasket className="text-black" />
              </button>
            </div>
            <div className="w-full flex items-center justify-between rounded-full text-center text-sm cursor-pointer">
              <p className="text-xs">
                {vendorName} ({vendorLocation})
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FoodProductCard;
