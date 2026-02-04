import type { ReactNode } from "react";
import {
    Navigate,
    Route,
    Routes,
    useLocation,
    useSearchParams,
} from "react-router-dom";

import { routes, strings } from "@/constants";
import {
    Code,
    ForgotPassword,
    Login,
    NotFound,
    Profile,
    Register,
    ResetPassword,
    Result,
} from "@/pages";
import { isAuthenticatedHandler } from "@/utils";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
    const location = useLocation();

    if (!isAuthenticatedHandler()) {
        const returnUrl = location.pathname + location.search;

        return (
            <Navigate
                to={`${routes.login}?${strings.queryParams.returnUrl}=${encodeURIComponent(returnUrl)}`}
                replace
            />
        );
    }

    return <>{children}</>;
};

const PublicRoute = ({ children }: { children: ReactNode }) => {
    const [searchParams] = useSearchParams();

    if (isAuthenticatedHandler()) {
        const returnUrl = searchParams.get(strings.queryParams.returnUrl);

        return (
            <Navigate
                to={returnUrl || routes.code}
                replace
            />
        );
    }

    return <>{children}</>;
};

export const AppRoutes = () => (
    <Routes>
        <Route
            path={routes.login}
            element={(
                <PublicRoute>
                    <Login />
                </PublicRoute>
            )}
        />
        <Route
            path={routes.forgotPassword}
            element={(
                <PublicRoute>
                    <ForgotPassword />
                </PublicRoute>
            )}
        />
        <Route
            path={routes.resetPassword}
            element={(
                <PublicRoute>
                    <ResetPassword />
                </PublicRoute>
            )}
        />
        <Route
            path={routes.register}
            element={(
                <PublicRoute>
                    <Register />
                </PublicRoute>
            )}
        />
        <Route
            path={routes.code}
            element={(
                <ProtectedRoute>
                    <Code />
                </ProtectedRoute>
            )}
        />
        <Route
            path={routes.result}
            element={(
                <ProtectedRoute>
                    <Result />
                </ProtectedRoute>
            )}
        />
        <Route
            path={routes.profile}
            element={(
                <ProtectedRoute>
                    <Profile />
                </ProtectedRoute>
            )}
        />
        <Route
            path={routes.root}
            element={(
                <Navigate
                    to={routes.login}
                    replace
                />
            )}
        />
        <Route
            element={<NotFound />}
            path="*"
        />
    </Routes>
);
