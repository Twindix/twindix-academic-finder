import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Alert, Button, Input } from "@/atoms";
import { routes, strings } from "@/constants";
import {
    AlertVariantEnum,
    ButtonTypeEnum,
    ButtonVariantEnum,
    InputTypeEnum,
} from "@/enums";
import { AuthLayout } from "@/layouts";
import { api } from "@/services";
import { validateEmailHandler } from "@/utils";

export const ForgotPasswordPage = () => {
    const [email, setEmail] = useState("");

    const [isLoading, setIsLoading] = useState(false);

    const [error, setError] = useState("");

    const [isSuccess, setIsSuccess] = useState(false);

    const navigate = useNavigate();

    const submitHandler = async (e: React.FormEvent) => {
        e.preventDefault();

        setError("");

        const validation = validateEmailHandler(email);

        if (!validation.isValid) {
            setError(validation.error || strings.errors.checkInput);

            return;
        }

        setIsLoading(true);

        try {
            await api.forgotPasswordHandler(email);

            setIsSuccess(true);
        } catch (err) {
            setError(err instanceof Error ? err.message : strings.errors.genericError);
        } finally {
            setIsLoading(false);
        }
    };

    console.log(name);

    const backToLoginHandler = () => navigate(routes.login);

    if (isSuccess) {
        return (
            <AuthLayout
                description={strings.forgotPassword.sidebarDescription}
                title={strings.forgotPassword.sidebarTitle}
            >
                <div>
                    <h1
                        className="
                            text-gradient
                            mb-2
                            text-3xl
                            font-bold
                        "
                    >
                        {strings.forgotPassword.title}
                    </h1>
                    <Alert
                        className="mb-6"
                        variant={AlertVariantEnum.SUCCESS}
                    >
                        {strings.forgotPassword.successMessage}
                    </Alert>
                    <Button
                        variant={ButtonVariantEnum.LINK}
                        onClick={backToLoginHandler}
                    >
                        {strings.forgotPassword.backToLogin}
                    </Button>
                </div>
            </AuthLayout>
        );
    }

    return (
        <AuthLayout
            description={strings.forgotPassword.sidebarDescription}
            title={strings.forgotPassword.sidebarTitle}
        >
            <div>
                <h1
                    className="
                        text-gradient
                        mb-2
                        text-3xl
                        font-bold
                    "
                >
                    {strings.forgotPassword.title}
                </h1>
                <p className="mb-8 text-text-secondary">{strings.forgotPassword.description}</p>
                {error && (
                    <Alert
                        className="mb-6"
                        variant={AlertVariantEnum.ERROR}
                        onClose={() => setError("")}
                    >
                        {error}
                    </Alert>
                )}
                <form
                    className="space-y-5"
                    onSubmit={submitHandler}
                >
                    <Input
                        hasError={!!error}
                        label={strings.forgotPassword.emailLabel}
                        placeholder={strings.forgotPassword.emailPlaceholder}
                        type={InputTypeEnum.EMAIL}
                        value={email}
                        onChange={(e) => {
                            const { target: { value } } = e;

                            setEmail(value);

                            setError("");
                        }}
                    />
                    <Button
                        isLoading={isLoading}
                        type={ButtonTypeEnum.SUBMIT}
                        isFullWidth
                    >
                        {strings.forgotPassword.submitButton}
                    </Button>
                </form>
                <div className="mt-4 text-center">
                    <Button
                        variant={ButtonVariantEnum.LINK}
                        onClick={backToLoginHandler}
                    >
                        {strings.forgotPassword.backToLogin}
                    </Button>
                </div>
            </div>
        </AuthLayout>
    );
};
