import { ReactNode } from 'react';
import { Logo } from '@/components/ui';
import starIcon from '@/assets/icons/star.svg';

interface AuthLayoutProps {
    children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
    return (
        <div className="min-h-screen bg-surface flex flex-col">
            {/* Header */}
            <header className="p-6">
                <Logo size="md" />
            </header>

            {/* Main content */}
            <main className="flex-1 flex">
                {/* Left side - Illustration */}
                <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-b from-primary-light via-primary to-primary-dark rounded-tr-3xl">
                        {/* Decorative stars */}
                        <img src={starIcon} alt="" className="absolute top-[20%] left-[10%] w-4 h-4 opacity-70" />
                        <img src={starIcon} alt="" className="absolute top-[35%] left-[45%] w-3 h-3 opacity-50" />
                        <img src={starIcon} alt="" className="absolute top-[30%] right-[15%] w-6 h-6 opacity-80" />
                        <img src={starIcon} alt="" className="absolute top-[50%] right-[30%] w-4 h-4 opacity-60" />
                        <img src={starIcon} alt="" className="absolute bottom-[40%] left-[25%] w-16 h-16 opacity-90" />
                        <img src={starIcon} alt="" className="absolute bottom-[25%] left-[5%] w-4 h-4 opacity-70" />
                        <img src={starIcon} alt="" className="absolute bottom-[20%] right-[10%] w-5 h-5 opacity-60" />
                    </div>

                    {/* Welcome text */}
                    <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                        <h1 className="text-3xl font-bold mb-3">Welcome Back to Twindix</h1>
                        <p className="text-white/90 text-sm leading-relaxed">
                            Accurate recommendations for suitable academic and career paths, along with practical
                            steps to help both the parent and the student make a confident, decisive choice.
                        </p>
                    </div>
                </div>

                {/* Right side - Form */}
                <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
                    <div className="w-full max-w-md">
                        {children}
                    </div>
                </div>
            </main>
        </div>
    );
}
