import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    Button,
    CircularProgress,
    LanguageSelect,
    Tooltip,
} from "@/atoms";
import { GradientBackground } from "@/components";
import { strings } from "@/constants";
import {
    ButtonVariantEnum,
    CodeLayoutVariantEnum,
    CodePageStatusEnum,
    GradientVariantEnum,
    JobStatusEnum,
    LanguageEnum,
} from "@/enums";
import { useAuth } from "@/hooks";
import { CodeLayout } from "@/layouts";
import { api } from "@/services";
import type { CodePageStatusType, LanguageType } from "@/types";

export const Code = () => {
    const pollingRef = useRef<ReturnType<typeof setInterval> | null>(null);

    const jobIdRef = useRef<string | null>(null);

    const isCompletedRef = useRef(false);

    const [code, setCode] = useState("");

    const [lang, setLang] = useState<LanguageType>(LanguageEnum.EN);

    const [status, setStatus] = useState<CodePageStatusType>(CodePageStatusEnum.IDLE);

    const [progress, setProgress] = useState(0);

    const [errorMessage, setErrorMessage] = useState("");

    const navigate = useNavigate();

    const { user } = useAuth();

    const codeLength = 8;

    const isCodeValid = code.trim().length === codeLength;

    const layoutVariant = status === CodePageStatusEnum.ERROR ? CodeLayoutVariantEnum.ERROR : CodeLayoutVariantEnum.DEFAULT;

    const pollingInterval = 5000;

    const stopPollingHandler = () => {
        if (pollingRef.current) {
            clearInterval(pollingRef.current);

            pollingRef.current = null;
        }
    };

    const submitHandler = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!isCodeValid) return;

        jobIdRef.current = null;

        isCompletedRef.current = false;

        setStatus(CodePageStatusEnum.LOADING);

        setErrorMessage("");

        setProgress(0);

        try {
            const processResponse = await api.processExamCodeHandler(
                code,
                lang === LanguageEnum.AR ? LanguageEnum.AR : undefined,
            );

            if (!processResponse.success || !processResponse.jobId) {
                setStatus(CodePageStatusEnum.ERROR);

                setErrorMessage(processResponse.error || strings.errors.invalidExamCode);

                return;
            }

            const jobId = processResponse.jobId;

            jobIdRef.current = jobId;

            const pollForStatusHandler = async () => {
                if (!jobIdRef.current || isCompletedRef.current) {
                    stopPollingHandler();

                    return;
                }

                try {
                    const statusResponse = await api.getExamStatusHandler(
                        jobIdRef.current,
                        code,
                        user?.name || strings.code.defaultUserName,
                        lang === LanguageEnum.AR ? LanguageEnum.AR : undefined,
                    );

                    if (isCompletedRef.current) return;

                    setProgress(statusResponse.progress);

                    if (statusResponse.status === JobStatusEnum.COMPLETED && statusResponse.result) {
                        isCompletedRef.current = true;

                        stopPollingHandler();

                        setProgress(100);

                        setStatus(CodePageStatusEnum.SUCCESS);

                        const resultUrl = lang === LanguageEnum.AR ? `/result?jobId=${jobId}&code=${encodeURIComponent(code)}&lang=${LanguageEnum.AR}` : `/result?jobId=${jobId}&code=${encodeURIComponent(code)}`;

                        navigate(
                            resultUrl,
                            { state: { result: statusResponse.result } },
                        );

                        return;
                    }

                    if (!statusResponse.success || statusResponse.status === JobStatusEnum.FAILED) {
                        stopPollingHandler();

                        setStatus(CodePageStatusEnum.ERROR);

                        setErrorMessage(statusResponse.error || strings.errors.tryAgain);

                        return;
                    }
                } catch (error) {
                    stopPollingHandler();

                    setStatus(CodePageStatusEnum.ERROR);

                    setErrorMessage(error instanceof Error ? error.message : strings.errors.tryAgain);
                }
            };

            await pollForStatusHandler();

            if (jobIdRef.current) {
                pollingRef.current = setInterval(
                    pollForStatusHandler,
                    pollingInterval,
                );
            }
        } catch {
            setStatus(CodePageStatusEnum.ERROR);

            setErrorMessage(strings.errors.tryAgain);
        }
    };

    const resetHandler = () => {
        stopPollingHandler();

        jobIdRef.current = null;

        isCompletedRef.current = false;

        setCode("");

        setStatus(CodePageStatusEnum.IDLE);

        setErrorMessage("");

        setProgress(0);
    };

    const getButtonTextHandler = () => {
        if (status === CodePageStatusEnum.LOADING) return strings.code.buttonLoading;

        if (status === CodePageStatusEnum.ERROR) return strings.code.buttonReenter;

        return strings.code.buttonConfirm;
    };

    useEffect(
        () => () => {
            if (pollingRef.current) clearInterval(pollingRef.current);
        },
        [],
    );

    return (
        <CodeLayout variant={layoutVariant}>
            {(status === CodePageStatusEnum.LOADING || status === CodePageStatusEnum.ERROR) && <GradientBackground variant={status === CodePageStatusEnum.LOADING ? GradientVariantEnum.LOADING : GradientVariantEnum.ERROR} />}
            <div
                className="
                    w-full
                    max-w-2xl
                    px-8
                    text-center
                "
            >
                {status === CodePageStatusEnum.IDLE && (
                    <h1
                        className="
                            text-gradient
                            mb-8
                            text-3xl
                            font-bold
                        "
                    >
                        {strings.code.titleEnter}
                        {" "}
                        {strings.code.titleSuffix}
                        {" "}
                        {strings.code.titleResult}
                        .
                    </h1>
                )}
                {status === CodePageStatusEnum.LOADING && (
                    <>
                        <h1
                            className="
                                text-gradient
                                mb-6
                                text-3xl
                                font-bold
                            "
                        >
                            {strings.code.titleLoading}
                        </h1>
                        <div className="mb-8">
                            <CircularProgress progress={progress} />
                        </div>
                    </>
                )}
                {status === CodePageStatusEnum.ERROR && (
                    <>
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
                    </>
                )}
                <form
                    className="
                        flex
                        flex-col
                        items-center
                        justify-center
                        gap-4
                        sm:flex-row
                    "
                    onSubmit={submitHandler}
                >
                    <div
                        className={`
                            flex
                            w-full
                            max-w-lg
                            items-center
                            gap-2
                            rounded-full
                            border-2
                            bg-white
                            px-4
                            py-3
                            ${status === CodePageStatusEnum.ERROR ? "border-red-500" : "border-primary"}
                        `}
                    >
                        <input
                            disabled={status === CodePageStatusEnum.LOADING}
                            placeholder={strings.code.inputPlaceholder}
                            type="text"
                            value={code}
                            className="
                                flex-1
                                bg-transparent
                                text-base
                                text-text-primary
                                outline-none
                                placeholder:text-gray-400
                                disabled:cursor-not-allowed
                                disabled:opacity-50
                            "
                            onChange={({ target }) => setCode(target.value)}
                        />
                        <LanguageSelect
                            disabled={status === CodePageStatusEnum.LOADING}
                            value={lang}
                            onChange={setLang}
                        />
                    </div>
                    <Tooltip
                        content={strings.code.codeLength}
                        disabled={isCodeValid || status === CodePageStatusEnum.ERROR || status === CodePageStatusEnum.LOADING}
                    >
                        <Button
                            disabled={status === CodePageStatusEnum.LOADING || (status === CodePageStatusEnum.IDLE && !isCodeValid)}
                            loading={status === CodePageStatusEnum.LOADING}
                            type={status === CodePageStatusEnum.ERROR ? strings.buttonTypes.button : strings.buttonTypes.submit}
                            variant={status === CodePageStatusEnum.ERROR ? ButtonVariantEnum.PRIMARY : !isCodeValid ? ButtonVariantEnum.MUTED : ButtonVariantEnum.PRIMARY}
                            onClick={status === CodePageStatusEnum.ERROR ? resetHandler : undefined}
                        >
                            {getButtonTextHandler()}
                        </Button>
                    </Tooltip>
                </form>
            </div>
        </CodeLayout>
    );
};
