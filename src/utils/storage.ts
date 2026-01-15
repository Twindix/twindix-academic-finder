const storagePrefix = 'twindix_';

export function getStorageItem<T>(key: string): T | null {
    try {
        const item = localStorage.getItem(`${storagePrefix}${key}`);

        return item ? JSON.parse(item) : null;
    } catch {
        return null;
    }
}

export function setStorageItem<T>(key: string, value: T): void {
    try {
        localStorage.setItem(`${storagePrefix}${key}`, JSON.stringify(value));
    } catch {
        console.warn('Failed to save to localStorage');
    }
}

export function removeStorageItem(key: string): void {
    localStorage.removeItem(`${storagePrefix}${key}`);
}

export function clearStorage(): void {
    const keysToRemove: string[] = [];

    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);

        if (key?.startsWith(storagePrefix)) {
            keysToRemove.push(key);
        }
    }

    keysToRemove.forEach((key) => localStorage.removeItem(key));
}

export const storageKeys = {
    user: 'user',
    isAuthenticated: 'is_authenticated',
} as const;
