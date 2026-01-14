import type {
    User,
    LoginResponse,
    ExamResultResponse,
    ChatResult,
    CodeSubmitResponse,
} from '@/types';

// API base URL from environment
const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://acdmicback.twindix.com/api';

class ApiService {
    private token: string | null = null;

    /**
     * Set the authentication token for API requests
     */
    setToken(token: string | null) {
        this.token = token;
    }

    /**
     * Get the current token
     */
    getToken(): string | null {
        return this.token;
    }

    /**
     * Build request headers with optional authentication
     */
    private getHeaders(includeAuth: boolean = true): HeadersInit {
        const headers: HeadersInit = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        };

        if (includeAuth && this.token) {
            headers['Authorization'] = `Bearer ${this.token}`;
        }

        return headers;
    }

    /**
     * Handle API response and errors
     */
    private async handleResponse<T>(response: Response): Promise<T> {
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            const errorMessage = errorData.message || `HTTP error ${response.status}`;
            throw new Error(errorMessage);
        }
        return response.json();
    }

    /**
     * POST /api/auth/login
     * Authenticate user with email and password
     */
    async login(email: string, password: string): Promise<LoginResponse> {
        const response = await fetch(`${API_BASE_URL}/auth/login`, {
            method: 'POST',
            headers: this.getHeaders(false),
            body: JSON.stringify({ email, password }),
        });

        const data = await this.handleResponse<LoginResponse>(response);

        // Store token for subsequent requests
        this.setToken(data.token);

        return data;
    }

    /**
     * POST /api/auth/logout
     * Logout current user (invalidate token)
     */
    async logout(): Promise<void> {
        try {
            await fetch(`${API_BASE_URL}/auth/logout`, {
                method: 'POST',
                headers: this.getHeaders(),
            });
        } finally {
            // Clear token regardless of response
            this.setToken(null);
        }
    }

    /**
     * GET /api/auth/me
     * Get current authenticated user
     */
    async getCurrentUser(): Promise<User> {
        const response = await fetch(`${API_BASE_URL}/auth/me`, {
            method: 'GET',
            headers: this.getHeaders(),
        });

        return this.handleResponse<User>(response);
    }

    /**
     * POST /api/auth/refresh
     * Refresh authentication token
     */
    async refreshToken(): Promise<{ token: string; token_type: string }> {
        const response = await fetch(`${API_BASE_URL}/auth/refresh`, {
            method: 'POST',
            headers: this.getHeaders(),
        });

        const data = await this.handleResponse<{ token: string; token_type: string }>(response);

        // Update stored token
        this.setToken(data.token);

        return data;
    }

    /**
     * POST /api/exam-results/process
     * Submit exam code and get AI analysis results
     */
    async submitExamCode(examCode: string): Promise<CodeSubmitResponse> {
        try {
            const response = await fetch(`${API_BASE_URL}/exam-results/process`, {
                method: 'POST',
                headers: this.getHeaders(),
                body: JSON.stringify({ exam_code: examCode }),
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));

                if (response.status === 404) {
                    return { success: false, error: 'Exam not found' };
                }

                if (response.status === 422) {
                    return { success: false, error: errorData.message || 'Invalid exam code' };
                }

                return { success: false, error: errorData.message || 'An error occurred' };
            }

            const data = await response.json() as ExamResultResponse;

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
            return {
                success: false,
                error: error instanceof Error ? error.message : 'An error occurred',
            };
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
                content.push(`• ${branch.name}${description}`);
            });
        }

        // Environment status
        if (data.environment_status.length > 0) {
            content.push('');
            content.push('Environment Status:');
            data.environment_status.forEach((env) => {
                const value = env.value !== undefined ? ` (${env.value}%)` : '';
                content.push(`• ${env.name}: ${env.status}${value}`);
            });
        }

        return content;
    }

    /**
     * GET /api/company/profile
     * Get company profile (for company users)
     */
    async getCompanyProfile(): Promise<{ name: string; company_name: string; phone: string }> {
        const response = await fetch(`${API_BASE_URL}/company/profile`, {
            method: 'GET',
            headers: this.getHeaders(),
        });

        return this.handleResponse(response);
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
        const response = await fetch(`${API_BASE_URL}/company/profile`, {
            method: 'PUT',
            headers: this.getHeaders(),
            body: JSON.stringify(data),
        });

        return this.handleResponse(response);
    }
}

// Export singleton instance
export const api = new ApiService();
