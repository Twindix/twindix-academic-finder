import { useState } from "react";

import { LogoutIcon } from "@/assets/icons";
import { Button, Logo } from "@/atoms";
import { strings } from "@/constants";
import { LogoSizeEnum } from "@/enums";
import { useAuth } from "@/hooks";

export const Sidebar = () => {
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    const { onLogout } = useAuth();

    const clickLogoutHandler = async () => {
        setIsLoggingOut(true);

        try {
            await onLogout();
        } catch (error) {
            console.error(
                strings.debug.logoutFailed,
                error,
            );
        } finally {
            setIsLoggingOut(false);
        }
    };

    return (
        <aside
            className="
                flex
                min-h-screen
                w-64
                flex-col
                border-r
                border-gray-100
                bg-surface
            "
        >
            <div className="p-6">
                <Logo size={LogoSizeEnum.MD} />
            </div>
            <div className="flex-1" />
            <div className="p-6">
                <Button
                    className="flex items-center gap-2"
                    disabled={isLoggingOut}
                    variant="ghost-danger"
                    onClick={clickLogoutHandler}
                >
                    <LogoutIcon className="h-5 w-5" />
                    {isLoggingOut ? strings.common.loggingOut : strings.common.logout}
                </Button>
            </div>
        </aside>
    );
};
