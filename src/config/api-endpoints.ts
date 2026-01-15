export const apiBaseUrl = import.meta.env.VITE_API_URL || 'https://acdmicback.twindix.com/api';

export const apiEndpoints = {
    auth: {
        login: '/auth/login',
        logout: '/auth/logout',
        me: '/auth/me',
        refresh: '/auth/refresh',
    },
    exam: {
        process: '/exam-results/process',
        status: '/exam-results/status',
    },
    company: {
        profile: '/company/profile',
    },
} as const;
