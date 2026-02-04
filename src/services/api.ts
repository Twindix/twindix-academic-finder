import { apiEndpoints, strings } from "@/constants";
import { HttpStatusCodeEnum, JobStatusEnum, LanguageEnum } from "@/enums";
import type {
    AcceptInvitationDataInterface,
    ApiLoginResponseInterface,
    ApiProcessResponseInterface,
    ApiRecommendedJobInterface,
    ApiStatusResponseInterface,
    ApiUserInterface,
    ChatResultInterface,
    ForgotPasswordResponseInterface,
    LoginResponseInterface,
    ProcessResponseInterface,
    RecommendedJobInterface,
    ResetPasswordResponseInterface,
    StatusResponseInterface,
    UpdateCompanyProfileDataInterface,
    UserInterface,
} from "@/interfaces";
import {
    axiosClient,
    getTokenHandler,
    removeTokenHandler,
    setTokenHandler,
} from "@/services";

const formatRecommendedJobsToMarkdownHandler = (jobs: RecommendedJobInterface[]): string => jobs.map((
    {
        faculty,
        major1,
        major2,
        major3,
        reasoning,
    },
    index,
) => `## ${index + 1}. ${faculty}${strings.result.recommendedMajorsLabel}${major1}
- ${major2}
- ${major3}${strings.result.whyFitsYouLabel}${reasoning}`).join("\n\n---\n\n");

class ApiServiceClass {
    getTokenHandler(): string | null {
        return getTokenHandler();
    }

    private transformUserHandler(apiUser: ApiUserInterface): UserInterface {
        const {
            company_name, // eslint-disable-line
            created_at, // eslint-disable-line
            email,
            id,
            name,
            phone,
            updated_at, // eslint-disable-line
        } = apiUser;

        return {
            companyName: company_name,
            createdAt: created_at,
            email: email,
            id: id,
            name: name,
            phone: phone,
            updatedAt: updated_at,
        };
    }

    private transformRecommendedJobHandler(apiJob: ApiRecommendedJobInterface): RecommendedJobInterface {
        const {
            faculty,
            major_1, // eslint-disable-line
            major_2, // eslint-disable-line
            major_3, // eslint-disable-line
            reasoning,
        } = apiJob;

        return {
            faculty: faculty,
            major1: major_1,
            major2: major_2,
            major3: major_3,
            reasoning: reasoning,
        };
    }

    async loginHandler(email: string, password: string): Promise<LoginResponseInterface> {
        const response = await axiosClient.post<ApiLoginResponseInterface>(
            apiEndpoints.auth.login,
            {
                email,
                password,
            },
        );

        setTokenHandler(response.data.token);

        return {
            token: response.data.token,
            tokenType: response.data.token_type,
            user: this.transformUserHandler(response.data.user),
        };
    }

    async logoutHandler(): Promise<void> {
        try {
            await axiosClient.post(apiEndpoints.auth.logout);
        } finally {
            removeTokenHandler();
        }
    }

    async getCurrentUserHandler(): Promise<UserInterface> {
        const response = await axiosClient.get<ApiUserInterface>(apiEndpoints.auth.me);

        return this.transformUserHandler(response.data);
    }

    async refreshTokenHandler(): Promise<{
        token: string,
        tokenType: string,
    }> {
        const response = await axiosClient.post<{
            token: string,
            token_type: string,
        }>(apiEndpoints.auth.refresh);

        setTokenHandler(response.data.token);

        return {
            token: response.data.token,
            tokenType: response.data.token_type,
        };
    }

    async forgotPasswordHandler(email: string): Promise<ForgotPasswordResponseInterface> {
        const response = await axiosClient.post<{ message: string }>(
            apiEndpoints.auth.forgotPassword,
            { email },
        );

        return { message: response.data.message };
    }

    async resetPasswordHandler(
        token: string,
        email: string,
        password: string,
        passwordConfirmation: string,
    ): Promise<ResetPasswordResponseInterface> {
        const response = await axiosClient.post<{ message: string }>(
            apiEndpoints.auth.resetPassword,
            {
                email,
                password,
                password_confirmation: passwordConfirmation, // eslint-disable-line
                token,
            },
        );

        return { message: response.data.message };
    }

    async acceptInvitationHandler(token: string, data: AcceptInvitationDataInterface): Promise<{ message: string }> {
        const {
            companyName,
            email,
            name,
            password,
            passwordConfirmation,
            phone,
        } = data;

        const response = await axiosClient.post<{ message: string }>(
            `${apiEndpoints.invitations.accept}/${token}`,
            {
                company_name: companyName, // eslint-disable-line
                email: email,
                name: name,
                password: password,
                password_confirmation: passwordConfirmation, // eslint-disable-line
                phone: phone,
            },
        );

        return { message: response.data.message };
    }

    async processExamCodeHandler(examCode: string): Promise<ProcessResponseInterface> {
        try {
            const response = await axiosClient.post<ApiProcessResponseInterface>(
                apiEndpoints.exam.process,
                { exam_code: examCode }, // eslint-disable-line
            );

            return {
                jobId: response.data.data.job_id,
                success: true,
            };
        } catch (error) {
            const message = error instanceof Error ? error.message : strings.errors.genericError;

            if (message.includes(HttpStatusCodeEnum.NOT_FOUND) || message.toLowerCase().includes(strings.common.notFound)) {
                return {
                    error: strings.errors.examNotFound,
                    success: false,
                };
            }

            if (message.includes(HttpStatusCodeEnum.UNPROCESSABLE_ENTITY) || message.toLowerCase().includes(strings.common.invalid)) {
                return {
                    error: strings.errors.invalidExamCode,
                    success: false,
                };
            }

            return {
                error: message,
                success: false,
            };
        }
    }

    async getExamStatusHandler(
        jobId: string,
        examCode: string,
        userName: string,
        lang?: string,
    ): Promise<StatusResponseInterface> {
        try {
            const url = lang === LanguageEnum.AR ? `${apiEndpoints.exam.status}/${jobId}?lang=${LanguageEnum.AR}` : `${apiEndpoints.exam.status}/${jobId}`;

            const headers = lang === LanguageEnum.AR ? { "Accept-Language": LanguageEnum.AR } : {};

            const response = await axiosClient.get<ApiStatusResponseInterface>(
                url,
                { headers },
            );

            const { data } = response.data;

            if (data.status === JobStatusEnum.COMPLETED && data.result) {
                const transformedJobs = data.result.recommended_jobs.map((job) => this.transformRecommendedJobHandler(job));

                const chatResult: ChatResultInterface = {
                    code: examCode,
                    content: formatRecommendedJobsToMarkdownHandler(transformedJobs),
                    id: crypto.randomUUID(),
                    recommendedJobs: transformedJobs,
                    userName,
                };

                return {
                    currentStep: data.current_step,
                    progress: data.progress,
                    result: chatResult,
                    status: data.status,
                    success: true,
                };
            }

            if (data.status === JobStatusEnum.FAILED) {
                return {
                    currentStep: data.current_step,
                    error: data.error_message || strings.errors.processingFailed,
                    progress: data.progress,
                    status: data.status,
                    success: false,
                };
            }

            return {
                currentStep: data.current_step,
                progress: data.progress,
                status: data.status,
                success: true,
            };
        } catch (error) {
            const message = error instanceof Error ? error.message : strings.errors.genericError;

            if (message.includes(HttpStatusCodeEnum.NOT_FOUND) || message.toLowerCase().includes(strings.common.notFound)) {
                return {
                    currentStep: "",
                    error: strings.errors.jobNotFound,
                    progress: 0,
                    status: JobStatusEnum.FAILED,
                    success: false,
                };
            }

            if (message.includes(HttpStatusCodeEnum.UNPROCESSABLE_ENTITY) || message.toLowerCase().includes(strings.common.invalid)) {
                return {
                    currentStep: "",
                    error: strings.errors.invalidJobId,
                    progress: 0,
                    status: JobStatusEnum.FAILED,
                    success: false,
                };
            }

            return {
                currentStep: "",
                error: message,
                progress: 0,
                status: JobStatusEnum.FAILED,
                success: false,
            };
        }
    }

    async getCompanyProfileHandler(): Promise<{
        companyName: string,
        name: string,
        phone: string,
    }> {
        const response = await axiosClient.get<{
            company_name: string,
            name: string,
            phone: string,
        }>(apiEndpoints.company.profile);

        return {
            companyName: response.data.company_name,
            name: response.data.name,
            phone: response.data.phone,
        };
    }

    async updateCompanyProfileHandler(data: UpdateCompanyProfileDataInterface): Promise<{ message: string }> {
        const {
            companyName,
            name,
            phone,
        } = data;

        const response = await axiosClient.put<{ message: string }>(
            apiEndpoints.company.profile,
            {
                company_name: companyName, // eslint-disable-line
                name: name,
                phone: phone,
            },
        );

        return response.data;
    }
}

export const api = new ApiServiceClass();
