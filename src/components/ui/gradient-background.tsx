interface GradientBackgroundProps {
    variant: 'loading' | 'error';
    className?: string;
}

export default function GradientBackground({ variant, className = '' }: GradientBackgroundProps) {
    const isLoading = variant === 'loading';

    const color = isLoading ? '19, 86, 188' : '239, 68, 68';

    return (
        <div className={`fixed inset-0 pointer-events-none overflow-hidden ${className}`}>
            <div
                className="absolute bottom-0 left-1/2 -translate-x-1/2"
                style={{
                    width: '150%',
                    height: '60vh',
                    background: `radial-gradient(ellipse 60% 80% at 50% 100%, rgba(${color}, 0.7) 0%, rgba(${color}, 0.4) 30%, rgba(${color}, 0.15) 50%, transparent 70%)`,
                }}
            />
        </div>
    );
}
