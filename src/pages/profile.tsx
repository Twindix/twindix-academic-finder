import { MainLayout } from '@/components';
import { useAuth } from '@/hooks';
import { strings } from '@/constants';

export default function Profile() {
    const { user } = useAuth();

    return (
        <MainLayout>
            <div className="min-h-screen flex flex-col items-center justify-center px-8">
                <div className="w-full max-w-md bg-surface rounded-[14px] border border-gray-100 p-8">
                    <h1 className="text-2xl font-bold text-secondary mb-6">{strings.profile.title}</h1>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-text-secondary mb-1">
                                {strings.profile.nameLabel}
                            </label>
                            <p className="text-text-primary font-medium">
                                {user?.name || strings.profile.notAvailable}
                            </p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-text-secondary mb-1">
                                {strings.profile.emailLabel}
                            </label>
                            <p className="text-text-primary font-medium">
                                {user?.email || strings.profile.notAvailable}
                            </p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-text-secondary mb-1">
                                {strings.profile.userIdLabel}
                            </label>
                            <p className="text-text-primary font-medium">
                                {user?.id || strings.profile.notAvailable}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
