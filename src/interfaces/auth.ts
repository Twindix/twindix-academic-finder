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
    error: string | null,
    isAuthenticated: boolean,
    isLoading: boolean,
    onClearError: () => void,
    onFetchUser: () => Promise<void>,
    onLogin: (email: string, password: string) => Promise<void>,
    onLogout: () => Promise<void>,
    user: UserInterface | null,
}
