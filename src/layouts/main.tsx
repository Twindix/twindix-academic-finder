import type { ReactNode } from "react";

import { Sidebar } from "@/components";

export const MainLayout = ({
    children,
    isShowSidebar = true,
}: {
    children: ReactNode,
    isShowSidebar?: boolean,
}) => (
    <div className="flex min-h-screen bg-background">
        {isShowSidebar && <Sidebar />}
        <main className="relative flex-1">{children}</main>
    </div>
);
