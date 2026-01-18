import { Routes, Route, Navigate } from 'react-router-dom';
import { isAuthenticated } from '@/utils';
import { Login, Code, Result, Profile, ForgotPassword, ResetPassword, Register } from '@/pages';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
    if (!isAuthenticated()) {
        return <Navigate to="/login" replace />;
    }

    return <>{children}</>;
}

function PublicRoute({ children }: { children: React.ReactNode }) {
    if (isAuthenticated()) {
        return <Navigate to="/code" replace />;
    }

    return <>{children}</>;
}

export function AppRoutes() {
    return (
        <Routes>
            <Route
                path="/login"
                element={
                    <PublicRoute>
                        <Login />
                    </PublicRoute>
                }
            />
            <Route
                path="/forgot-password"
                element={
                    <PublicRoute>
                        <ForgotPassword />
                    </PublicRoute>
                }
            />
            <Route
                path="/reset-password"
                element={
                    <PublicRoute>
                        <ResetPassword />
                    </PublicRoute>
                }
            />
            <Route
                path="/register"
                element={
                    <PublicRoute>
                        <Register />
                    </PublicRoute>
                }
            />
            <Route
                path="/code"
                element={
                    <ProtectedRoute>
                        <Code />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/result"
                element={
                    <ProtectedRoute>
                        <Result />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/profile"
                element={
                    <ProtectedRoute>
                        <Profile />
                    </ProtectedRoute>
                }
            />
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
    );
}
