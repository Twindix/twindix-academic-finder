import { InputHTMLAttributes, useState } from 'react';
import { Button } from './button';
import eyeIcon from '@/assets/icons/eye.svg';
import eyeOffIcon from '@/assets/icons/eye-off.svg';

export function Input({
    label,
    error = false,
    errorMessage,
    showPasswordToggle = false,
    variant = 'default',
    type = 'text',
    className = '',
    ...props
}: InputHTMLAttributes<HTMLInputElement> & {
    label?: string,
    error?: boolean,
    errorMessage?: string,
    showPasswordToggle?: boolean,
    variant?: 'default' | 'primary',
}) {
    const [showPassword, setShowPassword] = useState(false);

    const inputType = showPasswordToggle ? (showPassword ? 'text' : 'password') : type;

    const baseStyles = 'w-full px-5 py-3 rounded-full border-2 bg-white transition-all duration-200 focus:outline-none disabled:cursor-not-allowed disabled:opacity-70';

    const getStateStyles = () => {
        if (error) {
            return 'border-error text-error placeholder-error/50 focus:border-error';
        }
        if (variant === 'primary') {
            return 'border-primary text-text-primary placeholder-text-muted focus:border-primary-dark';
        }
        return 'border-gray-300 text-text-primary placeholder-text-muted focus:border-primary';
    };

    const stateStyles = getStateStyles();

    return (
        <div className="w-full">
            {label && (
                <label className="block text-sm font-medium text-text-primary mb-2">
                    {label}
                </label>
            )}
            <div className="relative">
                <input
                    type={inputType}
                    className={`${baseStyles} ${stateStyles} ${showPasswordToggle ? 'pr-12' : ''} ${className}`}
                    {...props}
                />
                {showPasswordToggle && (
                    <Button
                        type="button"
                        variant="ghost"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted"
                    >
                        <img src={showPassword ? eyeOffIcon : eyeIcon} alt="" className="w-5 h-5" />
                    </Button>
                )}
            </div>
            {errorMessage && error && (
                <p className="mt-1 text-sm text-error">{errorMessage}</p>
            )}
        </div>
    );
}
