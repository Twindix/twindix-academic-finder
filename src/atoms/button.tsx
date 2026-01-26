import { ButtonHTMLAttributes, ReactNode } from 'react';
import { strings } from '@/constants';

export function Button({
    variant = 'primary',
    size = 'md',
    loading = false,
    fullWidth = false,
    disabled,
    children,
    className = '',
    ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: 'primary' | 'muted' | 'danger' | 'ghost' | 'ghost-danger' | 'link',
    size?: 'sm' | 'md',
    loading?: boolean,
    fullWidth?: boolean,
    children: ReactNode,
}) {
    const baseStyles = 'font-medium transition-all duration-200 cursor-pointer focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed';

    const variants = {
        primary: 'bg-primary text-white hover:bg-primary-dark focus:ring-2 focus:ring-offset-2 focus:ring-primary rounded-full',
        muted: 'bg-muted text-white hover:bg-muted/90 focus:ring-2 focus:ring-offset-2 focus:ring-muted rounded-full',
        danger: 'bg-error text-white hover:bg-error-light focus:ring-2 focus:ring-offset-2 focus:ring-error rounded-full',
        ghost: 'text-text-secondary hover:text-text-primary',
        'ghost-danger': 'text-error hover:text-error-light',
        link: 'text-primary hover:underline',
    };

    const sizes = {
        sm: variant === 'ghost' || variant === 'ghost-danger' || variant === 'link' ? 'text-sm' : 'px-4 py-2 text-sm',
        md: variant === 'ghost' || variant === 'ghost-danger' || variant === 'link' ? '' : 'px-8 py-3',
    };

    const widthStyles = fullWidth ? 'w-full' : '';
    const loadingStyles = loading ? 'cursor-wait' : '';

    return (
        <button
            className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${widthStyles} ${loadingStyles} ${className}`}
            disabled={disabled || loading}
            {...props}
        >
            {loading ? strings.common.loading : children}
        </button>
    );
}
