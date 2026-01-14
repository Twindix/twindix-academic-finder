import { ReactNode, useState } from 'react';
import { Logo } from '@/components/atoms';
import { useAuth } from '@/hooks';
import { strings } from '@/constants';

interface CodeLayoutProps {
    children: ReactNode,
    variant?: 'default' | 'error',
}

export default function CodeLayout({ children, variant = 'default' }: CodeLayoutProps) {
    const { logout } = useAuth();
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    const handleLogout = async () => {
        setIsLoggingOut(true);
        try {
            await logout();
        } catch {
        } finally {
            setIsLoggingOut(false);
        }
    };

    const lineColor = variant === 'error' ? '#DC2626' : '#0025BA';

    const lineGradient = `linear-gradient(to bottom, transparent 0%, ${lineColor} 30%, ${lineColor} 70%, transparent 100%)`;

    return (
        <div className="min-h-screen bg-surface">
            <div className="min-h-screen flex flex-col relative mx-12">
                <div
                    className="absolute left-0 top-0 bottom-0 w-[2px]"
                    style={{ background: lineGradient }}
                />
                <div
                    className="absolute right-0 top-0 bottom-0 w-[2px]"
                    style={{ background: lineGradient }}
                />

                <header className="p-6">
                    <Logo size="md" />
                </header>

                <main className="flex-1 flex items-center justify-center relative z-10">
                    {children}
                </main>

                <footer className="p-6">
                    <button
                        onClick={handleLogout}
                        disabled={isLoggingOut}
                        className="flex items-center gap-2 text-error hover:text-error-light transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        <span className="font-medium">
                            {isLoggingOut ? strings.common.loggingOut : strings.common.logout}
                        </span>
                    </button>
                </footer>
            </div>
        </div>
    );
}
