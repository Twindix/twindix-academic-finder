import { strings } from "@/constants";

const storagePrefix = "twindix_academic_finder_";

export const getStorageItemHandler = <T>(key: string): T | null => {
    try {
        const item = localStorage.getItem(`${storagePrefix}${key}`);

        return item ? JSON.parse(item) : null;
    } catch {
        return null;
    }
};

export const setStorageItemHandler = <T>(key: string, value: T): void => {
    try {
        localStorage.setItem(
            `${storagePrefix}${key}`,
            JSON.stringify(value),
        );
    } catch {
        console.warn(strings.debug.storageSaveFailed);
    }
};

export const removeStorageItemHandler = (key: string): void => localStorage.removeItem(`${storagePrefix}${key}`);

export const clearStorageHandler = (): void => {
    const keysToRemove: string[] = [];

    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);

        if (key?.startsWith(storagePrefix)) keysToRemove.push(key);
    }

    keysToRemove.forEach((key) => localStorage.removeItem(key));
};

export const storageKeys = {
    isAuthenticated: "is_authenticated",
    user: "user",
} as const;
