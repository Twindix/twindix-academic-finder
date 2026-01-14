import { ReactNode } from 'react';
import { Sidebar } from '@/components';

export default function MainLayout({ children, showSidebar = true }: {
    children: ReactNode,
    showSidebar?: boolean,
}) {
    return (
        <div className="min-h-screen bg-background flex">
            {showSidebar && <Sidebar />}
            <main className="flex-1 relative">
                {children}
            </main>
        </div>
    );
}
