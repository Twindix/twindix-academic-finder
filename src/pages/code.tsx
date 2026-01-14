import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CodeLayout, Input, Button, GradientBackground } from '@/components';
import { api } from '@/services';
import { useAuth } from '@/hooks';
import { strings } from '@/constants';
import type { CodePageStatus } from '@/types';

export default function Code() {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [code, setCode] = useState('');
    const [status, setStatus] = useState<CodePageStatus>('idle');
    const [progress, setProgress] = useState(0);
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!code.trim()) return;

        setStatus('loading');
        setErrorMessage('');
        setProgress(0);

        const progressInterval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 95) {
                    clearInterval(progressInterval);
                    return prev;
                }
                return prev + Math.random() * 15;
            });
        }, 200);

        try {
            const response = await api.submitExamCode(code);

            clearInterval(progressInterval);
            setProgress(100);

            if (response.success && response.data) {
                setStatus('success');

                const resultWithUser = {
                    ...response.data,
                    userName: user?.name || 'User',
                };

                sessionStorage.setItem('codeResult', JSON.stringify(resultWithUser));
                setTimeout(() => navigate('/result'), 500);
            } else {
                setStatus('error');
                setErrorMessage(response.error || strings.errors.invalidExamCode);
            }
        } catch {
            clearInterval(progressInterval);
            setStatus('error');
            setErrorMessage(strings.errors.tryAgain);
        }
    };

    const handleReset = () => {
        setCode('');
        setStatus('idle');
        setErrorMessage('');
        setProgress(0);
    };

    const getHeadingContent = () => {
        if (status === 'loading') {
            return (
                <>
                    <span className="text-secondary">Load</span>
                    <span className="text-primary">ing...</span>
                </>
            );
        }
        if (status === 'error') {
            return (
                <>
                    <span className="text-error italic">{strings.code.titleIncorrect}</span>
                    <span className="text-text-primary"> {strings.code.titleCode}</span>
                </>
            );
        }
        return (
            <>
                <span className="text-secondary underline">{strings.code.titleEnter}</span>
                <span className="text-text-primary"> {strings.code.titleSuffix}</span>
                <br />
                <span className="text-primary underline">{strings.code.titleResult}</span>
                <span className="text-text-primary">.</span>
            </>
        );
    };

    const getButtonText = () => {
        if (status === 'loading') return strings.code.buttonLoading;
        if (status === 'error') return strings.code.buttonReenter;
        return strings.code.buttonConfirm;
    };

    return (
        <CodeLayout>
            {(status === 'loading' || status === 'error') && (
                <GradientBackground variant={status === 'loading' ? 'loading' : 'error'} />
            )}

            <div className="w-full max-w-2xl text-center px-8">
                <h1 className="text-3xl font-bold mb-2">
                    {getHeadingContent()}
                </h1>

                {status === 'loading' && (
                    <p className="text-text-muted mb-8">{Math.round(progress)} %</p>
                )}

                {status === 'error' && (
                    <p className="text-text-muted mb-8">{errorMessage || strings.code.errorDefault}</p>
                )}

                {status === 'idle' && <div className="mb-8" />}

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
                        variant={status === 'error' ? 'danger' : status === 'idle' && !code ? 'muted' : 'primary'}
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
