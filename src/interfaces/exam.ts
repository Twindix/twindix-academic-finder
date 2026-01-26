import type { RecommendedJob } from './api';
import type { JobStatus } from '@/types';

export interface ChatResult {
    id: string,
    userName: string,
    code: string,
    content: string,
    recommendedJobs: RecommendedJob[],
}

export interface ProcessResponse {
    success: boolean,
    jobId?: string,
    error?: string,
}

export interface StatusResponse {
    success: boolean,
    status: JobStatus,
    progress: number,
    currentStep: string,
    result?: ChatResult,
    error?: string,
}
