import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthLayout, Button, Input, Alert } from '@/components';
import { useAuth } from '@/hooks';
import { validateLoginForm } from '@/utils';
import { STRINGS } from '@/constants';

export default function Login() {
    const navigate = useNavigate();
    const { login, isLoading, error, clearError } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [validationError, setValidationError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setValidationError('');
        clearError();

        // Validate form
        const validation = validateLoginForm(email, password);
        if (!validation.isValid) {
            setValidationError(validation.error || 'Please check your input');
            return;
        }

        try {
            await login(email, password);
            navigate('/code');
        } catch {
            // Error is handled by the hook
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
                <h1 className="text-3xl font-bold mb-2">
                    <span className="text-gradient underline">{STRINGS.LOGIN.TITLE}</span>
                </h1>
                <p className="mb-8">
                    <span className="text-text-dark font-medium">{STRINGS.LOGIN.WELCOME}</span>{' '}
                    <span className="text-secondary">{STRINGS.LOGIN.WELCOME_SUFFIX}</span>
                </p>

                {displayError && (
                    <Alert variant="error" className="mb-6" onClose={handleDismissError}>
                        {displayError}
                    </Alert>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                    <Input
                        label={STRINGS.LOGIN.EMAIL_LABEL}
                        type="email"
                        placeholder={STRINGS.LOGIN.EMAIL_PLACEHOLDER}
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                            setValidationError('');
                        }}
                        error={!!displayError}
                    />

                    <Input
                        label={STRINGS.LOGIN.PASSWORD_LABEL}
                        type="password"
                        placeholder={STRINGS.LOGIN.PASSWORD_PLACEHOLDER}
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                            setValidationError('');
                        }}
                        showPasswordToggle
                        error={!!displayError}
                    />

                    <div className="flex items-center justify-between text-sm">
                        <span className="text-text-secondary">{STRINGS.LOGIN.FORGOT_PASSWORD}</span>
                        <button type="button" className="text-primary hover:underline cursor-pointer">
                            {STRINGS.LOGIN.FORGOT_PASSWORD_LINK}
                        </button>
                    </div>

                    <Button
                        type="submit"
                        fullWidth
                        loading={isLoading}
                    >
                        {STRINGS.LOGIN.SUBMIT_BUTTON}
                    </Button>
                </form>
            </div>
        </AuthLayout>
    );
}
