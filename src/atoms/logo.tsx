import logoImage from "@/assets/images/logo.png";
import { strings } from "@/constants";
import { LogoSizeEnum } from "@/enums";
import type { LogoSizeType } from "@/types";

export const Logo = ({
    className = "",
    size = LogoSizeEnum.MD,
}: {
    className?: string,
    size?: LogoSizeType,
}) => {
    const sizes = {
        lg: "h-20",
        md: "h-16",
        sm: "h-10",
    };

    return (
        <img
            alt={strings.companyName}
            src={logoImage}
            className={`
                w-auto
                object-contain
                ${sizes[size]}
                ${className}
            `}
        />
    );
};
