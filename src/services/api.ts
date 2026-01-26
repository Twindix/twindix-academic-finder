import { axiosClient, setToken, removeToken, getToken } from './axios-client';
import { apiEndpoints, strings } from '@/constants';
import type {
    User,
    LoginResponse,
    ForgotPasswordResponse,
    ResetPasswordResponse,
    ChatResult,
    ProcessResponse,
    StatusResponse,
    ApiLoginResponse,
    ApiProcessResponse,
    ApiStatusResponse,
    RecommendedJob,
} from '@/interfaces';

function formatRecommendedJobsToMarkdown(jobs: RecommendedJob[]): string {
    return jobs.map((job, index) => `## ${index + 1}. ${job.faculty}

**Recommended Majors:**
- ${job.major1}
- ${job.major2}
- ${job.major3}

**Why this fits you:**

${job.reasoning}`).join('\n\n---\n\n');
}

class ApiService {
    getToken(): string | null {
        return getToken();
    }

    private transformUser(apiUser: ApiLoginResponse['user']): User {
        return {
            id: apiUser.id,
            name: apiUser.name,
            email: apiUser.email,
            companyName: apiUser.company_name,
            phone: apiUser.phone,
            createdAt: apiUser.created_at,
            updatedAt: apiUser.updated_at,
        };
    }

    private transformRecommendedJob(apiJob: {
        faculty: string,
        major_1: string,
        major_2: string,
        major_3: string,
        reasoning: string,
    }): RecommendedJob {
        return {
            faculty: apiJob.faculty,
            major1: apiJob.major_1,
            major2: apiJob.major_2,
            major3: apiJob.major_3,
            reasoning: apiJob.reasoning,
        };
    }

    async login(email: string, password: string): Promise<LoginResponse> {
        const response = await axiosClient.post<ApiLoginResponse>(
            apiEndpoints.auth.login,
            { email, password }
        );

        setToken(response.data.token);

        return {
            user: this.transformUser(response.data.user),
            token: response.data.token,
            tokenType: response.data.token_type,
        };
    }

    async logout(): Promise<void> {
        try {
            await axiosClient.post(apiEndpoints.auth.logout);
        } finally {
            removeToken();
        }
    }

    async getCurrentUser(): Promise<User> {
        const response = await axiosClient.get<ApiLoginResponse['user']>(apiEndpoints.auth.me);
        return this.transformUser(response.data);
    }

    async refreshToken(): Promise<{ token: string; tokenType: string }> {
        const response = await axiosClient.post<{ token: string; token_type: string }>(
            apiEndpoints.auth.refresh
        );

        setToken(response.data.token);

        return {
            token: response.data.token,
            tokenType: response.data.token_type,
        };
    }

    async forgotPassword(email: string): Promise<ForgotPasswordResponse> {
        const response = await axiosClient.post<{ message: string }>(
            apiEndpoints.auth.forgotPassword,
            { email }
        );

        return {
            message: response.data.message,
        };
    }

    async resetPassword(
        token: string,
        email: string,
        password: string,
        passwordConfirmation: string
    ): Promise<ResetPasswordResponse> {
        const response = await axiosClient.post<{ message: string }>(
            apiEndpoints.auth.resetPassword,
            {
                token,
                email,
                password,
                password_confirmation: passwordConfirmation,
            }
        );

        return {
            message: response.data.message,
        };
    }

    async acceptInvitation(
        token: string,
        data: {
            name: string;
            email: string;
            companyName: string;
            phone: string;
            password: string;
            passwordConfirmation: string;
        }
    ): Promise<{ message: string }> {
        const response = await axiosClient.post<{ message: string }>(
            `${apiEndpoints.invitations.accept}/${token}`,
            {
                name: data.name,
                email: data.email,
                company_name: data.companyName,
                phone: data.phone,
                password: data.password,
                password_confirmation: data.passwordConfirmation,
            }
        );

        return {
            message: response.data.message,
        };
    }

    async processExamCode(examCode: string): Promise<ProcessResponse> {
        try {
            const response = await axiosClient.post<ApiProcessResponse>(
                apiEndpoints.exam.process,
                { exam_code: examCode }
            );

            return {
                success: true,
                jobId: response.data.data.job_id,
            };
        } catch (error) {
            const message = error instanceof Error ? error.message : strings.errors.genericError;

            if (message.includes('404') || message.toLowerCase().includes('not found')) {
                return { success: false, error: strings.errors.examNotFound };
            }

            if (message.includes('422') || message.toLowerCase().includes('invalid')) {
                return { success: false, error: strings.errors.invalidExamCode };
            }

            return { success: false, error: message };
        }
    }

    async getExamStatus(jobId: string, examCode: string, userName: string): Promise<StatusResponse> {
        try {
            const response = await axiosClient.get<ApiStatusResponse>(
                `${apiEndpoints.exam.status}/${jobId}`
            );

            const { data } = response.data;

            if (data.status === 'completed' && data.result) {
                const transformedJobs = data.result.recommended_jobs.map(
                    (job) => this.transformRecommendedJob(job)
                );

                const chatResult: ChatResult = {
                    id: crypto.randomUUID(),
                    userName,
                    code: examCode,
                    content: formatRecommendedJobsToMarkdown(transformedJobs),
                    recommendedJobs: transformedJobs,
                };

                return {
                    success: true,
                    status: data.status,
                    progress: data.progress,
                    currentStep: data.current_step,
                    result: chatResult,
                };
            }

            if (data.status === 'failed') {
                return {
                    success: false,
                    status: data.status,
                    progress: data.progress,
                    currentStep: data.current_step,
                    error: data.error_message || strings.errors.processingFailed,
                };
            }

            return {
                success: true,
                status: data.status,
                progress: data.progress,
                currentStep: data.current_step,
            };
        } catch (error) {
            const message = error instanceof Error ? error.message : strings.errors.genericError;

            if (message.includes('404') || message.toLowerCase().includes('not found')) {
                return {
                    success: false,
                    status: 'failed',
                    progress: 0,
                    currentStep: '',
                    error: strings.errors.jobNotFound,
                };
            }

            if (message.includes('422') || message.toLowerCase().includes('invalid')) {
                return {
                    success: false,
                    status: 'failed',
                    progress: 0,
                    currentStep: '',
                    error: strings.errors.invalidJobId,
                };
            }

            return {
                success: false,
                status: 'failed',
                progress: 0,
                currentStep: '',
                error: message,
            };
        }
    }

    async getCompanyProfile(): Promise<{ name: string; companyName: string; phone: string }> {
        const response = await axiosClient.get<{ name: string; company_name: string; phone: string }>(
            apiEndpoints.company.profile
        );

        return {
            name: response.data.name,
            companyName: response.data.company_name,
            phone: response.data.phone,
        };
    }

    async updateCompanyProfile(data: {
        name?: string;
        companyName?: string;
        phone?: string;
    }): Promise<{ message: string }> {
        const response = await axiosClient.put<{ message: string }>(
            apiEndpoints.company.profile,
            {
                name: data.name,
                company_name: data.companyName,
                phone: data.phone,
            }
        );

        return response.data;
    }
}

export const api = new ApiService();
