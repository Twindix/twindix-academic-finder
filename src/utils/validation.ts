import type { ValidationResult } from '@/interfaces';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordMinLength = 6;
const passwordLetterRegex = /[a-zA-Z]/;
const passwordNumberRegex = /\d/;

export function validateEmail(email: string): ValidationResult {
    if (!email.trim()) {
        return { isValid: false, error: 'Email is required' };
    }

    if (!emailRegex.test(email)) {
        return { isValid: false, error: 'Please enter a valid email address' };
    }

    return { isValid: true, error: null };
}

export function validatePassword(password: string): ValidationResult {
    if (!password) {
        return { isValid: false, error: 'Password is required' };
    }

    if (password.length < passwordMinLength) {
        return { isValid: false, error: `Password must be at least ${passwordMinLength} characters` };
    }

    if (!passwordLetterRegex.test(password)) {
        return { isValid: false, error: 'Password must contain at least one letter' };
    }

    if (!passwordNumberRegex.test(password)) {
        return { isValid: false, error: 'Password must contain at least one number' };
    }

    return { isValid: true, error: null };
}

export function validateLoginForm(email: string, password: string): ValidationResult {
    const emailValidation = validateEmail(email);

    if (!emailValidation.isValid) {
        return emailValidation;
    }

    if (!password.trim()) {
        return { isValid: false, error: 'Password is required' };
    }

    return { isValid: true, error: null };
}

export function validateExamCode(code: string): ValidationResult {
    if (!code.trim()) {
        return { isValid: false, error: 'Please enter a code' };
    }

    if (code.trim().length < 3) {
        return { isValid: false, error: 'Code must be at least 3 characters' };
    }

    return { isValid: true, error: null };
}
