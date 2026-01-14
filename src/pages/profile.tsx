import { MainLayout } from '@/components';
import { useAuth } from '@/hooks';

export default function Profile() {
    const { user } = useAuth();

    return (
        <MainLayout>
            <div className="min-h-screen flex flex-col items-center justify-center px-8">
                <div className="w-full max-w-md bg-surface rounded-[14px] border border-gray-100 p-8">
                    <h1 className="text-2xl font-bold text-secondary mb-6">Profile</h1>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-text-secondary mb-1">
                                Name
                            </label>
                            <p className="text-text-primary font-medium">
                                {user?.name || 'N/A'}
                            </p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-text-secondary mb-1">
                                Email
                            </label>
                            <p className="text-text-primary font-medium">
                                {user?.email || 'N/A'}
                            </p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-text-secondary mb-1">
                                User ID
                            </label>
                            <p className="text-text-primary font-medium">
                                {user?.id || 'N/A'}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
