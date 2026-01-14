import { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'muted' | 'danger';
    loading?: boolean;
    fullWidth?: boolean;
    children: ReactNode;
}

export default function Button({
    variant = 'primary',
    loading = false,
    fullWidth = false,
    disabled,
    children,
    className = '',
    ...props
}: ButtonProps) {
    const baseStyles = 'px-8 py-3 rounded-[14px] font-medium transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2';

    const variants = {
        primary: 'bg-primary text-white hover:bg-primary-dark focus:ring-primary disabled:opacity-50',
        muted: 'bg-muted text-white hover:bg-muted/90 focus:ring-muted disabled:opacity-50',
        danger: 'bg-error text-white hover:bg-error-light focus:ring-error disabled:opacity-50',
    };

    const widthStyles = fullWidth ? 'w-full' : '';
    const loadingStyles = loading ? 'cursor-wait' : '';

    return (
        <button
            className={`${baseStyles} ${variants[variant]} ${widthStyles} ${loadingStyles} ${className}`}
            disabled={disabled || loading}
            {...props}
        >
            {loading ? 'Loading...' : children}
        </button>
    );
}
