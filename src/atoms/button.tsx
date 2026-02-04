import type { ButtonHTMLAttributes, ReactNode } from "react";

import { strings } from "@/constants";
import { ButtonSizeEnum, ButtonVariantEnum } from "@/enums";
import type { ButtonSizeType, ButtonVariantType } from "@/types";

export const Button = ({
    children,
    className = "",
    disabled,
    fullWidth = false,
    loading = false,
    size = ButtonSizeEnum.MD,
    variant = ButtonVariantEnum.PRIMARY,
    ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
    children: ReactNode,
    fullWidth?: boolean,
    loading?: boolean,
    size?: ButtonSizeType,
    variant?: ButtonVariantType,
}) => {
    const baseStyles = `
        font-medium
        duration-200
        transition-all
        cursor-pointer
        disabled:cursor-not-allowed
        disabled:opacity-50
        focus:outline-none
    `;

    const variants = {
        danger: `
            text-white
            bg-error
            rounded-full
            focus:ring-2
            focus:ring-error
            focus:ring-offset-2
            hover:bg-error-light
        `,
        ghost: "text-text-secondary hover:text-text-primary",
        "ghost-danger": "text-error hover:text-error-light",
        link: "text-primary hover:underline",
        muted: `
            text-white
            bg-muted
            rounded-full
            focus:ring-2
            focus:ring-muted
            focus:ring-offset-2
            hover:bg-muted/90
        `,
        primary: `
            text-white
            bg-primary
            rounded-full
            focus:ring-2
            focus:ring-offset-2
            focus:ring-primary
            hover:bg-primary-dark
        `,
    };

    const sizes = {
        md: variant === ButtonVariantEnum.GHOST || variant === ButtonVariantEnum.GHOST_DANGER || variant === ButtonVariantEnum.LINK ? "" : "px-8 py-3",
        sm: variant === ButtonVariantEnum.GHOST || variant === ButtonVariantEnum.GHOST_DANGER || variant === ButtonVariantEnum.LINK ? "text-sm" : "px-4 py-2 text-sm",
    };

    const widthStyles = fullWidth ? "w-full" : "";

    const loadingStyles = loading ? "cursor-wait" : "";

    return (
        <button
            disabled={disabled || loading}
            className={`
                ${baseStyles}
                ${variants[variant]}
                ${sizes[size]}
                ${widthStyles}
                ${loadingStyles}
                ${className}
            `}
            {...props}
        >
            {loading ? strings.common.loading : children}
        </button>
    );
};
