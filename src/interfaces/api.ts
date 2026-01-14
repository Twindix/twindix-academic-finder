export interface ApiError {
    message: string;
    errors?: Record<string, string[]>;
}

export interface ValidationResult {
    isValid: boolean;
    error: string | null;
}
