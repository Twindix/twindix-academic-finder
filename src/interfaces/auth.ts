import type { UserInterface } from "@/interfaces";

export interface LoginRequestInterface {
    email: string,
    password: string,
}

export interface LoginResponseInterface {
    token: string,
    tokenType: "Bearer",
    user: UserInterface,
}

export interface ForgotPasswordRequestInterface { email: string }

export interface ForgotPasswordResponseInterface { message: string }

export interface ResetPasswordRequestInterface {
    email: string,
    password: string,
    passwordConfirmation: string,
    token: string,
}

export interface ResetPasswordResponseInterface { message: string }

export interface UseAuthReturnInterface {
    clearError: () => void,
    error: string | null,
    fetchUser: () => Promise<void>,
    isAuthenticated: boolean,
    isLoading: boolean,
    login: (email: string, password: string) => Promise<void>,
    logout: () => Promise<void>,
    user: UserInterface | null,
}
