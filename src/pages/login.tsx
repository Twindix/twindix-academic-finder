import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthLayout, Button, Input } from '@/components';
import { useAuthStore } from '@/store';

export default function Login() {
    const navigate = useNavigate();
    const { login, isLoading, error, clearError } = useAuthStore();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [localError, setLocalError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLocalError('');
        clearError();

        // Basic validation
        if (!email.trim()) {
            setLocalError('Please enter your email');
            return;
        }

        if (!password.trim()) {
            setLocalError('Please enter your password');
            return;
        }

        try {
            await login(email, password);
            navigate('/code');
        } catch {
            // Error is handled by the store
        }
    };

    const displayError = localError || error;

    return (
        <AuthLayout>
            <div>
                <h1 className="text-3xl font-bold text-primary mb-2">
                    <span className="underline">Login</span>
                </h1>
                <p className="text-text-primary mb-8">
                    Welcome{' '}
                    <span className="text-primary-light">Back Please enter The Details For Your Account</span>
                </p>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <Input
                        label="E-mail"
                        type="email"
                        placeholder="Write here"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                            setLocalError('');
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
                            setLocalError('');
                        }}
                        showPasswordToggle
                        error={!!displayError}
                    />

                    <div className="flex items-center justify-between text-sm">
                        <span className="text-text-secondary">Forget your password?</span>
                        <button type="button" className="text-primary-light hover:underline">
                            Click here
                        </button>
                    </div>

                    {displayError && (
                        <p className="text-error text-sm">{displayError}</p>
                    )}

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
