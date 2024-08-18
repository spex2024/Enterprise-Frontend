"use client";

import React from "react";
import { Link } from "@nextui-org/react";
import { PackageCheck, ShoppingBasket, WalletIcon } from "lucide-react";

const menuItems = [
  {
    icon: <ShoppingBasket color={`#fff`} size={40} />,
    alt: "Order",
    text: "Order Now",
    link: "/meals",
  },
  {
    icon: <WalletIcon color={`#fff`} size={40} />,
    alt: "Wallet",
    text: "Wallet",
    link: "/profile",
  },
  {
    icon: <PackageCheck color={`#fff`} size={40} />,
    alt: "Order",
    text: "Return Pack",
    link: "/profile",
  },
];

const Menu = () => {
  return (
    <div className="w-full relative  lg:mt-12 lg:mb-10">
      <div className="w-full  grid lg:grid-cols-3 gap-5 place-items-center  lg:w-full lg:px-96 py-10">
        {menuItems.slice(0, 3).map((item, index) => (
          <Link key={index} href={item.link}>
            <div className=" flex flex-col items-center  bg-black w-52 py-10 text-center border lg:w-36 h-36 rounded-xl gap-2">
              <div>{item.icon}</div>
              <p className="text-sm font-medium capitalize font-body text-white lg:text-lg md:text-base ">
                {item.text}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Menu;
