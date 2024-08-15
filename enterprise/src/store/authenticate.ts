import { create } from 'zustand';
import { persist, createJSONStorage, PersistOptions } from 'zustand/middleware';

// Define the shape of your store state
interface AuthState {
    isAuthenticated: boolean;
    isLoading: boolean; // Add loading state
    setIsAuthenticated: (status: boolean) => void;
    setLoading: (status: boolean) => void; // Add function to set loading state
    logout: () => void; // Add logout function
}

// Create the Zustand store with TypeScript types and session storage persistence
const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            isAuthenticated: false,
            isLoading: true, // Initialize loading as true
            setIsAuthenticated: (status: boolean) => set({ isAuthenticated: status }),
            setLoading: (status: boolean) => set({ isLoading: status }), // Set loading state
            logout: () => {
                set({ isAuthenticated: false }); // Update state
                // Clear the entire session storage
                sessionStorage.clear();
            },
        }),
        {
            name: 'auth-storage', // Name of the item in session storage (must be unique)
            storage: createJSONStorage(() => sessionStorage), // Use sessionStorage for persistence
            onRehydrateStorage: () => {
                console.log('Rehydrating storage...');
                // Optionally, you can handle loading state here if needed
            },
        } as PersistOptions<AuthState>
    )
);

export default useAuthStore;
