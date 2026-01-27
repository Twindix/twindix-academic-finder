export function CircularProgress({ progress, size = 120 }: {
    progress: number,
    size?: number,
}) {
    const strokeWidth = 8;

    const radius = (size - strokeWidth) / 2;

    const circumference = radius * 2 * Math.PI;

    const offset = circumference - (progress / 100) * circumference;

    const center = size / 2;

    return (
        <div className="relative inline-flex items-center justify-center">
            <svg width={size} height={size}>
                <circle
                    cx={center}
                    cy={center}
                    r={radius}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={strokeWidth}
                    className="text-gray-200"
                />
                <circle
                    cx={center}
                    cy={center}
                    r={radius}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={strokeWidth}
                    strokeDasharray={`${circumference * 0.15} ${circumference * 0.85}`}
                    strokeLinecap="round"
                    className="text-primary/20"
                    style={{
                        transformOrigin: '50% 50%',
                        animation: 'spin 2s linear infinite',
                    }}
                />
                <circle
                    cx={center}
                    cy={center}
                    r={radius}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={strokeWidth}
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    strokeLinecap="round"
                    className="text-primary transition-all duration-300 ease-out"
                    style={{
                        transformOrigin: '50% 50%',
                        transform: 'rotate(-90deg) scaleX(-1)',
                    }}
                />
            </svg>
            <span className="absolute text-2xl font-bold text-primary">
                {Math.round(progress)}%
            </span>
        </div>
    );
}
