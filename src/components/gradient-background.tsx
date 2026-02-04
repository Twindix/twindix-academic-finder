import { GradientVariantEnum } from "@/enums";
import type { GradientVariantType } from "@/types";

export const GradientBackground = ({
    className = "",
    variant,
}: {
    className?: string,
    variant: GradientVariantType,
}) => {
    const isLoading = variant === GradientVariantEnum.LOADING;

    const color = isLoading ? "19, 86, 188" : "239, 68, 68";

    return (
        <div
            className={`
                pointer-events-none
                fixed
                inset-0
                overflow-hidden
                ${className}
            `}
        >
            <div
                className="
                    absolute
                    bottom-0
                    left-1/2
                    -translate-x-1/2
                "
                style={{
                    background: `radial-gradient(ellipse 70% 70% at 50% 100%, rgba(${color}, 0.75) 0%, rgba(${color}, 0.5) 20%, rgba(${color}, 0.25) 40%, rgba(${color}, 0.1) 55%, rgba(${color}, 0.03) 70%, transparent 85%)`,
                    height: "70vh",
                    maxWidth: "100%",
                    width: "1200px",
                }}
            />
        </div>
    );
};
