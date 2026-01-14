/**
 * Custom auth hook to replace Zustand store
 * Uses localStorage for user data and cookies for auth token
 */

import { useState, useCallback, useEffect } from 'react';
import type { User } from '@/types';
import { api } from '@/services';
import { getStoredUser, saveUser, clearAuth, isAuthenticated as checkAuth } from '@/utils';

interface UseAuthReturn {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    fetchUser: () => Promise<void>;
    clearError: () => void;
}

export function useAuth(): UseAuthReturn {
    const [user, setUser] = useState<User | null>(() => getStoredUser());
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => checkAuth());
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Sync user state with localStorage on mount
    useEffect(() => {
        const storedUser = getStoredUser();
        if (storedUser && checkAuth()) {
            setUser(storedUser);
            setIsAuthenticated(true);
        }
    }, []);

    /**
     * Login with email and password
     */
    const login = useCallback(async (email: string, password: string) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await api.login(email, password);

            // Save user to localStorage
            saveUser(response.user);

            setUser(response.user);
            setIsAuthenticated(true);
            setIsLoading(false);
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Invalid credentials';
            setError(errorMessage);
            setIsLoading(false);
            throw err;
        }
    }, []);

    /**
     * Logout user and clear all auth data
     */
    const logout = useCallback(async () => {
        setIsLoading(true);

        try {
            await api.logout();
        } catch {
            // Ignore logout errors, still clear local state
        } finally {
            // Clear all auth data
            clearAuth();

            setUser(null);
            setIsAuthenticated(false);
            setIsLoading(false);

            // Redirect to login
            window.location.href = '/login';
        }
    }, []);

    /**
     * Fetch current user from API
     */
    const fetchUser = useCallback(async () => {
        if (!checkAuth()) {
            setIsAuthenticated(false);
            return;
        }

        setIsLoading(true);

        try {
            const fetchedUser = await api.getCurrentUser();

            // Save updated user to localStorage
            saveUser(fetchedUser);

            setUser(fetchedUser);
            setIsAuthenticated(true);
            setIsLoading(false);
        } catch {
            // Token might be invalid, clear auth state
            clearAuth();

            setUser(null);
            setIsAuthenticated(false);
            setIsLoading(false);
        }
    }, []);

    /**
     * Clear error message
     */
    const clearError = useCallback(() => {
        setError(null);
    }, []);

    return {
        user,
        isAuthenticated,
        isLoading,
        error,
        login,
        logout,
        fetchUser,
        clearError,
    };
}
