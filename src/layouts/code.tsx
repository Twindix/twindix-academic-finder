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
            console.error(strings.debug.logoutFailed, error);
        } finally {
            setIsLoggingOut(false);
        }
    };

    const lineColor = variant === 'error' ? '#DC2626' : '#0025BA';

    const lineGradient = `linear-gradient(to bottom, transparent 0%, ${lineColor} 30%, ${lineColor} 70%, transparent 100%)`;

    return (
        <div className="min-h-screen md:h-screen bg-background md:overflow-hidden">
            <div className="min-h-screen md:h-full flex flex-col relative mx-2 md:mx-12">
                <div
                    className="hidden md:block absolute left-0 top-0 bottom-0 w-[2px]"
                    style={{ background: lineGradient }}
                />
                <div
                    className="hidden md:block absolute right-0 top-0 bottom-0 w-[2px]"
                    style={{ background: lineGradient }}
                />

                {centered ? (
                    <>
                        <header className="p-4 md:p-6 flex items-start justify-between shrink-0">
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

                        <main className="flex-1 min-h-0 flex items-center py-4 justify-center relative z-10">
                            {children}
                        </main>

                        <footer className="hidden md:block p-6 shrink-0">
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
                    </>
                ) : (
                    <div className="flex-1 flex flex-col md:flex-row min-h-0 p-4 md:p-6 gap-4">
                        <div className="flex md:hidden items-center justify-between shrink-0">
                            <Logo size="md" />
                            <div className="flex items-center gap-2">
                                <Link
                                    to="/profile"
                                    className="flex items-center justify-center w-10 h-10 rounded-lg text-primary hover:bg-primary/5 transition-colors"
                                >
                                    <UserIcon className="w-5 h-5" />
                                </Link>
                                <Button
                                    variant="ghost-danger"
                                    onClick={handleLogout}
                                    disabled={isLoggingOut}
                                >
                                    <LogoutIcon className="w-5 h-5" />
                                </Button>
                            </div>
                        </div>

                        <div className="hidden md:flex flex-col justify-between shrink-0 self-stretch">
                            <Logo size="md" />
                            <Button
                                variant="ghost-danger"
                                onClick={handleLogout}
                                disabled={isLoggingOut}
                                className="flex items-center gap-2"
                            >
                                <LogoutIcon className="w-5 h-5" />
                                {isLoggingOut ? strings.common.loggingOut : strings.common.logout}
                            </Button>
                        </div>

                        <main className="flex-1 min-h-0 relative z-10">
                            {children}
                        </main>

                        <div className="hidden md:block shrink-0">
                            <Link
                                to="/profile"
                                className="flex items-center gap-2 px-3 py-2 rounded-lg text-primary hover:bg-primary/5 transition-colors"
                            >
                                <UserIcon className="w-5 h-5" />
                                <span className="text-sm font-medium">{user?.name || strings.code.defaultUserName}</span>
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
