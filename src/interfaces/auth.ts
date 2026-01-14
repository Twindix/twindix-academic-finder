import type { User } from './user';

export interface LoginRequest {
    email: string,
    password: string,
}

export interface LoginResponse {
    user: User,
    token: string,
    tokenType: 'Bearer',
}

export interface UseAuthReturn {
    user: User | null,
    isAuthenticated: boolean,
    isLoading: boolean,
    error: string | null,
    login: (email: string, password: string) => Promise<void>,
    logout: () => Promise<void>,
    fetchUser: () => Promise<void>,
    clearError: () => void,
}
