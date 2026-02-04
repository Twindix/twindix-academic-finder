import { strings } from "@/constants";
import type { ValidationResultInterface } from "@/interfaces";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const passwordMinLength = 6;

const passwordLetterRegex = /[a-zA-Z]/;

const passwordNumberRegex = /\d/;

export const validateEmailHandler = (email: string): ValidationResultInterface => {
    if (!email.trim()) {
        return {
            error: strings.validation.emailRequired,
            isValid: false,
        };
    }

    if (!emailRegex.test(email)) {
        return {
            error: strings.validation.emailInvalid,
            isValid: false,
        };
    }

    return {
        error: null,
        isValid: true,
    };
};

export const validatePasswordHandler = (password: string): ValidationResultInterface => {
    if (!password) {
        return {
            error: strings.validation.passwordRequired,
            isValid: false,
        };
    }

    if (password.length < passwordMinLength) {
        return {
            error: strings.validation.passwordMinLength,
            isValid: false,
        };
    }

    if (!passwordLetterRegex.test(password)) {
        return {
            error: strings.validation.passwordNeedsLetter,
            isValid: false,
        };
    }

    if (!passwordNumberRegex.test(password)) {
        return {
            error: strings.validation.passwordNeedsNumber,
            isValid: false,
        };
    }

    return {
        error: null,
        isValid: true,
    };
};

export const validateLoginFormHandler = (email: string, password: string): ValidationResultInterface => {
    const emailValidation = validateEmailHandler(email);

    if (!emailValidation.isValid) return emailValidation;

    if (!password.trim()) {
        return {
            error: strings.validation.passwordRequired,
            isValid: false,
        };
    }

    return {
        error: null,
        isValid: true,
    };
};

export const validateExamCodeHandler = (code: string): ValidationResultInterface => {
    if (!code.trim()) {
        return {
            error: strings.validation.codeRequired,
            isValid: false,
        };
    }

    if (code.trim().length < 3) {
        return {
            error: strings.validation.codeMinLength,
            isValid: false,
        };
    }

    return {
        error: null,
        isValid: true,
    };
};
