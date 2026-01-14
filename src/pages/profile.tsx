import { MainLayout } from '@/components';
import { useAuth } from '@/hooks';
import { STRINGS } from '@/constants';

export default function Profile() {
    const { user } = useAuth();

    return (
        <MainLayout>
            <div className="min-h-screen flex flex-col items-center justify-center px-8">
                <div className="w-full max-w-md bg-surface rounded-[14px] border border-gray-100 p-8">
                    <h1 className="text-2xl font-bold text-secondary mb-6">{STRINGS.PROFILE.TITLE}</h1>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-text-secondary mb-1">
                                {STRINGS.PROFILE.NAME_LABEL}
                            </label>
                            <p className="text-text-primary font-medium">
                                {user?.name || STRINGS.PROFILE.NOT_AVAILABLE}
                            </p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-text-secondary mb-1">
                                {STRINGS.PROFILE.EMAIL_LABEL}
                            </label>
                            <p className="text-text-primary font-medium">
                                {user?.email || STRINGS.PROFILE.NOT_AVAILABLE}
                            </p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-text-secondary mb-1">
                                {STRINGS.PROFILE.USER_ID_LABEL}
                            </label>
                            <p className="text-text-primary font-medium">
                                {user?.id || STRINGS.PROFILE.NOT_AVAILABLE}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
