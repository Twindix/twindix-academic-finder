import type { JobStatusType } from "@/types";

export interface AcceptInvitationDataInterface {
    companyName: string,
    email: string,
    name: string,
    password: string,
    passwordConfirmation: string,
    phone: string,
}

export interface ApiErrorInterface {
    errors?: Record<string, string[]>,
    message: string,
}

export interface ValidationResultInterface {
    error: string | null,
    isValid: boolean,
}

export interface ApiUserInterface {
    company_name?: string, // eslint-disable-line
    created_at?: string, // eslint-disable-line
    email: string,
    id: number,
    name: string,
    phone?: string,
    updated_at?: string, // eslint-disable-line
}

export interface ApiLoginResponseInterface {
    token: string,
    token_type: "Bearer", // eslint-disable-line
    user: ApiUserInterface,
}

export interface ApiProcessResponseInterface {
    data: {
        estimated_time_seconds: number,
        job_id: string,
        status_url: string,
    },
    message: string,
    success: boolean,
}

export interface RecommendedJobInterface {
    faculty: string,
    major1: string,
    major2: string,
    major3: string,
    reasoning: string,
}

export interface ApiRecommendedJobInterface {
    faculty: string,
    major_1: string, // eslint-disable-line
    major_2: string, // eslint-disable-line
    major_3: string, // eslint-disable-line
    reasoning: string,
}

export interface RecommendedJobsResultInterface { recommended_jobs: ApiRecommendedJobInterface[] }

export interface UpdateCompanyProfileDataInterface {
    companyName?: string,
    name?: string,
    phone?: string,
}

export interface ApiStatusResponseInterface {
    data: {
        completed_at: string | null,
        current_step: string,
        error_message: string | null,
        progress: number,
        result: RecommendedJobsResultInterface | null,
        started_at: string,
        status: JobStatusType,
    },
    success: boolean,
}
