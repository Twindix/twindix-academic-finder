import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthLayout } from '@/layouts';
import { Button, Input, Alert } from '@/atoms';
import { api } from '@/services';
import { validateEmail } from '@/utils';
import { strings, routes } from '@/constants';

export function ForgotPassword() {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');

    const [isLoading, setIsLoading] = useState(false);

    const [error, setError] = useState('');

    const [isSuccess, setIsSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setError('');

        const validation = validateEmail(email);

        if (!validation.isValid) {
            setError(validation.error || strings.errors.checkInput);

            return;
        }

        setIsLoading(true);

        try {
            await api.forgotPassword(email);

            setIsSuccess(true);
        } catch (err) {
            setError(err instanceof Error ? err.message : strings.errors.genericError);
        } finally {
            setIsLoading(false);
        }
    };

    const handleBackToLogin = () => {
        navigate(routes.login);
    };

    if (isSuccess) {
        return (
            <AuthLayout title={strings.forgotPassword.sidebarTitle} description={strings.forgotPassword.sidebarDescription}>
                <div>
                    <h1 className="text-3xl font-bold mb-2 text-gradient">{strings.forgotPassword.title}</h1>
                    <Alert variant="success" className="mb-6">
                        {strings.forgotPassword.successMessage}
                    </Alert>
                    <Button variant="link" onClick={handleBackToLogin}>
                        {strings.forgotPassword.backToLogin}
                    </Button>
                </div>
            </AuthLayout>
        );
    }

    return (
        <AuthLayout title={strings.forgotPassword.sidebarTitle} description={strings.forgotPassword.sidebarDescription}>
            <div>
                <h1 className="text-3xl font-bold mb-2 text-gradient">{strings.forgotPassword.title}</h1>
                <p className="mb-8 text-text-secondary">{strings.forgotPassword.description}</p>
                {error && (
                    <Alert variant="error" className="mb-6" onClose={() => setError('')}>
                        {error}
                    </Alert>
                )}
                <form onSubmit={handleSubmit} className="space-y-5">
                    <Input
                        label={strings.forgotPassword.emailLabel}
                        type="email"
                        placeholder={strings.forgotPassword.emailPlaceholder}
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);

                            setError('');
                        }}
                        error={!!error}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        loading={isLoading}
                    >
                        {strings.forgotPassword.submitButton}
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
