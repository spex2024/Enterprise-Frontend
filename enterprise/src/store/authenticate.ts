
import {create} from 'zustand';

interface AuthStore {
    isAuthenticated: boolean;
    setIsAuthenticated: (authState: boolean) => void;
    checkAuthentication: () => boolean;
}

const EXPIRATION_TIME = 60 * 60 * 1000; // 1 hour in milliseconds

const useAuthStore = create<AuthStore>((set) => ({
    isAuthenticated: false,
    setIsAuthenticated: (authState: boolean) => {
        if (typeof window !== 'undefined') {
            const now = new Date().getTime();
            const expirationTime = now + EXPIRATION_TIME;
            if (authState) {
                localStorage.setItem('isAuthenticated', 'true');
                localStorage.setItem('authExpiration', expirationTime.toString());
            } else {
                localStorage.removeItem('isAuthenticated');
                localStorage.removeItem('authExpiration');
            }
        }
        set({ isAuthenticated: authState });
    },
    checkAuthentication: () => {
        if (typeof window === 'undefined') return false; // Server-side check
        const now = new Date().getTime();
        const storedExpiration = localStorage.getItem('authExpiration');
        if (storedExpiration) {
            const expirationTime = parseInt(storedExpiration, 10);
            return now < expirationTime;
        }
        return false;
    }
}));

export default useAuthStore;
