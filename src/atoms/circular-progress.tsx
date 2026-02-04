export const CircularProgress = ({
    progress,
    size = 120,
}: {
    progress: number,
    size?: number,
}) => {
    const strokeWidth = 8;

    const radius = (size - strokeWidth) / 2;

    const circumference = radius * 2 * Math.PI;

    const offset = circumference - (progress / 100) * circumference;

    const center = size / 2;

    return (
        <div
            className="
                relative
                inline-flex
                items-center
                justify-center
            "
        >
            <svg
                height={size}
                width={size}
            >
                <circle
                    className="text-gray-200"
                    cx={center}
                    cy={center}
                    fill="none"
                    r={radius}
                    stroke="currentColor"
                    strokeWidth={strokeWidth}
                />
                <circle
                    className="text-primary/20"
                    cx={center}
                    cy={center}
                    fill="none"
                    r={radius}
                    stroke="currentColor"
                    strokeDasharray={`${circumference * 0.15} ${circumference * 0.85}`}
                    strokeLinecap="round"
                    strokeWidth={strokeWidth}
                    style={{
                        animation: "spin 2s linear infinite reverse",
                        transformOrigin: "50% 50%",
                    }}
                />
                <circle
                    cx={center}
                    cy={center}
                    fill="none"
                    r={radius}
                    stroke="currentColor"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    strokeLinecap="round"
                    strokeWidth={strokeWidth}
                    className="
                        text-primary
                        transition-all
                        duration-300
                        ease-out
                    "
                    style={{
                        transform: "rotate(90deg) scaleX(-1)",
                        transformOrigin: "50% 50%",
                    }}
                />
            </svg>
            <span
                className="
                    absolute
                    text-2xl
                    font-bold
                    text-primary
                "
            >
                {Math.round(progress)}
                %
            </span>
        </div>
    );
};
