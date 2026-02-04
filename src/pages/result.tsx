import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

import { Button, Input } from "@/atoms";
import { ChatBox, GradientBackground } from "@/components";
import { routes, strings } from "@/constants";
import {
    CodeLayoutVariantEnum,
    GradientVariantEnum,
    JobStatusEnum,
    LanguageEnum,
    ResultPageStatusEnum,
} from "@/enums";
import { useAuth } from "@/hooks";
import type { ChatResultInterface } from "@/interfaces";
import { CodeLayout } from "@/layouts";
import { api } from "@/services";
import type { ResultPageStatusType } from "@/types";
import { stripMarkdownHandler } from "@/utils";

export const Result = () => {
    const pollingRef = useRef<ReturnType<typeof setInterval> | null>(null);

    const [copied, setCopied] = useState(false);

    const [errorMessage, setErrorMessage] = useState("");

    const location = useLocation();

    const navigate = useNavigate();

    const [searchParams] = useSearchParams();

    const { user } = useAuth();

    const initialResult = (location.state as { result?: ChatResultInterface } | null)?.result || null;

    const hasFetchedRef = useRef(!!initialResult);

    const [result, setResult] = useState<ChatResultInterface | null>(initialResult);

    const [status, setStatus] = useState<ResultPageStatusType>(initialResult ? ResultPageStatusEnum.SUCCESS : ResultPageStatusEnum.LOADING);

    const langParam = searchParams.get(strings.queryParams.lang);

    const lang = langParam === LanguageEnum.AR ? LanguageEnum.AR : LanguageEnum.EN;

    const jobId = searchParams.get(strings.queryParams.jobId);

    const code = searchParams.get(strings.queryParams.code) || "";

    const hasValidParams = !!jobId && !!code;

    const layoutVariant = status === ResultPageStatusEnum.ERROR ? CodeLayoutVariantEnum.ERROR : CodeLayoutVariantEnum.DEFAULT;

    const pollingInterval = 5000;

    const stopPollingHandler = () => {
        if (pollingRef.current) {
            clearInterval(pollingRef.current);

            pollingRef.current = null;
        }
    };

    const copyHandler = () => {
        if (result) {
            navigator.clipboard.writeText(stripMarkdownHandler(result.content));

            setCopied(true);

            setTimeout(
                () => setCopied(false),
                2000,
            );
        }
    };

    const resetHandler = () => {
        stopPollingHandler();

        navigate(routes.code);
    };

    useEffect(
        () => {
            if (!hasValidParams) {
                navigate(routes.code);

                return;
            }

            if (hasFetchedRef.current) return;

            hasFetchedRef.current = true;

            const fetchStatusHandler = async () => {
                try {
                    const statusResponse = await api.getExamStatusHandler(
                        jobId,
                        code,
                        user?.name || strings.code.defaultUserName,
                        lang === LanguageEnum.AR ? LanguageEnum.AR : undefined,
                    );

                    if (statusResponse.status === JobStatusEnum.COMPLETED && statusResponse.result) {
                        stopPollingHandler();

                        setResult(statusResponse.result);

                        setStatus(ResultPageStatusEnum.SUCCESS);

                        return;
                    }

                    if (!statusResponse.success || statusResponse.status === JobStatusEnum.FAILED) {
                        stopPollingHandler();

                        setStatus(ResultPageStatusEnum.ERROR);

                        setErrorMessage(statusResponse.error || strings.errors.tryAgain);

                        return;
                    }

                    pollingRef.current = setInterval(
                        fetchStatusHandler,
                        pollingInterval,
                    );
                } catch (error) {
                    stopPollingHandler();

                    setStatus(ResultPageStatusEnum.ERROR);

                    setErrorMessage(error instanceof Error ? error.message : strings.errors.tryAgain);
                }
            };

            fetchStatusHandler();

            return () => stopPollingHandler();
        },
        [
            hasValidParams,
            jobId,
            code,
            navigate,
            user?.name,
            lang,
        ],
    );

    if (!hasValidParams) return null;

    if (status === ResultPageStatusEnum.LOADING) {
        return (
            <CodeLayout>
                <GradientBackground variant={GradientVariantEnum.LOADING} />
                <div
                    className="
                        w-full
                        max-w-2xl
                        px-8
                        text-center
                    "
                >
                    <h1
                        className="
                            text-gradient
                            mb-2
                            text-3xl
                            font-bold
                        "
                    >
                        {strings.code.titleLoading}
                    </h1>
                    <div className="mb-8">
                        <div
                            className="
                                inline-block
                                h-8
                                w-8
                                animate-spin
                                rounded-full
                                border-4
                                border-primary
                                border-t-transparent
                            "
                        />
                    </div>
                    <div
                        className="
                            flex
                            items-center
                            justify-center
                            gap-4
                        "
                    >
                        <div className="max-w-md flex-1">
                            <Input
                                type="text"
                                value={code}
                                disabled
                            />
                        </div>
                        <Button onClick={resetHandler}>{strings.result.buttonReset}</Button>
                    </div>
                </div>
            </CodeLayout>
        );
    }

    if (status === ResultPageStatusEnum.ERROR) {
        return (
            <CodeLayout variant={layoutVariant}>
                <GradientBackground variant={GradientVariantEnum.ERROR} />
                <div
                    className="
                        w-full
                        max-w-2xl
                        px-8
                        text-center
                    "
                >
                    <h1
                        className="
                            text-gradient-error
                            mb-2
                            text-3xl
                            font-bold
                            italic
                        "
                    >
                        {errorMessage || strings.code.errorDefault}
                    </h1>
                    <span className="mb-8 block text-text-muted">{strings.code.errorSubtitle}</span>
                    <div
                        className="
                            flex
                            items-center
                            justify-center
                            gap-4
                        "
                    >
                        <div className="max-w-md flex-1">
                            <Input
                                type="text"
                                value={code}
                                disabled
                                error
                            />
                        </div>
                        <Button onClick={resetHandler}>{strings.code.buttonReenter}</Button>
                    </div>
                </div>
            </CodeLayout>
        );
    }

    if (!result) {
        return (
            <CodeLayout>
                <div className="flex items-center justify-center">
                    <span className="text-text-muted">{strings.result.loading}</span>
                </div>
            </CodeLayout>
        );
    }

    return (
        <CodeLayout centered={false}>
            <div
                className="
                    mx-auto
                    flex
                    h-full
                    w-full
                    max-w-226.25
                    flex-col
                    gap-4
                "
            >
                <div className="min-h-0 flex-1">
                    <ChatBox
                        content={result.content}
                        copied={copied}
                        isRtl={lang === LanguageEnum.AR}
                        userName={result.userName}
                        onCopy={copyHandler}
                    />
                </div>
                <div
                    className="
                        flex
                        shrink-0
                        items-center
                        gap-4
                    "
                >
                    <div
                        className="
                            flex
                            flex-1
                            items-center
                            gap-2
                            rounded-full
                            border-2
                            border-primary
                            bg-white
                            px-4
                            py-3
                        "
                    >
                        <span className="flex-1 text-base text-text-primary">{result.code}</span>
                        <span className="text-sm font-medium text-primary">
                            {`${strings.result.selectedLanguage} (${lang === LanguageEnum.AR ? strings.common.languageAr : strings.common.languageEn})`}
                        </span>
                    </div>
                    <Button onClick={resetHandler}>{strings.result.buttonReset}</Button>
                </div>
            </div>
        </CodeLayout>
    );
};
