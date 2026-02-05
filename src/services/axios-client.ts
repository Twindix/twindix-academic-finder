import type { AxiosError, InternalAxiosRequestConfig } from "axios";
import axios from "axios";

import {
    apiBaseUrl,
    apiEndpoints,
    routes,
    strings,
} from "@/constants";
import type { NullableErrorType } from "@/types";

const getCookieHandler = (name: string): string | null => {
    const value = `; ${document.cookie}`;

    const parts = value.split(`; ${name}=`);

    if (parts.length === 2) return parts.pop()?.split(";").shift() || null;

    return null;
};

const setCookieHandler = (
    name: string,
    value: string,
    days: number = 7,
): void => {
    const expires = new Date();

    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);

    document.cookie = `${name}=${value}${strings.cookie.expiresPrefix}${expires.toUTCString()}${strings.cookie.pathSuffix}`;
};

const deleteCookieHandler = (name: string): void => void (document.cookie = `${name}${strings.cookie.expiredDate}`);

export const tokenKey = strings.auth.tokenKey;

export const getTokenHandler = (): string | null => getCookieHandler(tokenKey);

export const setTokenHandler = (token: string): void => setCookieHandler(
    tokenKey,
    token,
    7,
);

export const removeTokenHandler = (): void => deleteCookieHandler(tokenKey);

const getLoginUrlWithReturnPathHandler = (): string => {
    const currentPath = window.location.pathname + window.location.search;

    if (currentPath && currentPath !== routes.login && currentPath !== routes.root) return `${routes.login}?returnUrl=${encodeURIComponent(currentPath)}`;

    return routes.login;
};

const axiosClient = axios.create({
    baseURL: apiBaseUrl,
    headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
    },
    timeout: 30000,
});

let isRefreshing = false;

let failedQueue: Array<{
    reject: (reason?: unknown) => void, // eslint-disable-line code-style/prop-naming-convention -- Promise callback
    resolve: (value?: unknown) => void, // eslint-disable-line code-style/prop-naming-convention -- Promise callback
}> = [];

const processQueueHandler = (error: NullableErrorType, token: string | null = null): void => {
    failedQueue.forEach((prom) => {
        if (error) prom.reject(error);
        else prom.resolve(token);
    });

    failedQueue = [];
};

axiosClient.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const { headers } = config;

        const token = getTokenHandler();

        if (token && headers) headers[strings.auth.authorizationHeader] = `${strings.auth.bearerPrefix}${token}`;

        return config;
    },
    (error: AxiosError) => Promise.reject(error),
);

axiosClient.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
        const {
            config,
            message,
            response: {
                data,
                status,
            } = {},
        } = error;

        const originalRequest = config as InternalAxiosRequestConfig & { _retry?: boolean };

        if (status === 401 && !originalRequest._retry) {
            if (originalRequest.url === apiEndpoints.auth.refresh) {
                removeTokenHandler();

                window.location.href = getLoginUrlWithReturnPathHandler();

                return Promise.reject(error);
            }

            if (isRefreshing) {
                return new Promise((resolve, reject) => failedQueue.push({
                    reject,
                    resolve,
                })).then((token) => {
                    if (originalRequest.headers) originalRequest.headers[strings.auth.authorizationHeader] = `${strings.auth.bearerPrefix}${token}`;

                    return axiosClient(originalRequest);
                });
            }

            originalRequest._retry = true;

            isRefreshing = true;

            try {
                const tokenResponse = await axiosClient.post<{ token: string }>(apiEndpoints.auth.refresh);

                const newToken = tokenResponse.data.token;

                setTokenHandler(newToken);

                processQueueHandler(
                    null,
                    newToken,
                );

                if (originalRequest.headers) originalRequest.headers[strings.auth.authorizationHeader] = `${strings.auth.bearerPrefix}${newToken}`;

                return axiosClient(originalRequest);
            } catch (refreshError) {
                processQueueHandler(
                    refreshError as Error,
                    null,
                );

                removeTokenHandler();

                window.location.href = getLoginUrlWithReturnPathHandler();

                return Promise.reject(refreshError);
            } finally {
                isRefreshing = false;
            }
        }

        const errorMessage = (data as { message?: string })?.message || message || strings.errors.genericError;

        return Promise.reject(new Error(errorMessage));
    },
);

export { axiosClient };
