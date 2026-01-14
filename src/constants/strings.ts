export const strings = {
    appName: 'Twindix Academic Finder',
    companyName: 'Twindix Global Inc.',

    login: {
        title: 'Login',
        welcome: 'Welcome',
        welcomeSuffix: 'Back Please enter The Details For Your Account',
        emailLabel: 'E-mail',
        emailPlaceholder: 'Enter E-mail here',
        passwordLabel: 'Password',
        passwordPlaceholder: 'Enter Password here',
        forgotPassword: 'Forget your password?',
        forgotPasswordLink: 'Click here',
        submitButton: 'Login',
    },

    authLayout: {
        welcomeTitle: 'Welcome Back to Twindix',
        welcomeDescription: 'Accurate recommendations for suitable academic and career paths, along with practical steps to help both the parent and the student make a confident, decisive choice.',
    },

    code: {
        titleEnter: 'Enter Code',
        titleSuffix: 'Job Bar to Display its',
        titleResult: 'Result',
        titleLoading: 'Loading...',
        titleIncorrect: 'Incorrect',
        titleCode: 'Code',
        inputPlaceholder: 'Enter code Job Bar here',
        buttonConfirm: 'Confirm',
        buttonLoading: 'Loading...',
        buttonReenter: 'Re-Enter',
        errorDefault: 'Re Enter the Code Again.',
    },

    result: {
        copiedMessage: 'Copied to clipboard!',
        buttonReset: 'Reset',
        loading: 'Loading...',
    },

    profile: {
        title: 'Profile',
        nameLabel: 'Name',
        emailLabel: 'Email',
        userIdLabel: 'User ID',
        notAvailable: 'N/A',
    },

    common: {
        logout: 'Log out',
        loggingOut: 'Logging out...',
        language: 'EN',
        copy: 'Copy',
    },

    validation: {
        emailRequired: 'Email is required',
        emailInvalid: 'Please enter a valid email address',
        passwordRequired: 'Password is required',
        passwordMinLength: 'Password must be at least 6 characters',
        passwordLetter: 'Password must contain at least one letter',
        passwordNumber: 'Password must contain at least one number',
        codeRequired: 'Please enter a code',
        codeMinLength: 'Code must be at least 3 characters',
    },

    errors: {
        invalidCredentials: 'Invalid credentials',
        examNotFound: 'Exam not found',
        invalidExamCode: 'Invalid exam code',
        generic: 'An error occurred',
        tryAgain: 'An error occurred. Please try again.',
    },
} as const;
