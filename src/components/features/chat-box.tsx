interface ChatBoxProps {
    userName: string;
    content: string[];
    onCopy: () => void;
}

export default function ChatBox({ userName, content, onCopy }: ChatBoxProps) {
    return (
        <div className="bg-surface rounded-[14px] border border-gray-100 overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                <h2 className="text-lg font-semibold text-primary">{userName}</h2>
                <div className="flex items-center gap-4">
                    <button className="flex items-center gap-1 text-text-secondary hover:text-text-primary transition-colors cursor-pointer">
                        <span className="text-sm">EN</span>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                        </svg>
                    </button>
                    <button
                        onClick={onCopy}
                        className="flex items-center gap-1 text-text-secondary hover:text-text-primary transition-colors cursor-pointer"
                    >
                        <span className="text-sm">Copy</span>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Content */}
            <div className="px-6 py-4 max-h-[60vh] overflow-y-auto">
                <ul className="space-y-4">
                    {content.map((item, index) => (
                        <li key={index} className="flex gap-3 text-text-secondary">
                            <span className="text-text-muted">•</span>
                            <span className="leading-relaxed">{item}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
