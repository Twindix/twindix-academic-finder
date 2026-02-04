import { Button, Logo, Modal } from "@/atoms";
import { strings } from "@/constants";
import { ButtonTypeEnum, ButtonVariantEnum, LogoSizeEnum } from "@/enums";

export const LogoutModal = ({
    isLoading,
    isOpen,
    onClose,
    onConfirm,
}: {
    isLoading: boolean,
    isOpen: boolean,
    onClose: () => void,
    onConfirm: () => void,
}) => (
    <Modal
        isOpen={isOpen}
        onClose={onClose}
    >
        <div className="p-6">
            <button
                type={ButtonTypeEnum.BUTTON}
                className="
                    mb-4
                    flex
                    items-center
                    gap-1
                    text-red-300
                    transition-colors
                    hover:text-red-400
                "
                onClick={onClose}
            >
                <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                >
                    <path
                        d="M15 19l-7-7 7-7"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
                <span className="cursor-pointer text-sm font-medium">{strings.logoutModal.cancel}</span>
            </button>
            <div className="flex flex-col items-center">
                <Logo size={LogoSizeEnum.LG} />
                <p
                    className="
                        mt-6
                        text-center
                        text-xl
                        font-semibold
                        text-red-400
                    "
                >
                    {strings.logoutModal.confirmMessage}
                </p>
                <Button
                    className="mt-6 w-full"
                    disabled={isLoading}
                    variant={ButtonVariantEnum.DANGER}
                    onClick={onConfirm}
                >
                    {isLoading ? strings.common.loggingOut : strings.logoutModal.logoutButton}
                </Button>
            </div>
        </div>
    </Modal>
);
