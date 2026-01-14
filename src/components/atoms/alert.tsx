import { ReactNode } from 'react';

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
        error: (
            <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        ),
        warning: (
            <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
        ),
        success: (
            <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        ),
        info: (
            <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        ),
    };

    return (
        <div
            className={`flex items-start gap-3 p-4 rounded-[14px] border ${variants[variant]} ${className}`}
            role="alert"
        >
            {icons[variant]}
            <div className="flex-1 text-sm font-medium">{children}</div>
            {onClose && (
                <button
                    onClick={onClose}
                    className="flex-shrink-0 cursor-pointer hover:opacity-70 transition-opacity"
                    aria-label="Close alert"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            )}
        </div>
    );
}
