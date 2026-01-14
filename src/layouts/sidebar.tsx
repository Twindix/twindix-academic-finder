import { useState } from 'react';
import { Logo, Button } from '@/components/atoms';
import { useAuth } from '@/hooks';
import { strings } from '@/constants';

export default function Sidebar() {
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

    return (
        <aside className="w-64 min-h-screen bg-surface border-r border-gray-100 flex flex-col">
            <div className="p-6">
                <Logo size="md" />
            </div>

            <div className="flex-1" />

            <div className="p-6">
                <Button
                    variant="ghost-danger"
                    onClick={handleLogout}
                    disabled={isLoggingOut}
                    className="flex items-center gap-2"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    {isLoggingOut ? strings.common.loggingOut : strings.common.logout}
                </Button>
            </div>
        </aside>
    );
}
