import { useNavigate } from "react-router-dom";

import { Button, Logo } from "@/atoms";
import { routes, strings } from "@/constants";
import { LogoSizeEnum } from "@/enums";

export const NotFound = () => {
    const navigate = useNavigate();

    return (
        <div
            className="
                flex
                min-h-screen
                flex-col
                bg-background
            "
        >
            <header className="p-6">
                <Logo size={LogoSizeEnum.MD} />
            </header>
            <main
                className="
                    flex
                    flex-1
                    items-center
                    justify-center
                    px-4
                "
            >
                <div className="max-w-md text-center">
                    <h1
                        className="
                            mb-4
                            text-9xl
                            font-bold
                            text-primary
                        "
                    >
                        {strings.notFound.title}
                    </h1>
                    <h2
                        className="
                            text-gradient
                            mb-4
                            text-3xl
                            font-bold
                        "
                    >
                        {strings.notFound.subtitle}
                    </h2>
                    <p className="mb-8 text-text-secondary">{strings.notFound.description}</p>
                    <Button onClick={() => navigate(routes.code)}>{strings.notFound.backToHome}</Button>
                </div>
            </main>
        </div>
    );
};
