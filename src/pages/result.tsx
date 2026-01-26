import { useEffect, useState, useRef } from 'react';
import { useNavigate, useSearchParams, useLocation } from 'react-router-dom';
import { CodeLayout } from '@/layouts';
import { Input, Button } from '@/atoms';
import { ChatBox, GradientBackground } from '@/components';
import { api } from '@/services';
import { useAuth } from '@/hooks';
import { strings } from '@/constants';
import { JOB_STATUS } from '@/types';
import type { ChatResult } from '@/interfaces';

type ResultPageStatus = 'loading' | 'success' | 'error';

const pollingInterval = 5000;

export function Result() {
    const navigate = useNavigate();

    const location = useLocation();

    const [searchParams] = useSearchParams();

    const { user } = useAuth();

    const initialResult = (location.state as { result?: ChatResult } | null)?.result || null;

    const [result, setResult] = useState<ChatResult | null>(initialResult);

    const [copied, setCopied] = useState(false);

    const [status, setStatus] = useState<ResultPageStatus>(initialResult ? 'success' : 'loading');

    const [progress, setProgress] = useState<number | null>(initialResult ? 100 : null);

    const [errorMessage, setErrorMessage] = useState('');

    const pollingRef = useRef<ReturnType<typeof setInterval> | null>(null);

    const hasFetchedRef = useRef(!!initialResult);

    const jobId = searchParams.get('jobId');

    const code = searchParams.get('code') || '';

    const hasValidParams = !!jobId && !!code;

    const stopPolling = () => {
        if (pollingRef.current) {
            clearInterval(pollingRef.current);

            pollingRef.current = null;
        }
    };

    useEffect(() => {
        if (!hasValidParams) {
            navigate('/code');

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
                    user?.name || strings.code.defaultUserName
                );

                setProgress(statusResponse.progress);

                if (statusResponse.status === JOB_STATUS.COMPLETED && statusResponse.result) {
                    stopPolling();

                    setProgress(100);

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
    }, [hasValidParams, jobId, code, navigate, user?.name]);

    const handleCopy = () => {
        if (result) {
            navigator.clipboard.writeText(result.content);

            setCopied(true);

            setTimeout(() => setCopied(false), 2000);
        }
    };

    const handleReset = () => {
        stopPolling();

        navigate('/code');
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
                    <span className="block text-text-muted mb-8">{progress !== null ? `${Math.round(progress)} %` : ''}</span>
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
