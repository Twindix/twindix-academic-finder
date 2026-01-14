import { useState } from 'react';
import { Logo, Button } from '@/atoms';
import { useAuth } from '@/hooks';
import { strings } from '@/constants';
import logoutIcon from '@/assets/icons/logout.svg';

export function Sidebar() {
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
                    <img src={logoutIcon} alt="" className="w-5 h-5" />
                    {isLoggingOut ? strings.common.loggingOut : strings.common.logout}
                </Button>
            </div>
        </aside>
    );
}
