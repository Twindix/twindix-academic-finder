export interface ExamResultRequest {
    examCode: string;
}

export interface SelectedBranch {
    id: number;
    name: string;
    description?: string;
}

export interface EnvironmentStatus {
    id: number;
    name: string;
    status: string;
    value?: number;
}

export interface ExamResultResponse {
    jobTitle: string;
    industry: string;
    seniority: string;
    selectedBranches: SelectedBranch[];
    environmentStatus: EnvironmentStatus[];
}

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

export interface CodeSubmitResponse {
    success: boolean;
    data?: ChatResult;
    error?: string;
}
