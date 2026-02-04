import type { ComponentType, ReactNode } from "react";

import {
    CloseIcon,
    ErrorIcon,
    InfoIcon,
    SuccessIcon,
    WarningIcon,
} from "@/assets/icons";
import { Button } from "@/atoms";
import { strings } from "@/constants";
import { AlertVariantEnum } from "@/enums";
import type { AlertVariantType } from "@/types";

export const Alert = ({
    children,
    className = "",
    onClose,
    variant = AlertVariantEnum.ERROR,
}: {
    children: ReactNode,
    className?: string,
    onClose?: () => void,
    variant?: AlertVariantType,
}) => {
    const variants = {
        error: "text-error bg-error/10 border-error",
        info: "text-primary bg-primary/10 border-primary",
        success: "text-green-700 bg-green-50 border-green-500",
        warning: "text-yellow-700 bg-yellow-50 border-yellow-500",
    };

    const icons: Record<string, ComponentType<{ className?: string }>> = {
        error: ErrorIcon,
        info: InfoIcon,
        success: SuccessIcon,
        warning: WarningIcon,
    };

    const IconComponent = icons[variant];

    return (
        <div
            role="alert"
            className={`
                flex
                items-start
                gap-3
                rounded-default
                border
                p-4
                ${variants[variant]}
                ${className}
            `}
        >
            {IconComponent && <IconComponent className="h-5 w-5 shrink-0" />}
            <div className="flex-1 text-sm font-medium">{children}</div>
            {onClose && (
                <Button
                    aria-label={strings.common.closeAlert}
                    className="shrink-0"
                    variant="ghost"
                    onClick={onClose}
                >
                    <CloseIcon className="h-5 w-5" />
                </Button>
            )}
        </div>
    );
};
