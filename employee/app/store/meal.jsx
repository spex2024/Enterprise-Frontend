// stores/mealStore.js
import { create } from "zustand";
import axios from "axios";
const baseurl = "https://enterprise-backend-l6pn.onrender.com";
const useMealStore = create((set) => ({
  meals: [],
  error: null,
  fetchMeals: async () => {
    try {
      const response = await axios.get(
        `${baseurl}/api/vendor/meal`,
        { withCredentials: true },
      );

      set({ meals: response.data, error: null });
    } catch (error) {
      set({ error: "Failed to fetch meals. Please try again later." });
    }
  },
}));

export default useMealStore;
