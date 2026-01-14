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
                    width: '900px',
                    maxWidth: '95%',
                    height: '50vh',
                    background: `radial-gradient(ellipse 100% 80% at 50% 100%, rgba(${color}, 0.55) 0%, rgba(${color}, 0.35) 20%, rgba(${color}, 0.2) 35%, rgba(${color}, 0.1) 50%, rgba(${color}, 0.03) 65%, transparent 80%)`,
                    filter: 'blur(2px)',
                }}
            />
        </div>
    );
}
