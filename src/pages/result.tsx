import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MainLayout, ChatBox, Input, Button } from '@/components';
import { strings } from '@/constants';
import type { ChatResult } from '@/interfaces';

export default function Result() {
    const navigate = useNavigate();
    const [result, setResult] = useState<ChatResult | null>(null);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        // Get result from session storage
        const storedResult = sessionStorage.getItem('codeResult');
        if (storedResult) {
            try {
                setResult(JSON.parse(storedResult));
            } catch {
                // Invalid data, redirect to code page
                navigate('/code');
            }
        } else {
            // No result found, redirect to code page
            navigate('/code');
        }
    }, [navigate]);

    const handleCopy = () => {
        if (result) {
            const text = result.content.join('\n\n');
            navigator.clipboard.writeText(text);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    const handleReset = () => {
        sessionStorage.removeItem('codeResult');
        navigate('/code');
    };

    if (!result) {
        return (
            <MainLayout>
                <div className="min-h-screen flex items-center justify-center">
                    <p className="text-text-muted">{strings.result.loading}</p>
                </div>
            </MainLayout>
        );
    }

    return (
        <MainLayout>
            <div className="min-h-screen flex flex-col p-6">
                {/* Chat box */}
                <div className="flex-1 max-w-4xl mx-auto w-full">
                    <ChatBox
                        userName={result.userName}
                        content={result.content}
                        onCopy={handleCopy}
                    />
                    {copied && (
                        <p className="text-center text-sm text-primary mt-2">
                            {strings.result.copiedMessage}
                        </p>
                    )}
                </div>

                {/* Bottom controls */}
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
