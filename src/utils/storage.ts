const STORAGE_PREFIX = 'twindix_';

export function getStorageItem<T>(key: string): T | null {
    try {
        const item = localStorage.getItem(`${STORAGE_PREFIX}${key}`);
        return item ? JSON.parse(item) : null;
    } catch {
        return null;
    }
}

export function setStorageItem<T>(key: string, value: T): void {
    try {
        localStorage.setItem(`${STORAGE_PREFIX}${key}`, JSON.stringify(value));
    } catch {
        console.warn('Failed to save to localStorage');
    }
}

export function removeStorageItem(key: string): void {
    localStorage.removeItem(`${STORAGE_PREFIX}${key}`);
}

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

export const STORAGE_KEYS = {
    USER: 'user',
    IS_AUTHENTICATED: 'is_authenticated',
} as const;
