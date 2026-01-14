import { Routes, Route, Navigate } from 'react-router-dom';
import { isAuthenticated } from '@/utils';
import { Login, Code, Result, Profile } from '@/pages';

interface ProtectedRouteProps {
    children: React.ReactNode;
}

function ProtectedRoute({ children }: ProtectedRouteProps) {
    if (!isAuthenticated()) {
        return <Navigate to="/login" replace />;
    }

    return <>{children}</>;
}

interface PublicRouteProps {
    children: React.ReactNode;
}

function PublicRoute({ children }: PublicRouteProps) {
    if (isAuthenticated()) {
        return <Navigate to="/code" replace />;
    }

    return <>{children}</>;
}

export default function AppRoutes() {
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
