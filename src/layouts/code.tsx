import { ReactNode, useState } from 'react';
import { Link } from 'react-router-dom';
import { Logo, Button, LogoutIcon, UserIcon } from '@/atoms';
import { useAuth } from '@/hooks';
import { strings } from '@/constants';

export function CodeLayout({ children, variant = 'default', centered = true }: {
    children: ReactNode,
    variant?: 'default' | 'error',
    centered?: boolean,
}) {
    const { user, logout } = useAuth();
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

                <header className={`${centered ? 'p-4 md:p-6' : 'p-3 md:p-4'} flex items-center justify-between shrink-0`}>
                    <Logo size="md" />
                    <div className="flex items-center gap-2">
                        <Link
                            to="/profile"
                            className="hidden md:flex items-center gap-2 px-3 py-2 rounded-lg text-primary hover:bg-primary/5 transition-colors"
                        >
                            <UserIcon className="w-5 h-5" />
                            <span className="text-sm font-medium">{user?.name || strings.code.defaultUserName}</span>
                        </Link>
                        <Link
                            to="/profile"
                            className="flex md:hidden items-center justify-center w-10 h-10 rounded-lg text-primary hover:bg-primary/5 transition-colors"
                        >
                            <UserIcon className="w-5 h-5" />
                        </Link>
                        <Button
                            variant="ghost-danger"
                            onClick={handleLogout}
                            disabled={isLoggingOut}
                            className="flex md:hidden items-center gap-2"
                        >
                            <LogoutIcon className="w-5 h-5" />
                        </Button>
                    </div>
                </header>

                <main className={`flex-1 min-h-0 flex ${centered ? 'items-center py-4' : 'items-stretch'} justify-center relative z-10`}>
                    {children}
                </main>

                <footer className={`${centered ? 'block' : 'hidden'} hidden md:block p-6`}>
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
