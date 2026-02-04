import { useCallback, useEffect, useState } from "react";

import { routes, strings } from "@/constants";
import type { UseAuthReturnInterface, UserInterface } from "@/interfaces";
import { api } from "@/services";
import {
    clearAuthHandler,
    getStoredUserHandler,
    isAuthenticatedHandler as checkAuth,
    saveUserHandler,
} from "@/utils";

export const useAuth = (): UseAuthReturnInterface => {
    const [user, setUser] = useState<UserInterface | null>(() => getStoredUserHandler());

    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => checkAuth());

    const [isLoading, setIsLoading] = useState(false);

    const [error, setError] = useState<string | null>(null);

    const login = useCallback(
        async (
            email: string,
            password: string,
        ) => {
            setIsLoading(true);

            setError(null);

            try {
                const response = await api.loginHandler(
                    email,
                    password,
                );

                saveUserHandler(response.user);

                setUser(response.user);

                setIsAuthenticated(true);

                setIsLoading(false);
            } catch (err) {
                const errorMessage = err instanceof Error ? err.message : strings.errors.invalidCredentials;

                setError(errorMessage);

                setIsLoading(false);

                throw err;
            }
        },
        [],
    );

    const logout = useCallback(
        async () => {
            setIsLoading(true);

            try {
                await api.logoutHandler();
            } catch (error) {
                console.error(
                    strings.debug.logoutFailed,
                    error,
                );
            } finally {
                clearAuthHandler();

                setUser(null);

                setIsAuthenticated(false);

                setIsLoading(false);

                window.location.href = routes.login;
            }
        },
        [],
    );

    const fetchUser = useCallback(
        async () => {
            if (!checkAuth()) {
                setIsAuthenticated(false);

                return;
            }

            setIsLoading(true);

            try {
                const fetchedUser = await api.getCurrentUserHandler();

                saveUserHandler(fetchedUser);

                setUser(fetchedUser);

                setIsAuthenticated(true);

                setIsLoading(false);
            } catch {
                clearAuthHandler();

                setUser(null);

                setIsAuthenticated(false);

                setIsLoading(false);
            }
        },
        [],
    );

    const clearError = useCallback(
        () => setError(null),
        [],
    );

    useEffect(
        () => {
            const storedUser = getStoredUserHandler();

            if (storedUser && checkAuth()) {
                setUser(storedUser);

                setIsAuthenticated(true);
            }
        },
        [],
    );

    return {
        clearError,
        error,
        fetchUser,
        isAuthenticated,
        isLoading,
        login,
        logout,
        user,
    };
};
