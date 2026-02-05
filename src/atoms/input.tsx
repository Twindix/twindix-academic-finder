import type { InputHTMLAttributes } from "react";
import { useState } from "react";

import { EyeIcon, EyeOffIcon } from "@/assets/icons";
import { Button } from "@/atoms";
import {
    ButtonTypeEnum,
    ButtonVariantEnum,
    InputTypeEnum,
    InputVariantEnum,
} from "@/enums";
import type { InputVariantType } from "@/types";

export const Input = ({
    className = "",
    errorMessage,
    hasError = false,
    isShowPasswordToggle = false,
    label,
    type = InputTypeEnum.TEXT,
    variant = InputVariantEnum.DEFAULT,
    ...props
}: InputHTMLAttributes<HTMLInputElement> & {
    errorMessage?: string,
    hasError?: boolean,
    isShowPasswordToggle?: boolean,
    label?: string,
    variant?: InputVariantType,
}) => {
    const [isShowPassword, setIsShowPassword] = useState(false);

    const inputType = isShowPasswordToggle ? (isShowPassword ? InputTypeEnum.TEXT : InputTypeEnum.PASSWORD) : type;

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
        if (hasError) {
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
                        ${isShowPasswordToggle ? "pr-12" : ""}
                        ${className}
                    `}
                    {...props}
                />
                {isShowPasswordToggle && (
                    <Button
                        type={ButtonTypeEnum.BUTTON}
                        variant={ButtonVariantEnum.GHOST}
                        className="
                            absolute
                            top-1/2
                            right-4
                            -translate-y-1/2
                            text-text-muted
                        "
                        onClick={() => setIsShowPassword(!isShowPassword)}
                    >
                        {isShowPassword ? <EyeOffIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                    </Button>
                )}
            </div>
            {errorMessage && hasError && <p className="mt-1 text-sm text-error">{errorMessage}</p>}
        </div>
    );
};
