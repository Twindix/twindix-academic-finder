import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { CodeLayout } from '@/layouts';
import { Input, Button } from '@/atoms';
import { GradientBackground } from '@/components';
import { api } from '@/services';
import { useAuth } from '@/hooks';
import { saveJobId, clearJobId } from '@/utils';
import { strings } from '@/constants';
import type { CodePageStatus } from '@/types';

const pollingInterval = 5000;
const maxPollingAttempts = 5;

export function Code() {
    const navigate = useNavigate();

    const { user } = useAuth();

    const [code, setCode] = useState('');

    const [status, setStatus] = useState<CodePageStatus>('idle');

    const [progress, setProgress] = useState(0);

    const [errorMessage, setErrorMessage] = useState('');

    const pollingRef = useRef<ReturnType<typeof setInterval> | null>(null);

    const jobIdRef = useRef<string | null>(null);

    const pollingCountRef = useRef<number>(0);

    useEffect(() => {
        return () => {
            if (pollingRef.current) {
                clearInterval(pollingRef.current);
            }
        };
    }, []);

    const stopPolling = () => {
        if (pollingRef.current) {
            clearInterval(pollingRef.current);

            pollingRef.current = null;
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!code.trim()) return;

        clearJobId();

        jobIdRef.current = null;

        pollingCountRef.current = 0;

        setStatus('loading');

        setErrorMessage('');

        setProgress(0);

        try {
            const processResponse = await api.processExamCode(code);

            if (!processResponse.success || !processResponse.jobId) {
                setStatus('error');

                setErrorMessage(processResponse.error || strings.errors.invalidExamCode);

                return;
            }

            const jobId = processResponse.jobId;

            jobIdRef.current = jobId;

            saveJobId(jobId);

            pollingRef.current = setInterval(async () => {
                if (!jobIdRef.current) {
                    stopPolling();

                    return;
                }

                pollingCountRef.current += 1;

                if (pollingCountRef.current >= maxPollingAttempts) {
                    stopPolling();

                    const demoResult = api.getDemoResult(
                        code,
                        user?.name || strings.code.defaultUserName
                    );

                    setProgress(100);

                    setStatus('success');

                    sessionStorage.setItem('codeResult', JSON.stringify(demoResult));

                    setTimeout(() => navigate('/result'), 500);

                    return;
                }

                try {
                    const statusResponse = await api.getExamStatus(
                        jobIdRef.current,
                        code,
                        user?.name || strings.code.defaultUserName
                    );

                    setProgress(statusResponse.progress);

                    if (statusResponse.status === 'completed' && statusResponse.result) {
                        stopPolling();

                        setProgress(100);

                        setStatus('success');

                        sessionStorage.setItem('codeResult', JSON.stringify(statusResponse.result));

                        setTimeout(() => navigate('/result'), 500);

                        return;
                    }

                    if (!statusResponse.success || statusResponse.status === 'failed') {
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
            }, pollingInterval);

        } catch {
            setStatus('error');

            setErrorMessage(strings.errors.tryAgain);
        }
    };

    const handleReset = () => {
        stopPolling();

        clearJobId();

        jobIdRef.current = null;

        pollingCountRef.current = 0;

        setCode('');

        setStatus('idle');

        setErrorMessage('');

        setProgress(0);
    };

    const getButtonText = () => {
        if (status === 'loading') return strings.code.buttonLoading;

        if (status === 'error') return strings.code.buttonReenter;

        return strings.code.buttonConfirm;
    };

    const layoutVariant = status === 'error' ? 'error' : 'default';

    return (
        <CodeLayout variant={layoutVariant}>
            {(status === 'loading' || status === 'error') && (
                <GradientBackground variant={status === 'loading' ? 'loading' : 'error'} />
            )}
            <div className="w-full max-w-2xl text-center px-8">
                {status === 'idle' && (
                    <h1 className="text-3xl font-bold mb-8 text-gradient">
                        {strings.code.titleEnter} {strings.code.titleSuffix} {strings.code.titleResult}.
                    </h1>
                )}
                {status === 'loading' && (
                    <>
                        <h1 className="text-3xl font-bold mb-2 text-gradient">{strings.code.titleLoading}</h1>
                        <span className="block text-text-muted mb-8">{Math.round(progress)} %</span>
                    </>
                )}
                {status === 'error' && (
                    <>
                        <h1 className="text-3xl font-bold mb-2">
                            <span className="text-error italic">{strings.code.titleIncorrect}</span>{' '}
                            <span className="text-text-primary">{strings.code.titleCode}</span>
                        </h1>
                        <span className="block text-text-muted mb-8">{errorMessage || strings.code.errorDefault}</span>
                    </>
                )}
                <form onSubmit={handleSubmit} className="flex gap-4 items-center justify-center">
                    <div className="flex-1 max-w-md">
                        <Input
                            type="text"
                            placeholder={strings.code.inputPlaceholder}
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            error={status === 'error'}
                            disabled={status === 'loading'}
                        />
                    </div>
                    <Button
                        type={status === 'error' ? 'button' : 'submit'}
                        variant={status === 'error' ? 'primary' : status === 'idle' && !code ? 'muted' : 'primary'}
                        loading={status === 'loading'}
                        disabled={status === 'loading'}
                        onClick={status === 'error' ? handleReset : undefined}
                    >
                        {getButtonText()}
                    </Button>
                </form>
            </div>
        </CodeLayout>
    );
}
