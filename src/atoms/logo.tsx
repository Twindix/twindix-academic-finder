import logoImage from '@/assets/images/logo.png';
import { strings } from '@/constants';

export function Logo({ size = 'md', className = '' }: {
    size?: 'sm' | 'md' | 'lg',
    className?: string,
}) {
    const sizes = {
        sm: 'h-10',
        md: 'h-16',
        lg: 'h-20',
    };

    return (
        <img
            src={logoImage}
            alt={strings.companyName}
            className={`${sizes[size]} w-auto object-contain ${className}`}
        />
    );
}
