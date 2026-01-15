import type { ValidationResult } from '@/interfaces';
import { strings } from '@/constants';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const passwordMinLength = 6;

const passwordLetterRegex = /[a-zA-Z]/;

const passwordNumberRegex = /\d/;

export function validateEmail(email: string): ValidationResult {
    if (!email.trim()) {
        return { isValid: false, error: strings.validation.emailRequired };
    }

    if (!emailRegex.test(email)) {
        return { isValid: false, error: strings.validation.emailInvalid };
    }

    return { isValid: true, error: null };
}

export function validatePassword(password: string): ValidationResult {
    if (!password) {
        return { isValid: false, error: strings.validation.passwordRequired };
    }

    if (password.length < passwordMinLength) {
        return { isValid: false, error: strings.validation.passwordMinLength };
    }

    if (!passwordLetterRegex.test(password)) {
        return { isValid: false, error: strings.validation.passwordNeedsLetter };
    }

    if (!passwordNumberRegex.test(password)) {
        return { isValid: false, error: strings.validation.passwordNeedsNumber };
    }

    return { isValid: true, error: null };
}

export function validateLoginForm(email: string, password: string): ValidationResult {
    const emailValidation = validateEmail(email);

    if (!emailValidation.isValid) {
        return emailValidation;
    }

    if (!password.trim()) {
        return { isValid: false, error: strings.validation.passwordRequired };
    }

    return { isValid: true, error: null };
}

export function validateExamCode(code: string): ValidationResult {
    if (!code.trim()) {
        return { isValid: false, error: strings.validation.codeRequired };
    }

    if (code.trim().length < 3) {
        return { isValid: false, error: strings.validation.codeMinLength };
    }

    return { isValid: true, error: null };
}
