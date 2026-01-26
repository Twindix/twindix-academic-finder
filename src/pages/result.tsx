import { useEffect, useState, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
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

    const [searchParams] = useSearchParams();

    const { user } = useAuth();

    const [result, setResult] = useState<ChatResult | null>(null);

    const [copied, setCopied] = useState(false);

    const [status, setStatus] = useState<ResultPageStatus>('loading');

    const [progress, setProgress] = useState(0);

    const [errorMessage, setErrorMessage] = useState('');

    const pollingRef = useRef<ReturnType<typeof setInterval> | null>(null);

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

        const pollForStatus = async () => {
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
            } catch (error) {
                stopPolling();

                setStatus('error');

                setErrorMessage(error instanceof Error ? error.message : strings.errors.tryAgain);
            }
        };

        pollForStatus();

        pollingRef.current = setInterval(pollForStatus, pollingInterval);

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
                    <span className="block text-text-muted mb-8">{Math.round(progress)} %</span>
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
            <div className="w-full h-full max-w-4xl px-4 flex flex-col gap-4 pb-4">
                <div className="flex-1 min-h-0">
                    <ChatBox
                        userName={result.userName}
                        content={result.content}
                        onCopy={handleCopy}
                    />
                </div>
                {copied && (
                    <span className="block text-center text-sm text-primary">
                        {strings.result.copiedMessage}
                    </span>
                )}
                <div className="flex gap-4 items-center justify-center shrink-0 px-4">
                    <div className="flex-1 max-w-lg">
                        <Input
                            type="text"
                            value={result.code}
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
