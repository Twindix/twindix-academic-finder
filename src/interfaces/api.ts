export interface ApiError {
    message: string,
    errors?: Record<string, string[]>,
}

export interface ValidationResult {
    isValid: boolean,
    error: string | null,
}

export interface ApiLoginResponse {
    user: {
        id: number,
        name: string,
        email: string,
        company_name?: string,
        phone?: string,
        created_at?: string,
        updated_at?: string,
    },
    token: string,
    token_type: 'Bearer',
}

export interface ApiProcessResponse {
    success: boolean,
    message: string,
    data: {
        job_id: string,
        status_url: string,
        estimated_time_seconds: number,
    },
}

export interface RecommendedJob {
    faculty: string,
    major1: string,
    major2: string,
    major3: string,
    reasoning: string,
}

export interface ApiRecommendedJob {
    faculty: string,
    major_1: string,
    major_2: string,
    major_3: string,
    reasoning: string,
}

export interface RecommendedJobsResult {
    recommended_jobs: ApiRecommendedJob[],
}

export interface ApiStatusResponse {
    success: boolean,
    data: {
        status: 'pending' | 'processing' | 'completed' | 'failed',
        progress: number,
        current_step: string,
        started_at: string,
        result: RecommendedJobsResult | null,
        completed_at: string | null,
        error_message: string | null,
    },
}
