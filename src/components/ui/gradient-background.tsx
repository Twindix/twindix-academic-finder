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
                    width: '1200px',
                    maxWidth: '100%',
                    height: '70vh',
                    background: `radial-gradient(ellipse 70% 70% at 50% 100%, rgba(${color}, 0.75) 0%, rgba(${color}, 0.5) 20%, rgba(${color}, 0.25) 40%, rgba(${color}, 0.1) 55%, rgba(${color}, 0.03) 70%, transparent 85%)`,
                }}
            />
        </div>
    );
}
