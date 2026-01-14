import { axiosClient, setToken, removeToken, getToken } from './axios-client';
import { API_ENDPOINTS } from '@/config';
import type {
    User,
    LoginResponse,
    ChatResult,
    CodeSubmitResponse,
    ApiLoginResponse,
    ApiExamResultResponse,
} from '@/interfaces';

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

    async login(email: string, password: string): Promise<LoginResponse> {
        const response = await axiosClient.post<ApiLoginResponse>(
            API_ENDPOINTS.AUTH.LOGIN,
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
            await axiosClient.post(API_ENDPOINTS.AUTH.LOGOUT);
        } finally {
            removeToken();
        }
    }

    async getCurrentUser(): Promise<User> {
        const response = await axiosClient.get<ApiLoginResponse['user']>(API_ENDPOINTS.AUTH.ME);
        return this.transformUser(response.data);
    }

    async refreshToken(): Promise<{ token: string; tokenType: string }> {
        const response = await axiosClient.post<{ token: string; token_type: string }>(
            API_ENDPOINTS.AUTH.REFRESH
        );

        setToken(response.data.token);

        return {
            token: response.data.token,
            tokenType: response.data.token_type,
        };
    }

    async submitExamCode(examCode: string): Promise<CodeSubmitResponse> {
        try {
            const response = await axiosClient.post<ApiExamResultResponse>(
                API_ENDPOINTS.EXAM.PROCESS,
                { exam_code: examCode }
            );

            const data = response.data;

            const chatResult: ChatResult = {
                id: crypto.randomUUID(),
                userName: '',
                jobTitle: data.job_title,
                industry: data.industry,
                seniority: data.seniority,
                code: examCode,
                branches: data.selected_branches.map((branch: { id: number, name: string, description?: string }) => ({
                    id: branch.id,
                    name: branch.name,
                    description: branch.description,
                })),
                environmentStatus: data.environment_status.map((env: { id: number, name: string, status: string, value?: number }) => ({
                    id: env.id,
                    name: env.name,
                    status: env.status,
                    value: env.value,
                })),
                content: this.formatResultContent(data),
            };

            return { success: true, data: chatResult };
        } catch (error) {
            const message = error instanceof Error ? error.message : 'An error occurred';

            if (message.includes('404') || message.toLowerCase().includes('not found')) {
                return { success: false, error: 'Exam not found' };
            }

            if (message.includes('422') || message.toLowerCase().includes('invalid')) {
                return { success: false, error: 'Invalid exam code' };
            }

            return { success: false, error: message };
        }
    }

    private formatResultContent(data: ApiExamResultResponse): string[] {
        const content: string[] = [];

        content.push(`Job Title: ${data.job_title}`);
        content.push(`Industry: ${data.industry}`);
        content.push(`Seniority Level: ${data.seniority}`);

        if (data.selected_branches.length > 0) {
            content.push('');
            content.push('Selected Career Branches:');
            data.selected_branches.forEach((branch) => {
                const description = branch.description ? ` - ${branch.description}` : '';
                content.push(`- ${branch.name}${description}`);
            });
        }

        if (data.environment_status.length > 0) {
            content.push('');
            content.push('Environment Status:');
            data.environment_status.forEach((env) => {
                const value = env.value !== undefined ? ` (${env.value}%)` : '';
                content.push(`- ${env.name}: ${env.status}${value}`);
            });
        }

        return content;
    }

    async getCompanyProfile(): Promise<{ name: string; companyName: string; phone: string }> {
        const response = await axiosClient.get<{ name: string; company_name: string; phone: string }>(
            API_ENDPOINTS.COMPANY.PROFILE
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
            API_ENDPOINTS.COMPANY.PROFILE,
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
