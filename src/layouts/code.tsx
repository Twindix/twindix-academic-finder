import { ReactNode, useState } from 'react';
import { Logo, Button, LogoutIcon } from '@/atoms';
import { useAuth } from '@/hooks';
import { strings } from '@/constants';

export function CodeLayout({ children, variant = 'default' }: {
    children: ReactNode,
    variant?: 'default' | 'error',
}) {
    const { logout } = useAuth();
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    const handleLogout = async () => {
        setIsLoggingOut(true);
        try {
            await logout();
        } catch (error) {
            console.error('Logout failed:', error);
        } finally {
            setIsLoggingOut(false);
        }
    };

    const lineColor = variant === 'error' ? '#DC2626' : '#0025BA';

    const lineGradient = `linear-gradient(to bottom, transparent 0%, ${lineColor} 30%, ${lineColor} 70%, transparent 100%)`;

    return (
        <div className="min-h-screen md:h-screen bg-surface md:overflow-hidden">
            <div className="min-h-screen md:h-full flex flex-col relative mx-2 md:mx-12">
                <div
                    className="hidden md:block absolute left-0 top-0 bottom-0 w-[2px]"
                    style={{ background: lineGradient }}
                />
                <div
                    className="hidden md:block absolute right-0 top-0 bottom-0 w-[2px]"
                    style={{ background: lineGradient }}
                />

                <header className="p-4 md:p-6 flex items-center justify-between">
                    <Logo size="md" />
                    <Button
                        variant="ghost-danger"
                        onClick={handleLogout}
                        disabled={isLoggingOut}
                        className="flex md:hidden items-center gap-2"
                    >
                        <LogoutIcon className="w-5 h-5" />
                        {isLoggingOut ? strings.common.loggingOut : strings.common.logout}
                    </Button>
                </header>

                <main className="flex-1 min-h-0 flex items-center justify-center relative z-10 py-4">
                    {children}
                </main>

                <footer className="hidden md:block p-6">
                    <Button
                        variant="ghost-danger"
                        onClick={handleLogout}
                        disabled={isLoggingOut}
                        className="flex items-center gap-2"
                    >
                        <LogoutIcon className="w-5 h-5" />
                        {isLoggingOut ? strings.common.loggingOut : strings.common.logout}
                    </Button>
                </footer>
            </div>
        </div>
    );
}
