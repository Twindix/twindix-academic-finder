export const apiBaseUrl = import.meta.env.VITE_API_URL;

export const apiEndpoints = {
    auth: {
        forgotPassword: "/auth/forgot-password",
        login: "/auth/login",
        logout: "/auth/logout",
        me: "/auth/me",
        refresh: "/auth/refresh",
        resetPassword: "/auth/reset-password",
    },
    company: { profile: "/company/profile" },
    exam: {
        process: "/exam-results/process",
        status: "/exam-results/status",
    },
    invitations: { accept: "/invitations/accept" },
} as const;
