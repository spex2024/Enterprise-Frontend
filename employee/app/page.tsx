"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { ScaleLoader } from "react-spinners";

import { Navbar } from "@/components/navbar";
import Menu from "@/components/page-ui/menu";
import Cart from "@/components/page-ui/cart";
import Vendors from "@/components/page-ui/vendors";
import useAuthStore from "@/app/store/authenticate";

export default function Home() {
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
    <section className="w-full min-h-screen ">
      <Navbar />
      <Menu />
      <Vendors />
      <Cart />
    </section>
  );
}
