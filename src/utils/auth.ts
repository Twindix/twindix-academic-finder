/**
 * Authentication utilities
 */

import type { User } from '@/interfaces';
import { getStorageItem, setStorageItem, removeStorageItem, clearStorage, STORAGE_KEYS } from './storage';
import { getToken, removeToken } from '@/services';

/**
 * Get stored user from localStorage
 */
export function getStoredUser(): User | null {
    return getStorageItem<User>(STORAGE_KEYS.USER);
}

/**
 * Save user to localStorage
 */
export function saveUser(user: User): void {
    setStorageItem(STORAGE_KEYS.USER, user);
    setStorageItem(STORAGE_KEYS.IS_AUTHENTICATED, true);
}

/**
 * Remove user from localStorage
 */
export function removeUser(): void {
    removeStorageItem(STORAGE_KEYS.USER);
    removeStorageItem(STORAGE_KEYS.IS_AUTHENTICATED);
}

/**
 * Check if user is authenticated (has valid token)
 */
export function isAuthenticated(): boolean {
    const token = getToken();
    const isAuth = getStorageItem<boolean>(STORAGE_KEYS.IS_AUTHENTICATED);
    return !!token && !!isAuth;
}

/**
 * Clear all auth data (token + user)
 */
export function clearAuth(): void {
    removeToken();
    clearStorage();
}
