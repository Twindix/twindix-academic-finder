import type { ReactNode } from "react";
import { useEffect } from "react";

import { strings } from "@/constants";
import { KeyboardEventEnum, KeyboardKeyEnum } from "@/enums";

export const Modal = ({
    children,
    isOpen,
    onClose,
}: {
    children: ReactNode,
    isOpen: boolean,
    onClose: () => void,
}) => {
    useEffect(
        () => {
            const detectKeyDownHandler = (event: KeyboardEvent) => {
                const { key } = event;

                if (key === KeyboardKeyEnum.ESCAPE) onClose();
            };

            if (isOpen) {
                document.addEventListener(
                    KeyboardEventEnum.KEYDOWN,
                    detectKeyDownHandler,
                );

                document.body.style.overflow = strings.css.overflowHidden;
            }

            return () => {
                document.removeEventListener(
                    KeyboardEventEnum.KEYDOWN,
                    detectKeyDownHandler,
                );

                document.body.style.overflow = strings.css.overflowUnset;
            };
        },
        [isOpen, onClose],
    );

    if (!isOpen) return null;

    return (
        <div
            className="
                fixed
                inset-0
                z-50
                flex
                items-center
                justify-center
                bg-black/50
                p-4
            "
            onClick={onClose}
        >
            <div
                className="
                    w-full
                    max-w-md
                    rounded-2xl
                    bg-white
                    shadow-xl
                "
                onClick={(e) => e.stopPropagation()}
            >
                {children}
            </div>
        </div>
    );
};
