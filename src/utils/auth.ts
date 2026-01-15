import type { User } from '@/interfaces';
import { getStorageItem, setStorageItem, removeStorageItem, clearStorage, storageKeys } from './storage';
import { getToken, removeToken } from '@/services';

export function getStoredUser(): User | null {
    return getStorageItem<User>(storageKeys.user);
}

export function saveUser(user: User): void {
    setStorageItem(storageKeys.user, user);

    setStorageItem(storageKeys.isAuthenticated, true);
}

export function removeUser(): void {
    removeStorageItem(storageKeys.user);

    removeStorageItem(storageKeys.isAuthenticated);
}

export function isAuthenticated(): boolean {
    const token = getToken();

    const isAuth = getStorageItem<boolean>(storageKeys.isAuthenticated);

    return !!token && !!isAuth;
}

export function clearAuth(): void {
    removeToken();

    clearStorage();
}
