import create from 'zustand';

interface AuthStore {
    isAuthenticated: boolean;
    setIsAuthenticated: (authState: boolean) => void;
}

const useAuthStore = create<AuthStore>((set) => ({
    isAuthenticated: localStorage.getItem('isAuthenticated') === 'true',
    setIsAuthenticated: (authState) => {
        set({ isAuthenticated: authState });
        localStorage.setItem('isAuthenticated', authState.toString());
    },
}));

export default useAuthStore;
