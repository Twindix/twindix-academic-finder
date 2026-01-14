import axiosClient, { setToken, removeToken, getToken } from './axios-client';
import { API_ENDPOINTS } from '@/config';
import type {
    User,
    LoginResponse,
    ExamResultResponse,
    ChatResult,
    CodeSubmitResponse,
} from '@/types';

class ApiService {
    /**
     * Get the current token
     */
    getToken(): string | null {
        return getToken();
    }

    /**
     * POST /api/auth/login
     * Authenticate user with email and password
     */
    async login(email: string, password: string): Promise<LoginResponse> {
        const response = await axiosClient.post<LoginResponse>(
            API_ENDPOINTS.AUTH.LOGIN,
            { email, password }
        );

        // Store token in cookie
        setToken(response.data.token);

        return response.data;
    }

    /**
     * POST /api/auth/logout
     * Logout current user (invalidate token)
     */
    async logout(): Promise<void> {
        try {
            await axiosClient.post(API_ENDPOINTS.AUTH.LOGOUT);
        } finally {
            // Clear token regardless of response
            removeToken();
        }
    }

    /**
     * GET /api/auth/me
     * Get current authenticated user
     */
    async getCurrentUser(): Promise<User> {
        const response = await axiosClient.get<User>(API_ENDPOINTS.AUTH.ME);
        return response.data;
    }

    /**
     * POST /api/auth/refresh
     * Refresh authentication token
     */
    async refreshToken(): Promise<{ token: string; token_type: string }> {
        const response = await axiosClient.post<{ token: string; token_type: string }>(
            API_ENDPOINTS.AUTH.REFRESH
        );

        // Update stored token
        setToken(response.data.token);

        return response.data;
    }

    /**
     * POST /api/exam-results/process
     * Submit exam code and get AI analysis results
     */
    async submitExamCode(examCode: string): Promise<CodeSubmitResponse> {
        try {
            const response = await axiosClient.post<ExamResultResponse>(
                API_ENDPOINTS.EXAM.PROCESS,
                { exam_code: examCode }
            );

            const data = response.data;

            // Transform API response to ChatResult format
            const chatResult: ChatResult = {
                id: crypto.randomUUID(),
                userName: '', // Will be filled from user state
                jobTitle: data.job_title,
                industry: data.industry,
                seniority: data.seniority,
                code: examCode,
                branches: data.selected_branches,
                environmentStatus: data.environment_status,
                content: this.formatResultContent(data),
            };

            return { success: true, data: chatResult };
        } catch (error) {
            const message = error instanceof Error ? error.message : 'An error occurred';

            // Handle specific error cases
            if (message.includes('404') || message.toLowerCase().includes('not found')) {
                return { success: false, error: 'Exam not found' };
            }

            if (message.includes('422') || message.toLowerCase().includes('invalid')) {
                return { success: false, error: 'Invalid exam code' };
            }

            return { success: false, error: message };
        }
    }

    /**
     * Format exam results into readable content
     */
    private formatResultContent(data: ExamResultResponse): string[] {
        const content: string[] = [];

        // Job information
        content.push(`Job Title: ${data.job_title}`);
        content.push(`Industry: ${data.industry}`);
        content.push(`Seniority Level: ${data.seniority}`);

        // Selected branches
        if (data.selected_branches.length > 0) {
            content.push('');
            content.push('Selected Career Branches:');
            data.selected_branches.forEach((branch) => {
                const description = branch.description ? ` - ${branch.description}` : '';
                content.push(`- ${branch.name}${description}`);
            });
        }

        // Environment status
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

    /**
     * GET /api/company/profile
     * Get company profile (for company users)
     */
    async getCompanyProfile(): Promise<{ name: string; company_name: string; phone: string }> {
        const response = await axiosClient.get<{ name: string; company_name: string; phone: string }>(
            API_ENDPOINTS.COMPANY.PROFILE
        );
        return response.data;
    }

    /**
     * PUT /api/company/profile
     * Update company profile
     */
    async updateCompanyProfile(data: {
        name?: string;
        company_name?: string;
        phone?: string;
    }): Promise<{ message: string }> {
        const response = await axiosClient.put<{ message: string }>(
            API_ENDPOINTS.COMPANY.PROFILE,
            data
        );
        return response.data;
    }
}

// Export singleton instance
export const api = new ApiService();
