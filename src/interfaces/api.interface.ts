/**
 * API error interface
 */
export interface ApiError {
    message: string;
    errors?: Record<string, string[]>;
}

/**
 * Validation result interface
 */
export interface ValidationResult {
    isValid: boolean;
    error: string | null;
}
