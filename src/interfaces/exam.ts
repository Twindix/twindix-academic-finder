import type { RecommendedJobInterface } from "@/interfaces";
import type { JobStatusType } from "@/types";

export interface ChatResultInterface {
    code: string,
    content: string,
    id: string,
    recommendedJobs: RecommendedJobInterface[],
    userName: string,
}

export interface ProcessResponseInterface {
    error?: string,
    jobId?: string,
    success: boolean,
}

export interface StatusResponseInterface {
    currentStep: string,
    error?: string,
    progress: number,
    result?: ChatResultInterface,
    status: JobStatusType,
    success: boolean,
}
