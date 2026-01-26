import { useEffect, useState, useRef, useCallback } from 'react';
import { useNavigate, useSearchParams, useLocation } from 'react-router-dom';
import { CodeLayout } from '@/layouts';
import { Input, Button } from '@/atoms';
import { ChatBox, GradientBackground } from '@/components';
import { api } from '@/services';
import { useAuth } from '@/hooks';
import { stripMarkdown } from '@/utils';
import { strings, routes } from '@/constants';
import { JOB_STATUS } from '@/types';
import type { ChatResult } from '@/interfaces';

type Language = 'en' | 'ar';

type ResultPageStatus = 'loading' | 'success' | 'error';

const pollingInterval = 5000;

export function Result() {
    const navigate = useNavigate();

    const location = useLocation();

    const [searchParams, setSearchParams] = useSearchParams();

    const { user } = useAuth();

    const initialResult = (location.state as { result?: ChatResult } | null)?.result || null;

    const [result, setResult] = useState<ChatResult | null>(initialResult);

    const [copied, setCopied] = useState(false);

    const [status, setStatus] = useState<ResultPageStatus>(initialResult ? 'success' : 'loading');

    const [errorMessage, setErrorMessage] = useState('');

    const pollingRef = useRef<ReturnType<typeof setInterval> | null>(null);

    const hasFetchedRef = useRef(!!initialResult);

    const jobId = searchParams.get('jobId');

    const code = searchParams.get('code') || '';

    const langParam = searchParams.get('lang');

    const [lang, setLang] = useState<Language>(langParam === 'ar' ? 'ar' : 'en');

    const hasValidParams = !!jobId && !!code;

    const stopPolling = () => {
        if (pollingRef.current) {
            clearInterval(pollingRef.current);

            pollingRef.current = null;
        }
    };

    const toggleLanguage = useCallback(() => {
        const newLang: Language = lang === 'en' ? 'ar' : 'en';

        setLang(newLang);

        const newParams = new URLSearchParams(searchParams);

        if (newLang === 'ar') {
            newParams.set('lang', 'ar');
        } else {
            newParams.delete('lang');
        }

        setSearchParams(newParams, { replace: true });

        if (status === 'success' && jobId && code) {
            hasFetchedRef.current = false;

            setStatus('loading');

            setResult(null);
        }
    }, [lang, searchParams, setSearchParams, status, jobId, code]);

    useEffect(() => {
        if (!hasValidParams) {
            navigate(routes.code);

            return;
        }

        if (hasFetchedRef.current) {
            return;
        }

        hasFetchedRef.current = true;

        const fetchStatus = async () => {
            try {
                const statusResponse = await api.getExamStatus(
                    jobId,
                    code,
                    user?.name || strings.code.defaultUserName,
                    lang === 'ar' ? 'ar' : undefined
                );

                if (statusResponse.status === JOB_STATUS.COMPLETED && statusResponse.result) {
                    stopPolling();

                    setResult(statusResponse.result);

                    setStatus('success');

                    return;
                }

                if (!statusResponse.success || statusResponse.status === JOB_STATUS.FAILED) {
                    stopPolling();

                    setStatus('error');

                    setErrorMessage(statusResponse.error || strings.errors.tryAgain);

                    return;
                }

                pollingRef.current = setInterval(fetchStatus, pollingInterval);
            } catch (error) {
                stopPolling();

                setStatus('error');

                setErrorMessage(error instanceof Error ? error.message : strings.errors.tryAgain);
            }
        };

        fetchStatus();

        return () => stopPolling();
    }, [hasValidParams, jobId, code, navigate, user?.name, lang]);

    const handleCopy = () => {
        if (result) {
            navigator.clipboard.writeText(stripMarkdown(result.content));

            setCopied(true);

            setTimeout(() => setCopied(false), 2000);
        }
    };

    const handleReset = () => {
        stopPolling();

        navigate(routes.code);
    };

    const layoutVariant = status === 'error' ? 'error' : 'default';

    if (!hasValidParams) {
        return null;
    }

    if (status === 'loading') {
        return (
            <CodeLayout>
                <GradientBackground variant="loading" />
                <div className="w-full max-w-2xl text-center px-8">
                    <h1 className="text-3xl font-bold mb-2 text-gradient">{strings.code.titleLoading}</h1>
                    <div className="mb-8">
                        <div className="inline-block w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                    </div>
                    <div className="flex gap-4 items-center justify-center">
                        <div className="flex-1 max-w-md">
                            <Input
                                type="text"
                                value={code}
                                disabled
                            />
                        </div>
                        <Button onClick={handleReset}>
                            {strings.result.buttonReset}
                        </Button>
                    </div>
                </div>
            </CodeLayout>
        );
    }

    if (status === 'error') {
        return (
            <CodeLayout variant={layoutVariant}>
                <GradientBackground variant="error" />
                <div className="w-full max-w-2xl text-center px-8">
                    <h1 className="text-3xl font-bold mb-2 text-gradient-error italic">
                        {errorMessage || strings.code.errorDefault}
                    </h1>
                    <span className="block text-text-muted mb-8">{strings.code.errorSubtitle}</span>
                    <div className="flex gap-4 items-center justify-center">
                        <div className="flex-1 max-w-md">
                            <Input
                                type="text"
                                value={code}
                                disabled
                                error
                            />
                        </div>
                        <Button onClick={handleReset}>
                            {strings.code.buttonReenter}
                        </Button>
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
            <div className="w-full h-full max-w-[905px] mx-auto flex flex-col gap-4">
                <div className="flex-1 min-h-0">
                    <ChatBox
                        userName={result.userName}
                        content={result.content}
                        copied={copied}
                        onCopy={handleCopy}
                        lang={lang}
                        onToggleLanguage={toggleLanguage}
                    />
                </div>
                <div className="flex gap-4 items-center shrink-0">
                    <div className="flex-1">
                        <Input
                            type="text"
                            value={result.code}
                            variant="primary"
                            disabled
                        />
                    </div>
                    <Button onClick={handleReset}>
                        {strings.result.buttonReset}
                    </Button>
                </div>
            </div>
        </CodeLayout>
    );
}
