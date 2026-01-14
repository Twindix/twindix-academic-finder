const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PASSWORD_MIN_LENGTH = 6;
const PASSWORD_LETTER_REGEX = /[a-zA-Z]/;
const PASSWORD_NUMBER_REGEX = /\d/;

export interface ValidationResult {
    isValid: boolean;
    error: string | null;
}

export function validateEmail(email: string): ValidationResult {
    if (!email.trim()) {
        return { isValid: false, error: 'Email is required' };
    }

    if (!EMAIL_REGEX.test(email)) {
        return { isValid: false, error: 'Please enter a valid email address' };
    }

    return { isValid: true, error: null };
}

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
