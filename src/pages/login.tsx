import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { Alert, Button, Input } from "@/atoms";
import { routes, strings } from "@/constants";
import {
    AlertVariantEnum,
    ButtonSizeEnum,
    ButtonTypeEnum,
    ButtonVariantEnum,
    InputTypeEnum,
} from "@/enums";
import { useAuth } from "@/hooks";
import { AuthLayout } from "@/layouts";
import { validateLoginFormHandler } from "@/utils";

export const LoginPage = () => {
    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const [validationError, setValidationError] = useState("");

    const navigate = useNavigate();

    const [searchParams] = useSearchParams();

    const {
        error,
        isLoading,
        onClearError,
        onLogin,
    } = useAuth();

    const returnUrl = searchParams.get("returnUrl") || routes.code;

    const displayError = validationError || error;

    const submitHandler = async (e: React.FormEvent) => {
        e.preventDefault();

        setValidationError("");

        onClearError();

        const validation = validateLoginFormHandler(
            email,
            password,
        );

        if (!validation.isValid) {
            setValidationError(validation.error || strings.errors.checkInput);

            return;
        }

        try {
            await onLogin(
                email,
                password,
            );

            navigate(returnUrl);
        } catch (error) {
            console.error(
                strings.debug.loginFailed,
                error,
            );
        }
    };

    const dismissErrorHandler = () => {
        setValidationError("");

        onClearError();
    };

    return (
        <AuthLayout>
            <div>
                <h1
                    className="
                        text-gradient
                        mb-2
                        text-3xl
                        font-bold
                    "
                >
                    {strings.login.title}
                </h1>
                <p className="text-gradient mb-8 font-medium">{strings.login.description}</p>
                {" "}
                {displayError && (
                    <Alert
                        className="mb-6"
                        variant={AlertVariantEnum.ERROR}
                        onClose={dismissErrorHandler}
                    >
                        {displayError}
                    </Alert>
                )}
                <form
                    className="space-y-5"
                    onSubmit={submitHandler}
                >
                    <Input
                        hasError={!!displayError}
                        label={strings.login.emailLabel}
                        placeholder={strings.login.emailPlaceholder}
                        type={InputTypeEnum.EMAIL}
                        value={email}
                        onChange={(e) => {
                            const { target: { value } } = e;

                            setEmail(value);

                            setValidationError("");
                        }}
                    />
                    <Input
                        hasError={!!displayError}
                        label={strings.login.passwordLabel}
                        placeholder={strings.login.passwordPlaceholder}
                        type={InputTypeEnum.PASSWORD}
                        value={password}
                        isShowPasswordToggle
                        onChange={(e) => {
                            const { target: { value } } = e;

                            setPassword(value);

                            setValidationError("");
                        }}
                    />
                    <div
                        className="
                            flex
                            items-center
                            justify-between
                            text-sm
                        "
                    >
                        <span className="text-text-secondary">{strings.login.forgotPassword}</span>
                        <Button
                            size={ButtonSizeEnum.SM}
                            type={ButtonTypeEnum.BUTTON}
                            variant={ButtonVariantEnum.LINK}
                            onClick={() => navigate(routes.forgotPassword)}
                        >
                            {strings.login.forgotPasswordLink}
                        </Button>
                    </div>
                    <Button
                        isLoading={isLoading}
                        type={ButtonTypeEnum.SUBMIT}
                        isFullWidth
                    >
                        {strings.login.submitButton}
                    </Button>
                </form>
            </div>
        </AuthLayout>
    );
};
