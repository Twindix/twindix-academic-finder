import { ReactNode } from 'react';
import Sidebar from './sidebar';

interface MainLayoutProps {
    children: ReactNode,
    showSidebar?: boolean,
}

export default function MainLayout({ children, showSidebar = true }: MainLayoutProps) {
    return (
        <div className="min-h-screen bg-background flex">
            {showSidebar && <Sidebar />}
            <main className="flex-1 relative">
                {children}
            </main>
        </div>
    );
}
