import ReactMarkdown from 'react-markdown';
import { Button } from '@/atoms';
import { strings } from '@/constants';
import copyIcon from '@/assets/icons/copy.svg';

export function ChatBox({ userName, content, onCopy }: {
    userName: string,
    content: string,
    onCopy: () => void,
}) {
    return (
        <div className="h-full bg-surface rounded-[14px] border border-gray-300 overflow-hidden flex flex-col">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-300 shrink-0">
                <h2 className="text-lg font-semibold text-primary">{userName}</h2>
                <Button variant="ghost" size="sm" onClick={onCopy} className="flex items-center gap-1">
                    {strings.common.copy}
                    <img src={copyIcon} alt="" className="w-4 h-4" />
                </Button>
            </div>
            <div className="px-6 py-4 flex-1 min-h-0 overflow-y-auto prose prose-sm max-w-none">
                <ReactMarkdown
                    components={{
                        h2: ({ children }) => (
                            <h2 className="text-xl font-bold text-primary mt-6 mb-3 first:mt-0">{children}</h2>
                        ),
                        h3: ({ children }) => (
                            <h3 className="text-lg font-semibold text-text-primary mt-4 mb-2">{children}</h3>
                        ),
                        p: ({ children }) => (
                            <p className="text-text-secondary leading-relaxed mb-3">{children}</p>
                        ),
                        ul: ({ children }) => (
                            <ul className="list-disc list-inside space-y-1 mb-3 text-text-secondary">{children}</ul>
                        ),
                        li: ({ children }) => (
                            <li className="text-text-secondary">{children}</li>
                        ),
                        strong: ({ children }) => (
                            <strong className="font-semibold text-text-primary">{children}</strong>
                        ),
                        hr: () => (
                            <hr className="my-6 border-gray-200" />
                        ),
                    }}
                >
                    {content}
                </ReactMarkdown>
            </div>
        </div>
    );
}
