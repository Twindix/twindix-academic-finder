import { ReactNode } from 'react';
import { Logo } from '@/components/atoms';
import { strings } from '@/constants';
import starIcon from '@/assets/icons/star.svg';

export default function AuthLayout({ children }: {
    children: ReactNode,
}) {
    return (
        <div className="min-h-screen bg-surface flex flex-col">
            <header className="p-6">
                <Logo size="md" />
            </header>

            <main className="flex-1 flex">
                <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
                    <div
                        className="absolute inset-0 rounded-tr-3xl"
                        style={{
                            background: 'linear-gradient(to top, #0025BA 0%, #0025BA 15%, #2557b8 35%, #4a7fd4 55%, #a8c4f5 75%, #FFFFFF 100%)',
                        }}
                    >
                        <img src={starIcon} alt="Decorative star" className="absolute top-[20%] left-[10%] w-4 h-4 opacity-60" aria-hidden="true" />
                        <img src={starIcon} alt="Decorative star" className="absolute top-[35%] left-[45%] w-4 h-4 opacity-50" aria-hidden="true" />
                        <img src={starIcon} alt="Decorative star" className="absolute top-[28%] right-[12%] w-8 h-8 opacity-90" aria-hidden="true" />
                        <img src={starIcon} alt="Decorative star" className="absolute top-[45%] right-[25%] w-5 h-5 opacity-60" aria-hidden="true" />
                        <img src={starIcon} alt="Decorative star" className="absolute bottom-[38%] left-[28%] w-20 h-20 opacity-100" aria-hidden="true" />
                        <img src={starIcon} alt="Decorative star" className="absolute bottom-[22%] left-[5%] w-5 h-5 opacity-70" aria-hidden="true" />
                        <img src={starIcon} alt="Decorative star" className="absolute bottom-[18%] right-[8%] w-6 h-6 opacity-60" aria-hidden="true" />
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                        <h1 className="text-3xl font-bold mb-3">{strings.authLayout.welcomeTitle}</h1>
                        <p className="text-white/90 text-sm leading-relaxed">
                            {strings.authLayout.welcomeDescription}
                        </p>
                    </div>
                </div>

                <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
                    <div className="w-full max-w-md">
                        {children}
                    </div>
                </div>
            </main>
        </div>
    );
}
