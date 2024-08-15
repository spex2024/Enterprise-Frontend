import {create} from 'zustand';

// Define the shape of your store state
interface AuthState {
    isAuthenticated: boolean;
    setIsAuthenticated: (status: boolean) => void;
}

// Create the Zustand store with TypeScript types
const useAuthStore = create<AuthState>((set) => ({
    isAuthenticated: false,
    setIsAuthenticated: (status: boolean) => set({ isAuthenticated: status }),
}));

export default useAuthStore;
