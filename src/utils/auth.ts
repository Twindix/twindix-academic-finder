import type { UserInterface } from "@/interfaces";
import { getTokenHandler, removeTokenHandler } from "@/services";
import {
    clearStorageHandler,
    getStorageItemHandler,
    removeStorageItemHandler,
    setStorageItemHandler,
    storageKeys,
} from "@/utils";

export const getStoredUserHandler = (): UserInterface | null => getStorageItemHandler<UserInterface>(storageKeys.user);

export const saveUserHandler = (user: UserInterface): void => {
    setStorageItemHandler(
        storageKeys.user,
        user,
    );

    setStorageItemHandler(
        storageKeys.isAuthenticated,
        true,
    );
};

export const removeUserHandler = (): void => {
    removeStorageItemHandler(storageKeys.user);

    removeStorageItemHandler(storageKeys.isAuthenticated);
};

export const isAuthenticatedHandler = (): boolean => {
    const token = getTokenHandler();

    const isAuth = getStorageItemHandler<boolean>(storageKeys.isAuthenticated);

    return !!token && !!isAuth;
};

export const clearAuthHandler = (): void => {
    removeTokenHandler();

    clearStorageHandler();
};
