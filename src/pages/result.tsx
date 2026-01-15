import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CodeLayout } from '@/layouts';
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
            <CodeLayout>
                <div className="flex items-center justify-center">
                    <span className="text-text-muted">{strings.result.loading}</span>
                </div>
            </CodeLayout>
        );
    }

    return (
        <CodeLayout>
            <div className="w-full max-w-4xl px-4 flex flex-col gap-6">
                <ChatBox
                    userName={result.userName}
                    content={result.content}
                    onCopy={handleCopy}
                />
                {copied && (
                    <span className="block text-center text-sm text-primary">
                        {strings.result.copiedMessage}
                    </span>
                )}
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
        </CodeLayout>
    );
}
