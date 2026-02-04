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
import { validateEmailHandler, validatePasswordHandler } from "@/utils";

export const Register = () => {
    const [token, setToken] = useState("");

    const [name, setName] = useState("");

    const [email, setEmail] = useState("");

    const [companyName, setCompanyName] = useState("");

    const [phone, setPhone] = useState("");

    const [password, setPassword] = useState("");

    const [confirmPassword, setConfirmPassword] = useState("");

    const [isLoading, setIsLoading] = useState(false);

    const [error, setError] = useState("");

    const [isSuccess, setIsSuccess] = useState(false);

    const navigate = useNavigate();

    const [searchParams] = useSearchParams();

    const validateFormHandler = (): string | null => {
        if (!name.trim()) return strings.validation.nameRequired;

        const emailValidation = validateEmailHandler(email);

        if (!emailValidation.isValid) return emailValidation.error || strings.validation.emailInvalid;

        if (!companyName.trim()) return strings.validation.companyNameRequired;

        if (!phone.trim()) return strings.validation.phoneRequired;

        const passwordValidation = validatePasswordHandler(password);

        if (!passwordValidation.isValid) return passwordValidation.error || strings.errors.checkInput;

        if (password !== confirmPassword) return strings.register.passwordMismatch;

        return null;
    };

    const submitHandler = async (e: React.FormEvent) => {
        e.preventDefault();

        setError("");

        const validationError = validateFormHandler();

        if (validationError) {
            setError(validationError);

            return;
        }

        setIsLoading(true);

        try {
            await api.acceptInvitationHandler(
                token,
                {
                    companyName,
                    email,
                    name,
                    password,
                    passwordConfirmation: confirmPassword,
                    phone,
                },
            );

            setIsSuccess(true);
        } catch (err) {
            setError(err instanceof Error ? err.message : strings.errors.genericError);
        } finally {
            setIsLoading(false);
        }
    };

    const backToLoginHandler = () => navigate(routes.login);

    const clearErrorHandler = () => setError("");

    useEffect(
        () => {
            const tokenParam = searchParams.get(strings.queryParams.token);

            if (tokenParam) setToken(tokenParam);
        },
        [searchParams],
    );

    if (isSuccess) {
        return (
            <AuthLayout
                description={strings.register.sidebarDescription}
                title={strings.register.sidebarTitle}
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
                        {strings.register.title}
                    </h1>
                    <Alert
                        className="mb-6"
                        variant={AlertVariantEnum.SUCCESS}
                    >
                        {strings.register.successMessage}
                    </Alert>
                    <Button
                        fullWidth
                        onClick={backToLoginHandler}
                    >
                        {strings.register.goToLogin}
                    </Button>
                </div>
            </AuthLayout>
        );
    }

    if (!token) {
        return (
            <AuthLayout
                description={strings.register.sidebarDescription}
                title={strings.register.sidebarTitle}
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
                        {strings.register.title}
                    </h1>
                    <Alert
                        className="mb-6"
                        variant={AlertVariantEnum.ERROR}
                    >
                        {strings.register.invalidToken}
                    </Alert>
                    <Button
                        variant={ButtonVariantEnum.LINK}
                        onClick={backToLoginHandler}
                    >
                        {strings.register.backToLogin}
                    </Button>
                </div>
            </AuthLayout>
        );
    }

    return (
        <AuthLayout
            description={strings.register.sidebarDescription}
            title={strings.register.sidebarTitle}
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
                    {strings.register.title}
                </h1>
                <p className="text-gradient mb-8 font-medium">{strings.register.description}</p>
                {error && (
                    <Alert
                        className="mb-6"
                        variant={AlertVariantEnum.ERROR}
                        onClose={clearErrorHandler}
                    >
                        {error}
                    </Alert>
                )}
                <form
                    className="space-y-5"
                    onSubmit={submitHandler}
                >
                    <Input
                        error={!!error}
                        label={strings.register.nameLabel}
                        placeholder={strings.register.namePlaceholder}
                        type={InputTypeEnum.TEXT}
                        value={name}
                        onChange={(e) => {
                            const { target: { value } } = e;

                            setName(value);

                            clearErrorHandler();
                        }}
                    />
                    <Input
                        error={!!error}
                        label={strings.register.emailLabel}
                        placeholder={strings.register.emailPlaceholder}
                        type={InputTypeEnum.EMAIL}
                        value={email}
                        onChange={(e) => {
                            const { target: { value } } = e;

                            setEmail(value);

                            clearErrorHandler();
                        }}
                    />
                    <Input
                        error={!!error}
                        label={strings.register.companyNameLabel}
                        placeholder={strings.register.companyNamePlaceholder}
                        type={InputTypeEnum.TEXT}
                        value={companyName}
                        onChange={(e) => {
                            const { target: { value } } = e;

                            setCompanyName(value);

                            clearErrorHandler();
                        }}
                    />
                    <Input
                        error={!!error}
                        label={strings.register.phoneLabel}
                        placeholder={strings.register.phonePlaceholder}
                        type={InputTypeEnum.TEL}
                        value={phone}
                        onChange={(e) => {
                            const { target: { value } } = e;

                            setPhone(value);

                            clearErrorHandler();
                        }}
                    />
                    <Input
                        error={!!error}
                        label={strings.register.passwordLabel}
                        placeholder={strings.register.passwordPlaceholder}
                        type={InputTypeEnum.PASSWORD}
                        value={password}
                        showPasswordToggle
                        onChange={(e) => {
                            const { target: { value } } = e;

                            setPassword(value);

                            clearErrorHandler();
                        }}
                    />
                    <Input
                        error={!!error}
                        label={strings.register.confirmPasswordLabel}
                        placeholder={strings.register.confirmPasswordPlaceholder}
                        type={InputTypeEnum.PASSWORD}
                        value={confirmPassword}
                        showPasswordToggle
                        onChange={(e) => {
                            const { target: { value } } = e;

                            setConfirmPassword(value);

                            clearErrorHandler();
                        }}
                    />
                    <Button
                        loading={isLoading}
                        type={ButtonTypeEnum.SUBMIT}
                        fullWidth
                    >
                        {strings.register.submitButton}
                    </Button>
                </form>
                <div className="mt-4 text-center">
                    <Button
                        variant={ButtonVariantEnum.LINK}
                        onClick={backToLoginHandler}
                    >
                        {strings.register.backToLogin}
                    </Button>
                </div>
            </div>
        </AuthLayout>
    );
};
