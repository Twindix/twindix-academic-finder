import { Button } from '@/atoms';
import { strings } from '@/constants';
import languageIcon from '@/assets/icons/language.svg';
import copyIcon from '@/assets/icons/copy.svg';

export function ChatBox({ userName, content, onCopy }: {
    userName: string,
    content: string[],
    onCopy: () => void,
}) {
    return (
        <div className="bg-surface rounded-[14px] border border-gray-100 overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                <h2 className="text-lg font-semibold text-primary">{userName}</h2>
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="sm" className="flex items-center gap-1">
                        {strings.common.language}
                        <img src={languageIcon} alt="" className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={onCopy} className="flex items-center gap-1">
                        {strings.common.copy}
                        <img src={copyIcon} alt="" className="w-4 h-4" />
                    </Button>
                </div>
            </div>

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
