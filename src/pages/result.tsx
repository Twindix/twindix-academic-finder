import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MainLayout } from '@/layouts';
import { Input, Button } from '@/atoms';
import { ChatBox } from '@/components';
import { clearJobId } from '@/utils';
import { strings } from '@/constants';
import type { ChatResult } from '@/interfaces';

export function Result() {
    const navigate = useNavigate();
    const [result, setResult] = useState<ChatResult | null>(null);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        const storedResult = sessionStorage.getItem('codeResult');
        if (storedResult) {
            try {
                setResult(JSON.parse(storedResult));
            } catch {
                navigate('/code');
            }
        } else {
            navigate('/code');
        }
    }, [navigate]);

    const handleCopy = () => {
        if (result) {
            navigator.clipboard.writeText(result.content);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    const handleReset = () => {
        sessionStorage.removeItem('codeResult');
        clearJobId();
        navigate('/code');
    };

    if (!result) {
        return (
            <MainLayout>
                <div className="min-h-screen flex items-center justify-center">
                    <span className="text-text-muted">{strings.result.loading}</span>
                </div>
            </MainLayout>
        );
    }

    return (
        <MainLayout>
            <div className="min-h-screen flex flex-col p-6">
                <div className="flex-1 max-w-4xl mx-auto w-full">
                    <ChatBox
                        userName={result.userName}
                        content={result.content}
                        onCopy={handleCopy}
                    />
                    {copied && (
                        <span className="block text-center text-sm text-primary mt-2">
                            {strings.result.copiedMessage}
                        </span>
                    )}
                </div>

                <div className="max-w-2xl mx-auto w-full mt-6">
                    <div className="flex gap-4 items-center justify-center">
                        <div className="flex-1 max-w-md">
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
            </div>
        </MainLayout>
    );
}
