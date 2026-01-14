/**
 * Form validation utilities using simple regex patterns
 * No external validation libraries - keeping it simple
 */

/**
 * Email validation regex
 * Matches most common email formats
 */
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Password validation rules
 * - Minimum 6 characters
 * - At least one letter
 * - At least one number
 */
const PASSWORD_MIN_LENGTH = 6;
const PASSWORD_LETTER_REGEX = /[a-zA-Z]/;
const PASSWORD_NUMBER_REGEX = /\d/;

export interface ValidationResult {
    isValid: boolean;
    error: string | null;
}

/**
 * Validate email format
 */
export function validateEmail(email: string): ValidationResult {
    if (!email.trim()) {
        return { isValid: false, error: 'Email is required' };
    }

    if (!EMAIL_REGEX.test(email)) {
        return { isValid: false, error: 'Please enter a valid email address' };
    }

    return { isValid: true, error: null };
}

/**
 * Validate password strength
 */
export function validatePassword(password: string): ValidationResult {
    if (!password) {
        return { isValid: false, error: 'Password is required' };
    }

    if (password.length < PASSWORD_MIN_LENGTH) {
        return { isValid: false, error: `Password must be at least ${PASSWORD_MIN_LENGTH} characters` };
    }

    if (!PASSWORD_LETTER_REGEX.test(password)) {
        return { isValid: false, error: 'Password must contain at least one letter' };
    }

    if (!PASSWORD_NUMBER_REGEX.test(password)) {
        return { isValid: false, error: 'Password must contain at least one number' };
    }

    return { isValid: true, error: null };
}

/**
 * Validate login form
 */
export function validateLoginForm(email: string, password: string): ValidationResult {
    const emailValidation = validateEmail(email);
    if (!emailValidation.isValid) {
        return emailValidation;
    }

    // For login, we don't enforce password strength - just check it's not empty
    if (!password.trim()) {
        return { isValid: false, error: 'Password is required' };
    }

    return { isValid: true, error: null };
}

/**
 * Validate exam code format
 */
export function validateExamCode(code: string): ValidationResult {
    if (!code.trim()) {
        return { isValid: false, error: 'Please enter a code' };
    }

    // Code should be alphanumeric with possible dashes/underscores
    if (code.trim().length < 3) {
        return { isValid: false, error: 'Code must be at least 3 characters' };
    }

    return { isValid: true, error: null };
}
