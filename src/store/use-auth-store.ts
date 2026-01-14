import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User } from '@/types';
import { api, setToken, removeToken } from '@/services';

interface AuthState {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    fetchUser: () => Promise<void>;
    setUser: (user: User | null) => void;
    clearError: () => void;
    initializeAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set, get) => ({
            user: null,
            token: null,
            isAuthenticated: false,
            isLoading: false,
            error: null,

            /**
             * Initialize auth state on app load
             * Syncs token with cookie storage
             */
            initializeAuth: () => {
                const { token } = get();
                if (token) {
                    setToken(token);
                }
            },

            /**
             * Login with email and password
             */
            login: async (email: string, password: string) => {
                set({ isLoading: true, error: null });

                try {
                    const response = await api.login(email, password);

                    set({
                        user: response.user,
                        token: response.token,
                        isAuthenticated: true,
                        isLoading: false,
                        error: null,
                    });
                } catch (error) {
                    const errorMessage = error instanceof Error
                        ? error.message
                        : 'Invalid credentials';

                    set({
                        isLoading: false,
                        error: errorMessage,
                    });

                    throw error;
                }
            },

            /**
             * Logout user and clear state
             */
            logout: async () => {
                set({ isLoading: true });

                try {
                    await api.logout();
                } catch {
                    // Ignore logout errors, still clear local state
                } finally {
                    set({
                        user: null,
                        token: null,
                        isAuthenticated: false,
                        isLoading: false,
                        error: null,
                    });

                    // Redirect to login
                    window.location.href = '/login';
                }
            },

            /**
             * Fetch current user from API
             */
            fetchUser: async () => {
                const { token } = get();

                if (!token) {
                    set({ isAuthenticated: false });
                    return;
                }

                set({ isLoading: true });

                try {
                    const user = await api.getCurrentUser();

                    set({
                        user,
                        isAuthenticated: true,
                        isLoading: false,
                    });
                } catch {
                    // Token might be invalid, clear auth state
                    set({
                        user: null,
                        token: null,
                        isAuthenticated: false,
                        isLoading: false,
                    });

                    removeToken();
                }
            },

            /**
             * Set user manually
             */
            setUser: (user) => {
                set({ user });
            },

            /**
             * Clear error message
             */
            clearError: () => {
                set({ error: null });
            },
        }),
        {
            name: 'twindix-auth-storage',
            partialize: (state) => ({
                user: state.user,
                token: state.token,
                isAuthenticated: state.isAuthenticated,
            }),
            onRehydrateStorage: () => (state) => {
                // When state is rehydrated from storage, sync token with cookie
                if (state?.token) {
                    setToken(state.token);
                }
            },
        }
    )
);
