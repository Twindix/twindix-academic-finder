import { Link } from "react-router-dom";

import { UserIcon } from "@/assets/icons";
import { Button } from "@/atoms";
import { routes, strings } from "@/constants";
import { ButtonVariantEnum } from "@/enums";
import { useAuth } from "@/hooks";
import { CodeLayout } from "@/layouts";

export const ProfilePage = () => {
    const { user } = useAuth();

    return (
        <CodeLayout>
            <div className="w-full max-w-lg px-4">
                <div
                    className="
                        overflow-hidden
                        rounded-default
                        border
                        border-gray-300
                        bg-surface
                    "
                >
                    <div
                        className="
                            flex
                            items-center
                            gap-4
                            border-b
                            border-gray-300
                            bg-gray-50
                            px-6
                            py-5
                        "
                    >
                        <div
                            className="
                                flex
                                h-14
                                w-14
                                items-center
                                justify-center
                                rounded-full
                                bg-primary/10
                            "
                        >
                            <UserIcon className="h-7 w-7 text-primary" />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-primary">{user?.name || strings.profile.notAvailable}</h1>
                            <p className="text-sm text-text-secondary">{user?.email || strings.profile.notAvailable}</p>
                        </div>
                    </div>
                    <div className="space-y-4 px-6 py-5">
                        <div
                            className="
                                flex
                                items-center
                                justify-between
                                border-b
                                border-gray-100
                                py-3
                            "
                        >
                            <span className="text-sm text-text-secondary">{strings.profile.nameLabel}</span>
                            <span className="text-sm font-medium text-text-primary">{user?.name || strings.profile.notAvailable}</span>
                        </div>
                        <div
                            className="
                                flex
                                items-center
                                justify-between
                                border-b
                                border-gray-100
                                py-3
                            "
                        >
                            <span className="text-sm text-text-secondary">{strings.profile.emailLabel}</span>
                            <span className="text-sm font-medium text-text-primary">{user?.email || strings.profile.notAvailable}</span>
                        </div>
                        {user?.companyName && (
                            <div
                                className="
                                    flex
                                    items-center
                                    justify-between
                                    border-b
                                    border-gray-100
                                    py-3
                                "
                            >
                                <span className="text-sm text-text-secondary">{strings.profile.companyLabel}</span>
                                <span className="text-sm font-medium text-text-primary">{user.companyName}</span>
                            </div>
                        )}
                        {user?.phone && (
                            <div
                                className="
                                    flex
                                    items-center
                                    justify-between
                                    border-b
                                    border-gray-100
                                    py-3
                                "
                            >
                                <span className="text-sm text-text-secondary">{strings.profile.phoneLabel}</span>
                                <span className="text-sm font-medium text-text-primary">{user.phone}</span>
                            </div>
                        )}
                    </div>
                    <div
                        className="
                            border-t
                            border-gray-300
                            bg-gray-50
                            px-6
                            py-4
                        "
                    >
                        <Link to={routes.code}>
                            <Button
                                className="w-full"
                                variant={ButtonVariantEnum.PRIMARY}
                            >
                                {strings.profile.backToCode}
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </CodeLayout>
    );
};
