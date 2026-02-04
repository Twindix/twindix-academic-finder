import type { ReactNode } from "react";

import { StarIcon } from "@/assets/icons";
import { Logo } from "@/atoms";
import { strings } from "@/constants";
import { LogoSizeEnum } from "@/enums";

export const AuthLayout = ({
    children,
    description,
    title,
}: {
    children: ReactNode,
    description?: string,
    title?: string,
}) => (
    <div
        className="
            flex
            min-h-screen
            flex-col
            bg-surface
        "
    >
        <header className="p-6">
            <Logo size={LogoSizeEnum.MD} />
        </header>
        <main className="flex flex-1">
            <div
                className="
                    relative
                    hidden
                    overflow-hidden
                    lg:flex
                    lg:w-1/2
                "
            >
                <div
                    className="absolute inset-0 rounded-tr-3xl"
                    style={{ background: "linear-gradient(to top, #0025BA 0%, #0025BA 15%, #2557b8 35%, #4a7fd4 55%, #a8c4f5 75%, #FFFFFF 100%)" }}
                >
                    <StarIcon
                        className="
                            absolute
                            top-[20%]
                            left-[10%]
                            h-4
                            w-4
                            opacity-60
                        "
                    />
                    <StarIcon
                        className="
                            absolute
                            top-[35%]
                            left-[45%]
                            h-4
                            w-4
                            opacity-50
                        "
                    />
                    <StarIcon
                        className="
                            absolute
                            top-[28%]
                            right-[12%]
                            h-8
                            w-8
                            opacity-90
                        "
                    />
                    <StarIcon
                        className="
                            absolute
                            top-[45%]
                            right-[25%]
                            h-5
                            w-5
                            opacity-60
                        "
                    />
                    <StarIcon
                        className="
                            absolute
                            bottom-[38%]
                            left-[28%]
                            h-20
                            w-20
                            opacity-100
                        "
                    />
                    <StarIcon
                        className="
                            absolute
                            bottom-[22%]
                            left-[5%]
                            h-5
                            w-5
                            opacity-70
                        "
                    />
                    <StarIcon
                        className="
                            absolute
                            right-[8%]
                            bottom-[18%]
                            h-6
                            w-6
                            opacity-60
                        "
                    />
                </div>
                <div
                    className="
                        absolute
                        right-0
                        bottom-0
                        left-0
                        p-8
                        text-white
                    "
                >
                    <h1 className="mb-3 text-3xl font-bold">{title || strings.login.sidebarTitle}</h1>
                    <p className="text-sm leading-relaxed text-white/90">{description || strings.login.sidebarDescription}</p>
                </div>
            </div>
            <div
                className="
                    flex
                    w-full
                    items-center
                    justify-center
                    p-8
                    lg:w-1/2
                "
            >
                <div className="w-full max-w-md">{children}</div>
            </div>
        </main>
    </div>
);
