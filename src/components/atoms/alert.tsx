import { ReactNode } from 'react';
import Button from './button';
import errorIcon from '@/assets/icons/error.svg';
import warningIcon from '@/assets/icons/warning.svg';
import successIcon from '@/assets/icons/success.svg';
import infoIcon from '@/assets/icons/info.svg';
import closeIcon from '@/assets/icons/close.svg';

export default function Alert({
    variant = 'error',
    children,
    className = '',
    onClose,
}: {
    variant?: 'error' | 'warning' | 'success' | 'info',
    children: ReactNode,
    className?: string,
    onClose?: () => void,
}) {
    const variants = {
        error: 'bg-error/10 border-error text-error',
        warning: 'bg-yellow-50 border-yellow-500 text-yellow-700',
        success: 'bg-green-50 border-green-500 text-green-700',
        info: 'bg-primary/10 border-primary text-primary',
    };

    const icons = {
        error: errorIcon,
        warning: warningIcon,
        success: successIcon,
        info: infoIcon,
    };

    return (
        <div
            className={`flex items-start gap-3 p-4 rounded-[14px] border ${variants[variant]} ${className}`}
            role="alert"
        >
            <img src={icons[variant]} alt="" className="w-5 h-5 flex-shrink-0" />
            <div className="flex-1 text-sm font-medium">{children}</div>
            {onClose && (
                <Button
                    variant="ghost"
                    onClick={onClose}
                    className="flex-shrink-0"
                    aria-label="Close alert"
                >
                    <img src={closeIcon} alt="" className="w-5 h-5" />
                </Button>
            )}
        </div>
    );
}
