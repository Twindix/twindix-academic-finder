import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { AuthLayout } from '@/layouts';
import { Button, Input, Alert } from '@/atoms';
import { useAuth } from '@/hooks';
import { validateLoginForm } from '@/utils';
import { strings, routes } from '@/constants';

export function Login() {
    const navigate = useNavigate();

    const [searchParams] = useSearchParams();

    const returnUrl = searchParams.get('returnUrl') || routes.code;

    const { login, isLoading, error, clearError } = useAuth();

    const [email, setEmail] = useState('');

    const [password, setPassword] = useState('');

    const [validationError, setValidationError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setValidationError('');

        clearError();

        const validation = validateLoginForm(email, password);

        if (!validation.isValid) {
            setValidationError(validation.error || strings.errors.checkInput);

            return;
        }

        try {
            await login(email, password);

            navigate(returnUrl);
        } catch (error) {
            console.error(strings.debug.loginFailed, error);
        }
    };

    const displayError = validationError || error;

    const handleDismissError = () => {
        setValidationError('');

        clearError();
    };

    return (
        <AuthLayout>
            <div>
                <h1 className="text-3xl font-bold mb-2 text-gradient">{strings.login.title}</h1>
                <p className="mb-8 text-gradient font-medium">{strings.login.description}</p>{' '}
                {displayError && (
                    <Alert variant="error" className="mb-6" onClose={handleDismissError}>
                        {displayError}
                    </Alert>
                )}
                <form onSubmit={handleSubmit} className="space-y-5">
                    <Input
                        label={strings.login.emailLabel}
                        type="email"
                        placeholder={strings.login.emailPlaceholder}
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);

                            setValidationError('');
                        }}
                        error={!!displayError}
                    />
                    <Input
                        label={strings.login.passwordLabel}
                        type="password"
                        placeholder={strings.login.passwordPlaceholder}
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);

                            setValidationError('');
                        }}
                        showPasswordToggle
                        error={!!displayError}
                    />
                    <div className="flex items-center justify-between text-sm">
                        <span className="text-text-secondary">{strings.login.forgotPassword}</span>
                        <Button variant="link" size="sm" type="button" onClick={() => navigate(routes.forgotPassword)}>
                            {strings.login.forgotPasswordLink}
                        </Button>
                    </div>
                    <Button
                        type="submit"
                        fullWidth
                        loading={isLoading}
                    >
                        {strings.login.submitButton}
                    </Button>
                </form>
            </div>
        </AuthLayout>
    );
}
