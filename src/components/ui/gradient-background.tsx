interface GradientBackgroundProps {
    variant: 'loading' | 'error';
    className?: string;
}

export default function GradientBackground({ variant, className = '' }: GradientBackgroundProps) {
    return (
        <div
            className={`fixed bottom-0 left-0 right-0 h-[60vh] pointer-events-none ${className}`}
            style={{
                background: variant === 'loading'
                    ? 'radial-gradient(ellipse at 50% 100%, rgba(59, 130, 246, 0.4) 0%, rgba(59, 130, 246, 0.1) 40%, transparent 70%)'
                    : 'radial-gradient(ellipse at 50% 100%, rgba(220, 38, 38, 0.4) 0%, rgba(239, 68, 68, 0.1) 40%, transparent 70%)',
            }}
        />
    );
}
