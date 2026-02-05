import { useState } from "react";

import { LanguageIcon } from "@/assets/icons";
import { strings } from "@/constants";
import { ButtonTypeEnum, LanguageEnum } from "@/enums";
import type { LanguageType } from "@/types";

export const LanguageSelect = ({
    isDisabled = false,
    onChange,
    value,
}: {
    isDisabled?: boolean,
    onChange: (lang: LanguageType) => void,
    value: LanguageType,
}) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleOpenHandler = () => {
        if (!isDisabled) setIsOpen(!isOpen);
    };

    const selectLanguageHandler = (lang: LanguageType) => {
        onChange(lang);

        setIsOpen(false);
    };

    return (
        <div className="relative">
            <button
                disabled={isDisabled}
                type={ButtonTypeEnum.BUTTON}
                className="
                    flex
                    cursor-pointer
                    items-center
                    gap-2
                    text-primary
                    transition-colors
                    hover:text-primary/80
                    disabled:cursor-not-allowed
                    disabled:opacity-50
                "
                onClick={toggleOpenHandler}
            >
                <span className="text-sm font-medium">
                    {`${strings.code.selectLanguage} (${value === LanguageEnum.AR ? strings.common.languageAr : strings.common.languageEn})`}
                </span>
                <LanguageIcon className="h-5 w-5" />
            </button>
            {isOpen && (
                <div
                    className="
                        absolute
                        top-full
                        right-0
                        z-10
                        mt-2
                        min-w-40
                        overflow-hidden
                        rounded-xl
                        bg-white
                        shadow-lg
                    "
                >
                    <button
                        type={ButtonTypeEnum.BUTTON}
                        className="
                            flex
                            w-full
                            cursor-pointer
                            items-center
                            justify-center
                            gap-2
                            px-4
                            py-3
                            text-sm
                            text-gray-700
                            transition-colors
                            hover:bg-gray-50
                        "
                        onClick={() => selectLanguageHandler(LanguageEnum.EN)}
                    >
                        <span>{strings.code.languageEnglish}</span>
                        {value === LanguageEnum.EN && (
                            <svg
                                className="h-4 w-4 text-gray-400"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={2}
                                viewBox="0 0 24 24"
                            >
                                <path
                                    d="M5 13l4 4L19 7"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        )}
                    </button>
                    <button
                        type={ButtonTypeEnum.BUTTON}
                        className="
                            flex
                            w-full
                            cursor-pointer
                            items-center
                            justify-center
                            gap-2
                            px-4
                            py-3
                            text-sm
                            text-gray-700
                            transition-colors
                            hover:bg-gray-50
                        "
                        onClick={() => selectLanguageHandler(LanguageEnum.AR)}
                    >
                        <span>{strings.code.languageArabic}</span>
                        {value === LanguageEnum.AR && (
                            <svg
                                className="h-4 w-4 text-gray-400"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={2}
                                viewBox="0 0 24 24"
                            >
                                <path
                                    d="M5 13l4 4L19 7"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        )}
                    </button>
                </div>
            )}
        </div>
    );
};
