import type { User } from '@/interfaces';
import { getStorageItem, setStorageItem, removeStorageItem, clearStorage, STORAGE_KEYS } from './storage';
import { getToken, removeToken } from '@/services';

export function getStoredUser(): User | null {
    return getStorageItem<User>(STORAGE_KEYS.USER);
}

export function saveUser(user: User): void {
    setStorageItem(STORAGE_KEYS.USER, user);
    setStorageItem(STORAGE_KEYS.IS_AUTHENTICATED, true);
}

export function removeUser(): void {
    removeStorageItem(STORAGE_KEYS.USER);
    removeStorageItem(STORAGE_KEYS.IS_AUTHENTICATED);
}

export function isAuthenticated(): boolean {
    const token = getToken();
    const isAuth = getStorageItem<boolean>(STORAGE_KEYS.IS_AUTHENTICATED);
    return !!token && !!isAuth;
}

export function clearAuth(): void {
    removeToken();
    clearStorage();
}

export function getStoredJobId(): string | null {
    return getStorageItem<string>(STORAGE_KEYS.JOB_ID);
}

export function saveJobId(jobId: string): void {
    setStorageItem(STORAGE_KEYS.JOB_ID, jobId);
}

export function clearJobId(): void {
    removeStorageItem(STORAGE_KEYS.JOB_ID);
}
