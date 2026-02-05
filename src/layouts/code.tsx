import type { ReactNode } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

import { LogoutIcon, UserIcon } from "@/assets/icons";
import { Button, Logo } from "@/atoms";
import { LogoutModal } from "@/components";
import { routes, strings } from "@/constants";
import { CodeLayoutVariantEnum, LogoSizeEnum } from "@/enums";
import { useAuth } from "@/hooks";
import type { CodeLayoutVariantType } from "@/types";

export const CodeLayout = ({
    children,
    isCentered = true,
    variant = CodeLayoutVariantEnum.DEFAULT,
}: {
    children: ReactNode,
    isCentered?: boolean,
    variant?: CodeLayoutVariantType,
}) => {
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

    const {
        onLogout,
        user,
    } = useAuth();

    const lineColor = variant === CodeLayoutVariantEnum.ERROR ? "#DC2626" : "#0025BA";

    const lineGradient = `linear-gradient(to bottom, transparent 0%, ${lineColor} 30%, ${lineColor} 70%, transparent 100%)`;

    const openLogoutModalHandler = () => setIsLogoutModalOpen(true);

    const closeLogoutModalHandler = () => setIsLogoutModalOpen(false);

    const logoutHandler = async () => {
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

            setIsLogoutModalOpen(false);
        }
    };

    return (
        <div
            className="
                min-h-screen
                bg-background
                md:h-screen
                md:overflow-hidden
            "
        >
            <div
                className="
                    relative
                    mx-2
                    flex
                    min-h-screen
                    flex-col
                    md:mx-12
                    md:h-full
                "
            >
                <div
                    style={{ background: lineGradient }}
                    className="
                        absolute
                        top-0
                        bottom-0
                        left-0
                        hidden
                        w-0.5
                        md:block
                    "
                />
                <div
                    style={{ background: lineGradient }}
                    className="
                        absolute
                        top-0
                        right-0
                        bottom-0
                        hidden
                        w-0.5
                        md:block
                    "
                />
                {isCentered ? (
                    <>
                        <header
                            className="
                                flex
                                shrink-0
                                items-start
                                justify-between
                                p-4
                                md:p-6
                            "
                        >
                            <Logo size={LogoSizeEnum.MD} />
                            <div className="flex items-center gap-2">
                                <Link
                                    to={routes.profile}
                                    className="
                                        hidden
                                        items-center
                                        gap-2
                                        rounded-lg
                                        px-3
                                        py-2
                                        text-primary
                                        transition-colors
                                        hover:bg-primary/5
                                        md:flex
                                    "
                                >
                                    <UserIcon className="h-5 w-5" />
                                    <span className="text-sm font-medium">{user?.name || strings.code.defaultUserName}</span>
                                </Link>
                                <Link
                                    to={routes.profile}
                                    className="
                                        flex
                                        h-10
                                        w-10
                                        items-center
                                        justify-center
                                        rounded-lg
                                        text-primary
                                        transition-colors
                                        hover:bg-primary/5
                                        md:hidden
                                    "
                                >
                                    <UserIcon className="h-5 w-5" />
                                </Link>
                                <Button
                                    disabled={isLoggingOut}
                                    variant="ghost-danger"
                                    className="
                                        flex
                                        items-center
                                        gap-2
                                        md:hidden
                                    "
                                    onClick={openLogoutModalHandler}
                                >
                                    <LogoutIcon className="h-5 w-5" />
                                </Button>
                            </div>
                        </header>
                        <main
                            className="
                                relative
                                z-10
                                flex
                                min-h-0
                                flex-1
                                items-center
                                justify-center
                                py-4
                            "
                        >
                            {children}
                        </main>
                        <footer
                            className="
                                hidden
                                shrink-0
                                p-6
                                md:block
                            "
                        >
                            <Button
                                className="flex items-center gap-2"
                                disabled={isLoggingOut}
                                variant="ghost-danger"
                                onClick={openLogoutModalHandler}
                            >
                                <LogoutIcon className="h-5 w-5" />
                                {isLoggingOut ? strings.common.loggingOut : strings.common.logout}
                            </Button>
                        </footer>
                    </>
                ) : (
                    <div
                        className="
                            flex
                            min-h-0
                            flex-1
                            flex-col
                            gap-4
                            p-4
                            md:flex-row
                            md:p-6
                        "
                    >
                        <div
                            className="
                                flex
                                shrink-0
                                items-center
                                justify-between
                                md:hidden
                            "
                        >
                            <Logo size={LogoSizeEnum.MD} />
                            <div className="flex items-center gap-2">
                                <Link
                                    to={routes.profile}
                                    className="
                                        flex
                                        h-10
                                        w-10
                                        items-center
                                        justify-center
                                        rounded-lg
                                        text-primary
                                        transition-colors
                                        hover:bg-primary/5
                                    "
                                >
                                    <UserIcon className="h-5 w-5" />
                                </Link>
                                <Button
                                    disabled={isLoggingOut}
                                    variant="ghost-danger"
                                    onClick={openLogoutModalHandler}
                                >
                                    <LogoutIcon className="h-5 w-5" />
                                </Button>
                            </div>
                        </div>
                        <div
                            className="
                                hidden
                                shrink-0
                                flex-col
                                justify-between
                                self-stretch
                                md:flex
                            "
                        >
                            <Logo size={LogoSizeEnum.MD} />
                            <Button
                                className="flex items-center gap-2"
                                disabled={isLoggingOut}
                                variant="ghost-danger"
                                onClick={openLogoutModalHandler}
                            >
                                <LogoutIcon className="h-5 w-5" />
                                {isLoggingOut ? strings.common.loggingOut : strings.common.logout}
                            </Button>
                        </div>
                        <main
                            className="
                                relative
                                z-10
                                min-h-0
                                flex-1
                            "
                        >
                            {children}
                        </main>
                        <div className="hidden shrink-0 md:block">
                            <Link
                                to={routes.profile}
                                className="
                                    flex
                                    items-center
                                    gap-2
                                    rounded-lg
                                    px-3
                                    py-2
                                    text-primary
                                    transition-colors
                                    hover:bg-primary/5
                                "
                            >
                                <UserIcon className="h-5 w-5" />
                                <span className="text-sm font-medium">{user?.name || strings.code.defaultUserName}</span>
                            </Link>
                        </div>
                    </div>
                )}
            </div>
            <LogoutModal
                isLoading={isLoggingOut}
                isOpen={isLogoutModalOpen}
                onClose={closeLogoutModalHandler}
                onConfirm={logoutHandler}
            />
        </div>
    );
};
