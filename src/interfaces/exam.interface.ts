/**
 * Exam result request interface
 */
export interface ExamResultRequest {
    examCode: string;
}

/**
 * Selected branch interface
 */
export interface SelectedBranch {
    id: number;
    name: string;
    description?: string;
}

/**
 * Environment status interface
 */
export interface EnvironmentStatus {
    id: number;
    name: string;
    status: string;
    value?: number;
}

/**
 * Exam result response interface (from API)
 */
export interface ExamResultResponse {
    jobTitle: string;
    industry: string;
    seniority: string;
    selectedBranches: SelectedBranch[];
    environmentStatus: EnvironmentStatus[];
}

/**
 * Chat result interface (for display)
 */
export interface ChatResult {
    id: string;
    userName: string;
    jobTitle: string;
    industry: string;
    seniority: string;
    content: string[];
    code: string;
    branches: SelectedBranch[];
    environmentStatus: EnvironmentStatus[];
}

/**
 * Code submit response interface
 */
export interface CodeSubmitResponse {
    success: boolean;
    data?: ChatResult;
    error?: string;
}
