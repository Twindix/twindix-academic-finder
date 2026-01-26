import { useNavigate } from 'react-router-dom';
import { Logo, Button } from '@/atoms';
import { strings, routes } from '@/constants';

export function NotFound() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <header className="p-6">
                <Logo size="md" />
            </header>

            <main className="flex-1 flex items-center justify-center px-4">
                <div className="text-center max-w-md">
                    <h1 className="text-9xl font-bold text-primary mb-4">
                        {strings.notFound.title}
                    </h1>
                    <h2 className="text-3xl font-bold text-gradient mb-4">
                        {strings.notFound.subtitle}
                    </h2>
                    <p className="text-text-secondary mb-8">
                        {strings.notFound.description}
                    </p>
                    <Button onClick={() => navigate(routes.code)}>
                        {strings.notFound.backToHome}
                    </Button>
                </div>
            </main>
        </div>
    );
}
