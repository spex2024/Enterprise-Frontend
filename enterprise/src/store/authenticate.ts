import create from 'zustand';

interface AuthStore {
    isAuthenticated: boolean;
    setIsAuthenticated: (authState: boolean) => void;
    checkAuthentication: () => boolean;
}

const EXPIRATION_TIME = 60 * 60 * 1000; // 1 hour in milliseconds

const useAuthStore = create<AuthStore>((set) => ({
    isAuthenticated: (() => {
        const now = new Date().getTime();
        const storedExpiration = localStorage.getItem('authExpiration');
        const storedAuthState = localStorage.getItem('isAuthenticated');

        if (storedAuthState === 'true' && storedExpiration) {
            const expirationTime = parseInt(storedExpiration, 10);
            if (now < expirationTime) {
                return true;
            } else {
                localStorage.removeItem('isAuthenticated');
                localStorage.removeItem('authExpiration');
                return false;
            }
        }
        return false;
    })(),
    setIsAuthenticated: (authState: boolean) => {
        const now = new Date().getTime();
        const expirationTime = now + EXPIRATION_TIME;

        set({ isAuthenticated: authState });

        if (authState) {
            localStorage.setItem('isAuthenticated', 'true');
            localStorage.setItem('authExpiration', expirationTime.toString());
        } else {
            localStorage.removeItem('isAuthenticated');
            localStorage.removeItem('authExpiration');
        }
    },
    checkAuthentication: () => {
        const now = new Date().getTime();
        const storedExpiration = localStorage.getItem('authExpiration');
        if (storedExpiration) {
            const expirationTime = parseInt(storedExpiration, 10);
            return now < expirationTime;
        }
        return false;
    },
}));

export default useAuthStore;
