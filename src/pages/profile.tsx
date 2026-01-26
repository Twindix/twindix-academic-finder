import { Link } from 'react-router-dom';
import { CodeLayout } from '@/layouts';
import { Button, UserIcon } from '@/atoms';
import { useAuth } from '@/hooks';
import { strings, routes } from '@/constants';

export function Profile() {
    const { user } = useAuth();

    return (
        <CodeLayout>
            <div className="w-full max-w-lg px-4">
                <div className="bg-surface rounded-[14px] border border-gray-300 overflow-hidden">
                    <div className="flex items-center gap-4 px-6 py-5 border-b border-gray-300 bg-gray-50">
                        <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                            <UserIcon className="w-7 h-7 text-primary" />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-primary">
                                {user?.name || strings.profile.notAvailable}
                            </h1>
                            <p className="text-sm text-text-secondary">
                                {user?.email || strings.profile.notAvailable}
                            </p>
                        </div>
                    </div>

                    <div className="px-6 py-5 space-y-4">
                        <div className="flex items-center justify-between py-3 border-b border-gray-100">
                            <span className="text-sm text-text-secondary">
                                {strings.profile.nameLabel}
                            </span>
                            <span className="text-sm font-medium text-text-primary">
                                {user?.name || strings.profile.notAvailable}
                            </span>
                        </div>

                        <div className="flex items-center justify-between py-3 border-b border-gray-100">
                            <span className="text-sm text-text-secondary">
                                {strings.profile.emailLabel}
                            </span>
                            <span className="text-sm font-medium text-text-primary">
                                {user?.email || strings.profile.notAvailable}
                            </span>
                        </div>

                        {user?.companyName && (
                            <div className="flex items-center justify-between py-3 border-b border-gray-100">
                                <span className="text-sm text-text-secondary">
                                    {strings.profile.companyLabel}
                                </span>
                                <span className="text-sm font-medium text-text-primary">
                                    {user.companyName}
                                </span>
                            </div>
                        )}

                        {user?.phone && (
                            <div className="flex items-center justify-between py-3 border-b border-gray-100">
                                <span className="text-sm text-text-secondary">
                                    {strings.profile.phoneLabel}
                                </span>
                                <span className="text-sm font-medium text-text-primary">
                                    {user.phone}
                                </span>
                            </div>
                        )}
                    </div>

                    <div className="px-6 py-4 bg-gray-50 border-t border-gray-300">
                        <Link to={routes.code}>
                            <Button variant="primary" className="w-full">
                                {strings.profile.backToCode}
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </CodeLayout>
    );
}
