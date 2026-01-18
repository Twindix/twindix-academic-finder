import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { AuthLayout } from '@/layouts';
import { Button, Input, Alert } from '@/atoms';
import { api } from '@/services';
import { validatePassword } from '@/utils';
import { strings } from '@/constants';

export function ResetPassword() {
    const navigate = useNavigate();

    const [searchParams] = useSearchParams();

    const [token, setToken] = useState('');

    const [email, setEmail] = useState('');

    const [password, setPassword] = useState('');

    const [confirmPassword, setConfirmPassword] = useState('');

    const [isLoading, setIsLoading] = useState(false);

    const [error, setError] = useState('');

    const [isSuccess, setIsSuccess] = useState(false);

    useEffect(() => {
        const tokenParam = searchParams.get('token');

        const emailParam = searchParams.get('email');

        if (!tokenParam || !emailParam) {
            setError(strings.resetPassword.invalidLink);

            return;
        }

        setToken(tokenParam);

        setEmail(emailParam);
    }, [searchParams]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setError('');

        if (!token || !email) {
            setError(strings.resetPassword.invalidLink);

            return;
        }

        const validation = validatePassword(password);

        if (!validation.isValid) {
            setError(validation.error || strings.errors.checkInput);

            return;
        }

        if (password !== confirmPassword) {
            setError(strings.resetPassword.passwordMismatch);

            return;
        }

        setIsLoading(true);

        try {
            await api.resetPassword(token, email, password, confirmPassword);

            setIsSuccess(true);

            setTimeout(() => navigate('/login'), 2000);
        } catch (err) {
            setError(err instanceof Error ? err.message : strings.errors.genericError);
        } finally {
            setIsLoading(false);
        }
    };

    const handleBackToLogin = () => {
        navigate('/login');
    };

    if (isSuccess) {
        return (
            <AuthLayout title={strings.resetPassword.sidebarTitle} description={strings.resetPassword.sidebarDescription}>
                <div>
                    <h1 className="text-3xl font-bold mb-2 text-gradient">{strings.resetPassword.title}</h1>
                    <Alert variant="success" className="mb-6">
                        {strings.resetPassword.successMessage}
                    </Alert>
                    <p className="text-text-secondary text-center">
                        {strings.resetPassword.redirectMessage}
                    </p>
                </div>
            </AuthLayout>
        );
    }

    if (!token || !email) {
        return (
            <AuthLayout title={strings.resetPassword.sidebarTitle} description={strings.resetPassword.sidebarDescription}>
                <div>
                    <h1 className="text-3xl font-bold mb-2 text-gradient">{strings.resetPassword.title}</h1>
                    <Alert variant="error" className="mb-6">
                        {strings.resetPassword.invalidLink}
                    </Alert>
                    <Button variant="link" onClick={handleBackToLogin}>
                        {strings.forgotPassword.backToLogin}
                    </Button>
                </div>
            </AuthLayout>
        );
    }

    return (
        <AuthLayout title={strings.resetPassword.sidebarTitle} description={strings.resetPassword.sidebarDescription}>
            <div>
                <h1 className="text-3xl font-bold mb-2 text-gradient">{strings.resetPassword.title}</h1>
                <p className="mb-8 text-text-secondary">{strings.resetPassword.description}</p>
                {error && (
                    <Alert variant="error" className="mb-6" onClose={() => setError('')}>
                        {error}
                    </Alert>
                )}
                <form onSubmit={handleSubmit} className="space-y-5">
                    <Input
                        label={strings.resetPassword.passwordLabel}
                        type="password"
                        placeholder={strings.resetPassword.passwordPlaceholder}
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);

                            setError('');
                        }}
                        showPasswordToggle
                        error={!!error}
                    />
                    <Input
                        label={strings.resetPassword.confirmPasswordLabel}
                        type="password"
                        placeholder={strings.resetPassword.confirmPasswordPlaceholder}
                        value={confirmPassword}
                        onChange={(e) => {
                            setConfirmPassword(e.target.value);

                            setError('');
                        }}
                        showPasswordToggle
                        error={!!error}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        loading={isLoading}
                    >
                        {strings.resetPassword.submitButton}
                    </Button>
                </form>
                <div className="mt-4 text-center">
                    <Button variant="link" onClick={handleBackToLogin}>
                        {strings.forgotPassword.backToLogin}
                    </Button>
                </div>
            </div>
        </AuthLayout>
    );
}
