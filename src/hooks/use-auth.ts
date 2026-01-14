import { useState, useCallback, useEffect } from 'react';
import type { User, UseAuthReturn } from '@/interfaces';
import { api } from '@/services';
import { getStoredUser, saveUser, clearAuth, isAuthenticated as checkAuth } from '@/utils';

export function useAuth(): UseAuthReturn {
    const [user, setUser] = useState<User | null>(() => getStoredUser());
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => checkAuth());
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const storedUser = getStoredUser();
        if (storedUser && checkAuth()) {
            setUser(storedUser);
            setIsAuthenticated(true);
        }
    }, []);

    const login = useCallback(async (email: string, password: string) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await api.login(email, password);
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

    const logout = useCallback(async () => {
        setIsLoading(true);

        try {
            await api.logout();
        } catch {
        } finally {
            clearAuth();
            setUser(null);
            setIsAuthenticated(false);
            setIsLoading(false);
            window.location.href = '/login';
        }
    }, []);

    const fetchUser = useCallback(async () => {
        if (!checkAuth()) {
            setIsAuthenticated(false);
            return;
        }

        setIsLoading(true);

        try {
            const fetchedUser = await api.getCurrentUser();
            saveUser(fetchedUser);
            setUser(fetchedUser);
            setIsAuthenticated(true);
            setIsLoading(false);
        } catch {
            clearAuth();
            setUser(null);
            setIsAuthenticated(false);
            setIsLoading(false);
        }
    }, []);

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
