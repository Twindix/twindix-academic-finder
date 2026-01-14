import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CodeLayout } from '@/layouts';
import { Input, Button } from '@/atoms';
import { GradientBackground } from '@/components';
import { api } from '@/services';
import { useAuth } from '@/hooks';
import { strings } from '@/constants';
import type { CodePageStatus } from '@/types';

export function Code() {
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
                        <h1 className="text-3xl font-bold mb-2 text-gradient">Loading...</h1>
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
