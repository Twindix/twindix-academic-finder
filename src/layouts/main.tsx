import type { ReactNode } from "react";

import { Sidebar } from "@/components";

export const MainLayout = ({
    children,
    showSidebar = true,
}: {
    children: ReactNode,
    showSidebar?: boolean,
}) => (
    <div className="flex min-h-screen bg-background">
        {showSidebar && <Sidebar />}
        <main className="relative flex-1">{children}</main>
    </div>
);
