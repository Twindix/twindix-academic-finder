interface GradientBackgroundProps {
    variant: 'loading' | 'error';
    className?: string;
}

export default function GradientBackground({ variant, className = '' }: GradientBackgroundProps) {
    const isLoading = variant === 'loading';

    return (
        <div className={`fixed inset-0 pointer-events-none overflow-hidden ${className}`}>
            <div
                className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-[200vw] h-[100vh] ${
                    isLoading ? 'animate-pulse' : ''
                }`}
                style={{
                    borderRadius: '100% 100% 0 0',
                    background: isLoading
                        ? 'radial-gradient(ellipse at 50% 100%, #1356BC 0%, #0025BA 30%, rgba(0, 37, 186, 0.3) 50%, transparent 70%)'
                        : 'radial-gradient(ellipse at 50% 100%, #DC2626 0%, #EF4444 30%, rgba(220, 38, 38, 0.3) 50%, transparent 70%)',
                    transform: 'translateX(-50%) translateY(50%)',
                }}
            />

            <div
                className="absolute bottom-0 left-0 right-0 h-[40vh]"
                style={{
                    background: isLoading
                        ? 'linear-gradient(to top, rgba(19, 86, 188, 0.2) 0%, transparent 100%)'
                        : 'linear-gradient(to top, rgba(220, 38, 38, 0.2) 0%, transparent 100%)',
                }}
            />
        </div>
    );
}
