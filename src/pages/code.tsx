import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { CodeLayout } from '@/layouts';
import { Input, Button, Tooltip } from '@/atoms';
import { GradientBackground } from '@/components';
import { api } from '@/services';
import { useAuth } from '@/hooks';
import { strings } from '@/constants';
import { JOB_STATUS, type CodePageStatus } from '@/types';

const CODE_LENGTH = 8;

const pollingInterval = 5000;

export function Code() {
    const navigate = useNavigate();

    const { user } = useAuth();

    const [code, setCode] = useState('');

    const [status, setStatus] = useState<CodePageStatus>('idle');

    const [progress, setProgress] = useState(0);

    const [errorMessage, setErrorMessage] = useState('');

    const pollingRef = useRef<ReturnType<typeof setInterval> | null>(null);

    const jobIdRef = useRef<string | null>(null);

    const isCompletedRef = useRef(false);

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

    const isCodeValid = code.trim().length === CODE_LENGTH;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!isCodeValid) return;

        jobIdRef.current = null;

        isCompletedRef.current = false;

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

            const pollForStatus = async () => {
                if (!jobIdRef.current || isCompletedRef.current) {
                    stopPolling();

                    return;
                }

                try {
                    const statusResponse = await api.getExamStatus(
                        jobIdRef.current,
                        code,
                        user?.name || strings.code.defaultUserName
                    );

                    if (isCompletedRef.current) return;

                    setProgress(statusResponse.progress);

                    if (statusResponse.status === JOB_STATUS.COMPLETED && statusResponse.result) {
                        isCompletedRef.current = true;

                        stopPolling();

                        setProgress(100);

                        setStatus('success');

                        navigate(`/result?jobId=${jobId}&code=${encodeURIComponent(code)}`, {
                            state: { result: statusResponse.result },
                        });

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

            await pollForStatus();

            if (jobIdRef.current) {
                pollingRef.current = setInterval(pollForStatus, pollingInterval);
            }

        } catch {
            setStatus('error');

            setErrorMessage(strings.errors.tryAgain);
        }
    };

    const handleReset = () => {
        stopPolling();

        jobIdRef.current = null;

        isCompletedRef.current = false;

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
                        <h1 className="text-3xl font-bold mb-2 text-gradient-error italic">
                            {errorMessage || strings.code.errorDefault}
                        </h1>
                        <span className="block text-text-muted mb-8">{strings.code.errorSubtitle}</span>
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
                    <Tooltip
                        content={strings.code.codeLength}
                        disabled={isCodeValid || status === 'error' || status === 'loading'}
                    >
                        <Button
                            type={status === 'error' ? 'button' : 'submit'}
                            variant={status === 'error' ? 'primary' : !isCodeValid ? 'muted' : 'primary'}
                            loading={status === 'loading'}
                            disabled={status === 'loading' || (status === 'idle' && !isCodeValid)}
                            onClick={status === 'error' ? handleReset : undefined}
                        >
                            {getButtonText()}
                        </Button>
                    </Tooltip>
                </form>
            </div>
        </CodeLayout>
    );
}
