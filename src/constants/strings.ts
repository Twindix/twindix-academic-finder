/**
 * Application string constants
 * Centralized location for all UI text
 */

export const STRINGS = {
    // App info
    APP_NAME: 'Twindix Academic Gate',
    COMPANY_NAME: 'Twindix Global Inc.',

    // Login page
    LOGIN: {
        TITLE: 'Login',
        WELCOME: 'Welcome',
        WELCOME_SUFFIX: 'Back Please enter The Details For Your Account',
        EMAIL_LABEL: 'E-mail',
        EMAIL_PLACEHOLDER: 'Write here',
        PASSWORD_LABEL: 'Password',
        PASSWORD_PLACEHOLDER: 'Enter Password here',
        FORGOT_PASSWORD: 'Forget your password?',
        FORGOT_PASSWORD_LINK: 'Click here',
        SUBMIT_BUTTON: 'Login',
    },

    // Auth layout (left side)
    AUTH_LAYOUT: {
        WELCOME_TITLE: 'Welcome Back to Twindix',
        WELCOME_DESCRIPTION: 'Accurate recommendations for suitable academic and career paths, along with practical steps to help both the parent and the student make a confident, decisive choice.',
    },

    // Code page
    CODE: {
        TITLE_ENTER: 'Enter Code',
        TITLE_SUFFIX: 'Job Bar to Display its',
        TITLE_RESULT: 'Result',
        TITLE_LOADING: 'Loading...',
        TITLE_INCORRECT: 'Incorrect',
        TITLE_CODE: 'Code',
        INPUT_PLACEHOLDER: 'Enter code Job Bar here',
        BUTTON_CONFIRM: 'Confirm',
        BUTTON_LOADING: 'Loading...',
        BUTTON_REENTER: 'Re-Enter',
        ERROR_DEFAULT: 'Re Enter the Code Again.',
    },

    // Result page
    RESULT: {
        COPIED_MESSAGE: 'Copied to clipboard!',
        BUTTON_RESET: 'Reset',
        LOADING: 'Loading...',
    },

    // Profile page
    PROFILE: {
        TITLE: 'Profile',
        NAME_LABEL: 'Name',
        EMAIL_LABEL: 'Email',
        USER_ID_LABEL: 'User ID',
        NOT_AVAILABLE: 'N/A',
    },

    // Common
    COMMON: {
        LOGOUT: 'Log out',
        LOGGING_OUT: 'Logging out...',
        LANGUAGE: 'EN',
        COPY: 'Copy',
    },

    // Validation messages
    VALIDATION: {
        EMAIL_REQUIRED: 'Email is required',
        EMAIL_INVALID: 'Please enter a valid email address',
        PASSWORD_REQUIRED: 'Password is required',
        PASSWORD_MIN_LENGTH: 'Password must be at least 6 characters',
        PASSWORD_LETTER: 'Password must contain at least one letter',
        PASSWORD_NUMBER: 'Password must contain at least one number',
        CODE_REQUIRED: 'Please enter a code',
        CODE_MIN_LENGTH: 'Code must be at least 3 characters',
    },

    // Error messages
    ERRORS: {
        INVALID_CREDENTIALS: 'Invalid credentials',
        EXAM_NOT_FOUND: 'Exam not found',
        INVALID_EXAM_CODE: 'Invalid exam code',
        GENERIC: 'An error occurred',
        TRY_AGAIN: 'An error occurred. Please try again.',
    },
} as const;
