"use client";
import create from "zustand";
import axios from "axios";
const baseurl = "https://enterprise-backend.vercel.app";
// const baseurl = "http://localhost:8080";

const useCartStore = create((set, get) => ({
  cart: [],
  totalPrice: 0,
  totalQuantity: 0,
  isDrawerOpen: false,
  isCheckoutSuccess: false, // State for success message
  addToCart: (meal, options) =>
    set((state) => {
      const itemIndex = state.cart.findIndex(
        (item) =>
          item.mealId === meal._id &&
          item.protein === options["protein"] &&
          item.sauce === options["sauce"] &&
          item.extras === options["extras"]
      );

      if (itemIndex > -1) {
        const updatedCart = [...state.cart];

        updatedCart[itemIndex].quantity += 1;

        return {
          cart: updatedCart,
          totalPrice: state.totalPrice + meal.main.price,
          totalQuantity: state.totalQuantity + 1,
        };
      } else {
        const newCartItem = {
          mealId: meal._id,
          main: meal.main.name,
          price: meal.main.price,
          protein: options["protein"] || "",
          sauce: options["sauce"] || "",
          extras: options["extras"] || "",
          quantity: 1,
        };

        return {
          cart: [...state.cart, newCartItem],
          totalPrice: state.totalPrice + meal.main.price,
          totalQuantity: state.totalQuantity + 1,
        };
      }
    }),
  removeFromCart: (index) =>
    set((state) => {
      const item = state.cart[index];
      let updatedCart = [...state.cart];
      let newTotalPrice = state.totalPrice;
      let newTotalQuantity = state.totalQuantity;

      if (item.quantity > 1) {
        updatedCart[index].quantity -= 1;
        newTotalPrice -= item.price;
        newTotalQuantity -= 1;
      } else {
        updatedCart.splice(index, 1);
        newTotalPrice -= item.price * item.quantity;
        newTotalQuantity -= item.quantity;
      }

      return {
        cart: updatedCart,
        totalPrice: newTotalPrice,
        totalQuantity: newTotalQuantity,
      };
    }),
  checkout: async () => {
    const { cart, totalPrice, totalQuantity } = get();

    try {
      const response = await axios.post(
        `${baseurl}/api/orders/order`,
        {
          cart,
          totalPrice,
          totalQuantity,
        },
        { withCredentials: true }
      );

      // Check if the response indicates success
      if (response.status === 201 ) { // Adjust according to your API response
        console.log("Checkout successful:", response);

        set({
          cart: [],
          totalPrice: 0,
          totalQuantity: 0,
          isCheckoutSuccess: true, // Set success message state to true on successful checkout
          isDrawerOpen: false,
        });

        setTimeout(() => set({ isCheckoutSuccess: false }), 25000);
      } else {
        console.error("Checkout failed:", response);
        // Optionally handle failure case here
      }

    } catch (error) {
      console.error("Error submitting order:", error);
      // Optionally handle error case here
    }
  }
,
  toggleDrawer: () => set((state) => ({ isDrawerOpen: !state.isDrawerOpen })),
}));

export default useCartStore;
