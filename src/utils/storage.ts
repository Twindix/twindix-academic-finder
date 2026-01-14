/**
 * LocalStorage utilities for user data persistence
 */

const STORAGE_PREFIX = 'twindix_';

/**
 * Get item from localStorage with JSON parsing
 */
export function getStorageItem<T>(key: string): T | null {
    try {
        const item = localStorage.getItem(`${STORAGE_PREFIX}${key}`);
        return item ? JSON.parse(item) : null;
    } catch {
        return null;
    }
}

/**
 * Set item in localStorage with JSON stringification
 */
export function setStorageItem<T>(key: string, value: T): void {
    try {
        localStorage.setItem(`${STORAGE_PREFIX}${key}`, JSON.stringify(value));
    } catch {
        // Storage might be full or unavailable
        console.warn('Failed to save to localStorage');
    }
}

/**
 * Remove item from localStorage
 */
export function removeStorageItem(key: string): void {
    localStorage.removeItem(`${STORAGE_PREFIX}${key}`);
}

/**
 * Clear all twindix-related items from localStorage
 */
export function clearStorage(): void {
    const keysToRemove: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key?.startsWith(STORAGE_PREFIX)) {
            keysToRemove.push(key);
        }
    }
    keysToRemove.forEach((key) => localStorage.removeItem(key));
}

// Storage keys
export const STORAGE_KEYS = {
    USER: 'user',
    IS_AUTHENTICATED: 'is_authenticated',
} as const;
