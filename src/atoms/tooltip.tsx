import { ReactNode, useState } from 'react';

export function Tooltip({ children, content, disabled = false }: {
    children: ReactNode,
    content: string,
    disabled?: boolean,
}) {
    const [isVisible, setIsVisible] = useState(false);

    if (disabled) {
        return <>{children}</>;
    }

    return (
        <div
            className="relative inline-block"
            onMouseEnter={() => setIsVisible(true)}
            onMouseLeave={() => setIsVisible(false)}
        >
            {children}
            {isVisible && (
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-gray-800 text-white text-sm rounded-lg whitespace-nowrap z-50">
                    {content}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1">
                        <div className="border-4 border-transparent border-t-gray-800" />
                    </div>
                </div>
            )}
        </div>
    );
}
