// User types
export interface User {
    id: number;
    name: string;
    email: string;
    company_name?: string;
    phone?: string;
    created_at?: string;
    updated_at?: string;
}

// Auth types
export interface LoginRequest {
    email: string;
    password: string;
}

export interface LoginResponse {
    user: User;
    token: string;
    token_type: 'Bearer';
}

export interface AuthState {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    fetchUser: () => Promise<void>;
    setUser: (user: User | null) => void;
}

// Exam/Code types
export interface ExamResultRequest {
    exam_code: string;
}

export interface ExamResultResponse {
    job_title: string;
    industry: string;
    seniority: string;
    selected_branches: SelectedBranch[];
    environment_status: EnvironmentStatus[];
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

// Chat result for display
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

// API response types
export interface ApiError {
    message: string;
    errors?: Record<string, string[]>;
}

export interface CodeSubmitResponse {
    success: boolean;
    data?: ChatResult;
    error?: string;
}

// Page status
export type CodePageStatus = 'idle' | 'loading' | 'success' | 'error';
