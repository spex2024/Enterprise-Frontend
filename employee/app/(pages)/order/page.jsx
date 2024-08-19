"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { ScaleLoader } from "react-spinners";

import OrderTable from "../../../components/page-ui/order-table";
import useAuthStore from "../../store/authenticate";

const Order = () => {
  const { isAuthenticated } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isAuthenticated) {
        router.push("/login"); // Redirect to login page if not authenticated
      }
    }, 1000); // Adjust the delay as needed

    return () => clearTimeout(timer); // Clean up the timer if the component unmounts
  }, [isAuthenticated, router]);

  // Optionally, you can return a loading indicator while checking authentication
  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <ScaleLoader color={"#000"} />
      </div>
    );
  }

  return (
    <div className="lg:w-[80vw] lg:p-10 p-5 mx-auto min-h-screen">
      <OrderTable />
    </div>
  );
};

export default Order;
