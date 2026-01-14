import logoImage from '@/assets/images/logo.png';

interface LogoProps {
    size?: 'sm' | 'md' | 'lg';
    className?: string;
}

export default function Logo({ size = 'md', className = '' }: LogoProps) {
    const sizes = {
        sm: 'h-10',
        md: 'h-16',
        lg: 'h-20',
    };

    return (
        <img
            src={logoImage}
            alt="Twindix Global Inc."
            className={`${sizes[size]} w-auto object-contain ${className}`}
        />
    );
}
