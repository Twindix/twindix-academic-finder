import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { Alert, Button, Input } from "@/atoms";
import { routes, strings } from "@/constants";
import { useAuth } from "@/hooks";
import { AuthLayout } from "@/layouts";
import { validateLoginFormHandler } from "@/utils";

export const Login = () => {
    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const [validationError, setValidationError] = useState("");

    const navigate = useNavigate();

    const [searchParams] = useSearchParams();

    const {
        clearError,
        error,
        isLoading,
        login,
    } = useAuth();

    const returnUrl = searchParams.get("returnUrl") || routes.code;

    const displayError = validationError || error;

    const submitHandler = async (e: React.FormEvent) => {
        e.preventDefault();

        setValidationError("");

        clearError();

        const validation = validateLoginFormHandler(
            email,
            password,
        );

        if (!validation.isValid) {
            setValidationError(validation.error || strings.errors.checkInput);

            return;
        }

        try {
            await login(
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

        clearError();
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
                        variant="error"
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
                        error={!!displayError}
                        label={strings.login.emailLabel}
                        placeholder={strings.login.emailPlaceholder}
                        type="email"
                        value={email}
                        onChange={(e) => {
                            const { target: { value } } = e;

                            setEmail(value);

                            setValidationError("");
                        }}
                    />
                    <Input
                        error={!!displayError}
                        label={strings.login.passwordLabel}
                        placeholder={strings.login.passwordPlaceholder}
                        type="password"
                        value={password}
                        showPasswordToggle
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
                            size="sm"
                            type="button"
                            variant="link"
                            onClick={() => navigate(routes.forgotPassword)}
                        >
                            {strings.login.forgotPasswordLink}
                        </Button>
                    </div>
                    <Button
                        loading={isLoading}
                        type="submit"
                        fullWidth
                    >
                        {strings.login.submitButton}
                    </Button>
                </form>
            </div>
        </AuthLayout>
    );
};
