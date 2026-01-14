import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthLayout, Button, Input, Alert } from '@/components';
import { useAuth } from '@/hooks';
import { validateLoginForm } from '@/utils';

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
                <h1 className="text-3xl font-bold text-secondary mb-2">
                    <span className="underline">Login</span>
                </h1>
                <p className="mb-8">
                    <span className="text-gradient font-medium">Welcome Back</span>{' '}
                    <span className="text-text-secondary">Please enter The Details For Your Account</span>
                </p>

                {displayError && (
                    <Alert variant="error" className="mb-6" onClose={handleDismissError}>
                        {displayError}
                    </Alert>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                    <Input
                        label="E-mail"
                        type="email"
                        placeholder="Write here"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                            setValidationError('');
                        }}
                        error={!!displayError}
                    />

                    <Input
                        label="Password"
                        type="password"
                        placeholder="Enter Password here"
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                            setValidationError('');
                        }}
                        showPasswordToggle
                        error={!!displayError}
                    />

                    <div className="flex items-center justify-between text-sm">
                        <span className="text-text-secondary">Forget your password?</span>
                        <button type="button" className="text-primary hover:underline cursor-pointer">
                            Click here
                        </button>
                    </div>

                    <Button
                        type="submit"
                        fullWidth
                        loading={isLoading}
                    >
                        Login
                    </Button>
                </form>
            </div>
        </AuthLayout>
    );
}
