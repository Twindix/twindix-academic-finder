import type { ReactNode } from "react";
import { useState } from "react";

export const Tooltip = ({
    children,
    content,
    isDisabled = false,
}: {
    children: ReactNode,
    content: string,
    isDisabled?: boolean,
}) => {
    const [isVisible, setIsVisible] = useState(false);

    if (isDisabled) return <>{children}</>;

    return (
        <div
            className="relative inline-block"
            onMouseEnter={() => setIsVisible(true)}
            onMouseLeave={() => setIsVisible(false)}
        >
            {children}
            {isVisible && (
                <div
                    className="
                        absolute
                        bottom-full
                        left-1/2
                        z-50
                        mb-2
                        -translate-x-1/2
                        rounded-lg
                        bg-gray-800
                        px-3
                        py-2
                        text-sm
                        whitespace-nowrap
                        text-white
                    "
                >
                    {content}
                    <div
                        className="
                            absolute
                            top-full
                            left-1/2
                            -mt-1
                            -translate-x-1/2
                        "
                    >
                        <div className="border-4 border-transparent border-t-gray-800" />
                    </div>
                </div>
            )}
        </div>
    );
};
