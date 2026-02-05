import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

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
import { validatePasswordHandler } from "@/utils";

export const ResetPasswordPage = () => {
    const [token, setToken] = useState("");

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const [confirmPassword, setConfirmPassword] = useState("");

    const [isLoading, setIsLoading] = useState(false);

    const [error, setError] = useState("");

    const [isSuccess, setIsSuccess] = useState(false);

    const navigate = useNavigate();

    const [searchParams] = useSearchParams();

    const submitHandler = async (e: React.FormEvent) => {
        e.preventDefault();

        setError("");

        if (!token || !email) {
            setError(strings.resetPassword.invalidLink);

            return;
        }

        const validation = validatePasswordHandler(password);

        if (!validation.isValid) {
            setError(validation.error || strings.errors.checkInput);

            return;
        }

        if (password !== confirmPassword) {
            setError(strings.resetPassword.passwordMismatch);

            return;
        }

        setIsLoading(true);

        try {
            await api.resetPasswordHandler(
                token,
                email,
                password,
                confirmPassword,
            );

            setIsSuccess(true);
        } catch (err) {
            setError(err instanceof Error ? err.message : strings.errors.genericError);
        } finally {
            setIsLoading(false);
        }
    };

    const backToLoginHandler = () => navigate(routes.login);

    useEffect(
        () => {
            const tokenParam = searchParams.get(strings.queryParams.token);

            const emailParam = searchParams.get(strings.queryParams.email);

            if (tokenParam) setToken(tokenParam);

            if (emailParam) setEmail(emailParam);
        },
        [searchParams],
    );

    if (isSuccess) {
        return (
            <AuthLayout
                description={strings.resetPassword.sidebarDescription}
                title={strings.resetPassword.sidebarTitle}
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
                        {strings.resetPassword.title}
                    </h1>
                    <Alert
                        className="mb-6"
                        variant={AlertVariantEnum.SUCCESS}
                    >
                        {strings.resetPassword.successMessage}
                    </Alert>
                    <Button
                        isFullWidth
                        onClick={backToLoginHandler}
                    >
                        {strings.resetPassword.goToLogin}
                    </Button>
                </div>
            </AuthLayout>
        );
    }

    if (!token || !email) {
        return (
            <AuthLayout
                description={strings.resetPassword.sidebarDescription}
                title={strings.resetPassword.sidebarTitle}
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
                        {strings.resetPassword.title}
                    </h1>
                    <Alert
                        className="mb-6"
                        variant={AlertVariantEnum.ERROR}
                    >
                        {strings.resetPassword.invalidLink}
                    </Alert>
                    <Button
                        variant={ButtonVariantEnum.LINK}
                        onClick={backToLoginHandler}
                    >
                        {strings.resetPassword.backToLogin}
                    </Button>
                </div>
            </AuthLayout>
        );
    }

    return (
        <AuthLayout
            description={strings.resetPassword.sidebarDescription}
            title={strings.resetPassword.sidebarTitle}
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
                    {strings.resetPassword.title}
                </h1>
                <p className="mb-8 text-text-secondary">{strings.resetPassword.description}</p>
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
                        label={strings.resetPassword.passwordLabel}
                        placeholder={strings.resetPassword.passwordPlaceholder}
                        type={InputTypeEnum.PASSWORD}
                        value={password}
                        isShowPasswordToggle
                        onChange={(e) => {
                            const { target: { value } } = e;

                            setPassword(value);

                            setError("");
                        }}
                    />
                    <Input
                        hasError={!!error}
                        label={strings.resetPassword.confirmPasswordLabel}
                        placeholder={strings.resetPassword.confirmPasswordPlaceholder}
                        type={InputTypeEnum.PASSWORD}
                        value={confirmPassword}
                        isShowPasswordToggle
                        onChange={(e) => {
                            const { target: { value } } = e;

                            setConfirmPassword(value);

                            setError("");
                        }}
                    />
                    <Button
                        isLoading={isLoading}
                        type={ButtonTypeEnum.SUBMIT}
                        isFullWidth
                    >
                        {strings.resetPassword.submitButton}
                    </Button>
                </form>
                <div className="mt-4 text-center">
                    <Button
                        variant={ButtonVariantEnum.LINK}
                        onClick={backToLoginHandler}
                    >
                        {strings.resetPassword.backToLogin}
                    </Button>
                </div>
            </div>
        </AuthLayout>
    );
};
