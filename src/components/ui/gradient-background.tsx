interface GradientBackgroundProps {
    variant: 'loading' | 'error';
    className?: string;
}

export default function GradientBackground({ variant, className = '' }: GradientBackgroundProps) {
    const isLoading = variant === 'loading';

    const gradientColor = isLoading
        ? 'rgba(19, 86, 188, 0.6)'
        : 'rgba(239, 68, 68, 0.5)';

    const gradientColorLight = isLoading
        ? 'rgba(19, 86, 188, 0.2)'
        : 'rgba(239, 68, 68, 0.15)';

    return (
        <div className={`fixed inset-0 pointer-events-none overflow-hidden ${className}`}>
            <div
                className="absolute bottom-0 left-1/2 -translate-x-1/2"
                style={{
                    width: '120%',
                    height: '50vh',
                    background: `radial-gradient(ellipse 70% 100% at 50% 100%, ${gradientColor} 0%, ${gradientColorLight} 40%, transparent 70%)`,
                }}
            />
        </div>
    );
}
