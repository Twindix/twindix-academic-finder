import ReactMarkdown from "react-markdown";

import { CopyIcon, SuccessIcon } from "@/assets/icons";
import { Button } from "@/atoms";
import { strings } from "@/constants";
import { DirectionEnum } from "@/enums";

export const ChatBox = ({
    content,
    copied,
    isRtl = false,
    onCopy,
    userName,
}: {
    content: string,
    copied: boolean,
    isRtl?: boolean,
    onCopy: () => void,
    userName: string,
}) => (
    <div
        dir={isRtl ? DirectionEnum.RTL : DirectionEnum.LTR}
        className="
            flex
            h-full
            flex-col
            overflow-hidden
            rounded-[20px]
            bg-white
        "
    >
        <div
            className="
                flex
                shrink-0
                items-center
                justify-between
                px-6
                py-5
            "
        >
            <h2 className="text-lg font-semibold text-primary">{userName}</h2>
            <Button
                className="flex items-center gap-2"
                size="sm"
                variant="ghost"
                onClick={onCopy}
            >
                {copied ? strings.common.copied : strings.common.copy}
                {copied ? <SuccessIcon className="h-4 w-4" /> : <CopyIcon className="h-4 w-4" />}
            </Button>
        </div>
        <div
            className="
                prose
                prose-sm
                min-h-0
                max-w-none
                flex-1
                overflow-y-auto
                px-6
                pb-6
            "
        >
            <ReactMarkdown
                components={{
                    h2: ({ children }) => (
                        <h2
                            className="
                                mt-6
                                mb-3
                                text-xl
                                font-bold
                                text-primary
                                first:mt-0
                            "
                        >
                            {children}
                        </h2>
                    ),
                    h3: ({ children }) => (
                        <h3
                            className="
                                mt-4
                                mb-2
                                text-lg
                                font-semibold
                                text-text-primary
                            "
                        >
                            {children}
                        </h3>
                    ),
                    hr: () => <hr className="my-6 border-gray-200" />,
                    li: ({ children }) => <li className="text-[#3A3A3A]">{children}</li>,
                    p: ({ children }) => <p className="mb-3 leading-relaxed text-[#3A3A3A]">{children}</p>,
                    strong: ({ children }) => <strong className="font-semibold text-text-primary">{children}</strong>,
                    ul: ({ children }) => (
                        <ul
                            className="
                                mb-3
                                list-inside
                                list-disc
                                space-y-1
                                text-[#3A3A3A]
                            "
                        >
                            {children}
                        </ul>
                    ),
                }}
            >
                {content}
            </ReactMarkdown>
        </div>
    </div>
);
