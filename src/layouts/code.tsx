import { ReactNode, useState } from 'react';
import { Logo, Button } from '@/atoms';
import { useAuth } from '@/hooks';
import { strings } from '@/constants';
import logoutIcon from '@/assets/icons/logout.svg';

export default function CodeLayout({ children, variant = 'default' }: {
    children: ReactNode,
    variant?: 'default' | 'error',
}) {
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
                    <Button
                        variant="ghost-danger"
                        onClick={handleLogout}
                        disabled={isLoggingOut}
                        className="flex items-center gap-2"
                    >
                        <img src={logoutIcon} alt="" className="w-5 h-5" />
                        {isLoggingOut ? strings.common.loggingOut : strings.common.logout}
                    </Button>
                </footer>
            </div>
        </div>
    );
}
