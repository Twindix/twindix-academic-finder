export const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://acdmicback.twindix.com/api';

export const API_ENDPOINTS = {
    AUTH: {
        LOGIN: '/auth/login',
        LOGOUT: '/auth/logout',
        ME: '/auth/me',
        REFRESH: '/auth/refresh',
    },
    EXAM: {
        PROCESS: '/exam-results/process',
        STATUS: '/exam-results/status',
    },
    COMPANY: {
        PROFILE: '/company/profile',
    },
} as const;
