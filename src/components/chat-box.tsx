import ReactMarkdown from 'react-markdown';
import { Button } from '@/atoms';
import { LanguageIcon, CopyIcon, SuccessIcon } from '@/assets/icons';
import { strings } from '@/constants';

export function ChatBox({ userName, content, copied, onCopy, lang, onToggleLanguage }: {
    userName: string,
    content: string,
    copied: boolean,
    onCopy: () => void,
    lang: 'en' | 'ar',
    onToggleLanguage: () => void,
}) {
    return (
        <div className="h-full bg-white rounded-[20px] overflow-hidden flex flex-col">
            <div className="flex items-center justify-between px-6 py-5 shrink-0">
                <h2 className="text-lg font-semibold text-primary">{userName}</h2>
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="sm" onClick={onToggleLanguage} className="flex items-center gap-2">
                        {lang === 'en' ? strings.common.languageEn : strings.common.languageAr}
                        <LanguageIcon className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={onCopy} className="flex items-center gap-2">
                        {copied ? strings.common.copied : strings.common.copy}
                        {copied ? <SuccessIcon className="w-4 h-4" /> : <CopyIcon className="w-4 h-4" />}
                    </Button>
                </div>
            </div>
            <div className="px-6 pb-6 flex-1 min-h-0 overflow-y-auto prose prose-sm max-w-none">
                <ReactMarkdown
                    components={{
                        h2: ({ children }) => (
                            <h2 className="text-xl font-bold text-primary mt-6 mb-3 first:mt-0">{children}</h2>
                        ),
                        h3: ({ children }) => (
                            <h3 className="text-lg font-semibold text-text-primary mt-4 mb-2">{children}</h3>
                        ),
                        p: ({ children }) => (
                            <p className="text-[#3A3A3A] leading-relaxed mb-3">{children}</p>
                        ),
                        ul: ({ children }) => (
                            <ul className="list-disc list-inside space-y-1 mb-3 text-[#3A3A3A]">{children}</ul>
                        ),
                        li: ({ children }) => (
                            <li className="text-[#3A3A3A]">{children}</li>
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
