import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { AuthLayout } from '@/layouts';
import { Button, Input, Alert } from '@/atoms';
import { api } from '@/services';
import { validateEmail, validatePassword } from '@/utils';
import { strings } from '@/constants';

export function Register() {
    const navigate = useNavigate();

    const [searchParams] = useSearchParams();

    const [token, setToken] = useState('');

    const [name, setName] = useState('');

    const [email, setEmail] = useState('');

    const [companyName, setCompanyName] = useState('');

    const [phone, setPhone] = useState('');

    const [password, setPassword] = useState('');

    const [confirmPassword, setConfirmPassword] = useState('');

    const [isLoading, setIsLoading] = useState(false);

    const [error, setError] = useState('');

    const [isSuccess, setIsSuccess] = useState(false);

    useEffect(() => {
        const tokenParam = searchParams.get('token');

        if (tokenParam) {
            setToken(tokenParam);
        }
    }, [searchParams]);

    const validateForm = (): string | null => {
        if (!name.trim()) {
            return strings.validation.nameRequired;
        }

        const emailValidation = validateEmail(email);

        if (!emailValidation.isValid) {
            return emailValidation.error || strings.validation.emailInvalid;
        }

        if (!companyName.trim()) {
            return strings.validation.companyNameRequired;
        }

        if (!phone.trim()) {
            return strings.validation.phoneRequired;
        }

        const passwordValidation = validatePassword(password);

        if (!passwordValidation.isValid) {
            return passwordValidation.error || strings.errors.checkInput;
        }

        if (password !== confirmPassword) {
            return strings.register.passwordMismatch;
        }

        return null;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setError('');

        const validationError = validateForm();

        if (validationError) {
            setError(validationError);

            return;
        }

        setIsLoading(true);

        try {
            await api.acceptInvitation(token, {
                name,
                email,
                companyName,
                phone,
                password,
                passwordConfirmation: confirmPassword,
            });

            setIsSuccess(true);
        } catch (err) {
            setError(err instanceof Error ? err.message : strings.errors.genericError);
        } finally {
            setIsLoading(false);
        }
    };

    const handleBackToLogin = () => {
        navigate('/login');
    };

    const clearError = () => {
        setError('');
    };

    if (isSuccess) {
        return (
            <AuthLayout title={strings.register.sidebarTitle} description={strings.register.sidebarDescription}>
                <div>
                    <h1 className="text-3xl font-bold mb-2 text-gradient">{strings.register.title}</h1>
                    <Alert variant="success" className="mb-6">
                        {strings.register.successMessage}
                    </Alert>
                    <Button fullWidth onClick={handleBackToLogin}>
                        {strings.register.goToLogin}
                    </Button>
                </div>
            </AuthLayout>
        );
    }

    if (!token) {
        return (
            <AuthLayout title={strings.register.sidebarTitle} description={strings.register.sidebarDescription}>
                <div>
                    <h1 className="text-3xl font-bold mb-2 text-gradient">{strings.register.title}</h1>
                    <Alert variant="error" className="mb-6">
                        {strings.register.invalidToken}
                    </Alert>
                    <Button variant="link" onClick={handleBackToLogin}>
                        {strings.register.backToLogin}
                    </Button>
                </div>
            </AuthLayout>
        );
    }

    return (
        <AuthLayout title={strings.register.sidebarTitle} description={strings.register.sidebarDescription}>
            <div>
                <h1 className="text-3xl font-bold mb-2 text-gradient">{strings.register.title}</h1>
                <p className="mb-8 text-gradient font-medium">{strings.register.description}</p>
                {error && (
                    <Alert variant="error" className="mb-6" onClose={clearError}>
                        {error}
                    </Alert>
                )}
                <form onSubmit={handleSubmit} className="space-y-5">
                    <Input
                        label={strings.register.nameLabel}
                        type="text"
                        placeholder={strings.register.namePlaceholder}
                        value={name}
                        onChange={(e) => {
                            setName(e.target.value);

                            clearError();
                        }}
                        error={!!error}
                    />
                    <Input
                        label={strings.register.emailLabel}
                        type="email"
                        placeholder={strings.register.emailPlaceholder}
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);

                            clearError();
                        }}
                        error={!!error}
                    />
                    <Input
                        label={strings.register.companyNameLabel}
                        type="text"
                        placeholder={strings.register.companyNamePlaceholder}
                        value={companyName}
                        onChange={(e) => {
                            setCompanyName(e.target.value);

                            clearError();
                        }}
                        error={!!error}
                    />
                    <Input
                        label={strings.register.phoneLabel}
                        type="tel"
                        placeholder={strings.register.phonePlaceholder}
                        value={phone}
                        onChange={(e) => {
                            setPhone(e.target.value);

                            clearError();
                        }}
                        error={!!error}
                    />
                    <Input
                        label={strings.register.passwordLabel}
                        type="password"
                        placeholder={strings.register.passwordPlaceholder}
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);

                            clearError();
                        }}
                        showPasswordToggle
                        error={!!error}
                    />
                    <Input
                        label={strings.register.confirmPasswordLabel}
                        type="password"
                        placeholder={strings.register.confirmPasswordPlaceholder}
                        value={confirmPassword}
                        onChange={(e) => {
                            setConfirmPassword(e.target.value);

                            clearError();
                        }}
                        showPasswordToggle
                        error={!!error}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        loading={isLoading}
                    >
                        {strings.register.submitButton}
                    </Button>
                </form>
                <div className="mt-4 text-center">
                    <Button variant="link" onClick={handleBackToLogin}>
                        {strings.register.backToLogin}
                    </Button>
                </div>
            </div>
        </AuthLayout>
    );
}
