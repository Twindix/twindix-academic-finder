import type { User } from './user.interface';

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
