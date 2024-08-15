import { create } from 'zustand';
import { persist, createJSONStorage, PersistOptions } from 'zustand/middleware';

// Define the shape of your store state
interface AuthState {
    isAuthenticated: boolean;
    setIsAuthenticated: (status: boolean) => void;
}

// Create the Zustand store with TypeScript types and session storage persistence
const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            isAuthenticated: false,
            setIsAuthenticated: (status: boolean) => set({ isAuthenticated: status }),
        }),
        {
            name: 'auth-storage', // Name of the item in session storage (must be unique)
            storage: createJSONStorage(() => sessionStorage), // Use sessionStorage for persistence
        } as PersistOptions<AuthState> // Explicitly type the options
    )
);

export default useAuthStore;
