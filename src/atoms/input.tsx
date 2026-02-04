import type { InputHTMLAttributes } from "react";
import { useState } from "react";

import { EyeIcon, EyeOffIcon } from "@/assets/icons";
import { Button } from "@/atoms";
import { InputVariantEnum } from "@/enums";
import type { InputVariantType } from "@/types";

export const Input = ({
    className = "",
    error = false,
    errorMessage,
    label,
    showPasswordToggle = false,
    type = "text",
    variant = InputVariantEnum.DEFAULT,
    ...props
}: InputHTMLAttributes<HTMLInputElement> & {
    error?: boolean,
    errorMessage?: string,
    label?: string,
    showPasswordToggle?: boolean,
    variant?: InputVariantType,
}) => {
    const [showPassword, setShowPassword] = useState(false);

    const inputType = showPasswordToggle ? (showPassword ? "text" : "password") : type;

    const baseStyles = `
        px-5
        py-3
        w-full
        bg-white
        border-2
        rounded-full
        duration-200
        transition-all
        disabled:cursor-not-allowed
        disabled:opacity-70
        focus:outline-none
    `;

    const getStateStylesHandler = () => {
        if (error) {
            return `
                text-error
                border-error
                placeholder-error/50
                focus:border-error
            `;
        }

        if (variant === InputVariantEnum.PRIMARY) {
            return `
                text-text-primary
                border-primary
                placeholder-text-muted
                focus:border-primary-dark
            `;
        }

        return `
            text-text-primary
            border-gray-300
            placeholder-text-muted
            focus:border-primary
        `;
    };

    const stateStyles = getStateStylesHandler();

    return (
        <div className="w-full">
            {label && (
                <label
                    className="
                        mb-2
                        block
                        text-sm
                        font-medium
                        text-text-primary
                    "
                >
                    {label}
                </label>
            )}
            <div className="relative">
                <input
                    type={inputType}
                    className={`
                        ${baseStyles}
                        ${stateStyles}
                        ${showPasswordToggle ? "pr-12" : ""}
                        ${className}
                    `}
                    {...props}
                />
                {showPasswordToggle && (
                    <Button
                        type="button"
                        variant="ghost"
                        className="
                            absolute
                            top-1/2
                            right-4
                            -translate-y-1/2
                            text-text-muted
                        "
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? <EyeOffIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                    </Button>
                )}
            </div>
            {errorMessage && error && <p className="mt-1 text-sm text-error">{errorMessage}</p>}
        </div>
    );
};
