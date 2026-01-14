export interface ApiError {
    message: string;
    errors?: Record<string, string[]>;
}

export interface ValidationResult {
    isValid: boolean;
    error: string | null;
}

export interface ApiLoginResponse {
    user: {
        id: number;
        name: string;
        email: string;
        company_name?: string;
        phone?: string;
        created_at?: string;
        updated_at?: string;
    };
    token: string;
    token_type: 'Bearer';
}

export interface ApiExamResultResponse {
    job_title: string;
    industry: string;
    seniority: string;
    selected_branches: Array<{
        id: number;
        name: string;
        description?: string;
    }>;
    environment_status: Array<{
        id: number;
        name: string;
        status: string;
        value?: number;
    }>;
}
