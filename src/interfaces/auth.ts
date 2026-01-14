import type { User } from './user';

/**
 * Login request interface
 */
export interface LoginRequest {
    email: string;
    password: string;
}

/**
 * Login response interface
 */
export interface LoginResponse {
    user: User;
    token: string;
    tokenType: 'Bearer';
}
