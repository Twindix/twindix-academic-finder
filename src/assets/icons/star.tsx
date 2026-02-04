export const StarIcon = ({ className = "" }: { className?: string }) => (
    <svg
        className={className}
        fill="none"
        viewBox="0 0 99 99"
        xmlns="http://www.w3.org/2000/svg"
    >
        <g filter="url(#filter0_f_21_211)">
            <path
                d="M49.1001 3.10001L61.5243 36.6758L95.1001 49.1L61.5243 61.5242L49.1001 95.1L36.6759 61.5242L3.1001 49.1L36.6759 36.6758L49.1001 3.10001Z"
                fill="white"
            />
        </g>
        <defs>
            <filter
                colorInterpolationFilters="sRGB"
                filterUnits="userSpaceOnUse"
                height="98.2"
                id="filter0_f_21_211"
                width="98.2"
                x="9.77516e-05"
                y="6.19888e-06"
            >
                <feFlood
                    floodOpacity="0"
                    result="BackgroundImageFix"
                />
                <feBlend
                    in="SourceGraphic"
                    in2="BackgroundImageFix"
                    mode="normal"
                    result="shape"
                />
                <feGaussianBlur
                    result="effect1_foregroundBlur_21_211"
                    stdDeviation="1.55"
                />
            </filter>
        </defs>
    </svg>
);
