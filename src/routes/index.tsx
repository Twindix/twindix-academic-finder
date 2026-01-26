import { Routes, Route, Navigate, useLocation, useSearchParams } from 'react-router-dom';
import { isAuthenticated } from '@/utils';
import { routes } from '@/constants';
import { Login, Code, Result, Profile, ForgotPassword, ResetPassword, Register } from '@/pages';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const location = useLocation();

    if (!isAuthenticated()) {
        const returnUrl = location.pathname + location.search;

        return <Navigate to={`${routes.login}?returnUrl=${encodeURIComponent(returnUrl)}`} replace />;
    }

    return <>{children}</>;
}

function PublicRoute({ children }: { children: React.ReactNode }) {
    const [searchParams] = useSearchParams();

    if (isAuthenticated()) {
        const returnUrl = searchParams.get('returnUrl');

        return <Navigate to={returnUrl || routes.code} replace />;
    }

    return <>{children}</>;
}

export function AppRoutes() {
    return (
        <Routes>
            <Route
                path={routes.login}
                element={
                    <PublicRoute>
                        <Login />
                    </PublicRoute>
                }
            />
            <Route
                path={routes.forgotPassword}
                element={
                    <PublicRoute>
                        <ForgotPassword />
                    </PublicRoute>
                }
            />
            <Route
                path={routes.resetPassword}
                element={
                    <PublicRoute>
                        <ResetPassword />
                    </PublicRoute>
                }
            />
            <Route
                path={routes.register}
                element={
                    <PublicRoute>
                        <Register />
                    </PublicRoute>
                }
            />
            <Route
                path={routes.code}
                element={
                    <ProtectedRoute>
                        <Code />
                    </ProtectedRoute>
                }
            />
            <Route
                path={routes.result}
                element={
                    <ProtectedRoute>
                        <Result />
                    </ProtectedRoute>
                }
            />
            <Route
                path={routes.profile}
                element={
                    <ProtectedRoute>
                        <Profile />
                    </ProtectedRoute>
                }
            />
            <Route path={routes.root} element={<Navigate to={routes.login} replace />} />
            <Route path="*" element={<Navigate to={routes.login} replace />} />
        </Routes>
    );
}
