import { axiosClient, setToken, removeToken, getToken } from './axios-client';
import { apiEndpoints } from '@/config';
import type {
    User,
    LoginResponse,
    ChatResult,
    ProcessResponse,
    StatusResponse,
    ApiLoginResponse,
    ApiProcessResponse,
    ApiStatusResponse,
    RecommendedJob,
} from '@/interfaces';

const demoResult = {
    recommendedJobs: [
        {
            faculty: 'Computing & Artificial Intelligence',
            major1: 'COMPUTER SCIENCE',
            major2: 'INFORMATION SYSTEMS',
            major3: 'COMPUTER ENGINEERING',
            reasoning: 'Your exceptional analytical thinking, systematic planning, and continuous learning skills make you a perfect fit for the Computing & Artificial Intelligence faculty. These majors will leverage your critical evaluation abilities to solve complex technical problems while allowing you to generate original ideas in cutting-edge fields like AI and software development. The structured nature of computer science aligns perfectly with your attention to detail and precision, while the rapidly evolving tech landscape satisfies your drive for continuous learning and innovation.',
        },
        {
            faculty: 'Engineering',
            major1: 'INDUSTRIAL AND MANUFACTURING ENGINEERING',
            major2: 'MECHANICAL ENGINEERING',
            major3: 'ELECTRICAL ENGINEERING',
            reasoning: 'Engineering is an ideal match for your strong analytical thinking, systematic planning, and attention to details. These majors require critical evaluation skills to optimize complex systems and processes, which aligns perfectly with your competencies. Your ability to engage in continuous learning will keep you at the forefront of technological advancement, while your creative thinking and generating original ideas will help you design innovative solutions to real-world engineering challenges.',
        },
        {
            faculty: 'Business',
            major1: 'BUSINESS ECONOMICS',
            major2: 'MANAGEMENT INFORMATION SYSTEMS',
            major3: 'FINANCE',
            reasoning: 'The Business faculty perfectly utilizes your analytical thinking and researching skills to analyze market trends and make strategic decisions. Your systematic planning and critical evaluation abilities are essential for developing sound business strategies and financial models. These majors value continuous learning to stay ahead in competitive markets, and your creative thinking will help you generate original ideas for innovative business solutions and entrepreneurial ventures.',
        },
        {
            faculty: 'Physical Sciences',
            major1: 'MATHEMATICS',
            major2: 'STATISTICS AND DECISION SCIENCE',
            major3: 'APPLIED MATHEMATICS',
            reasoning: 'Your analytical thinking and critical evaluation skills are the cornerstone of success in Physical Sciences. These majors require exceptional systematic planning and attention to details for complex problem-solving and research. The continuous learning aspect of these fields ensures you\'ll constantly engage with new theories and methodologies, while creative thinking helps you approach mathematical and statistical challenges from innovative angles.',
        },
        {
            faculty: 'Social Science',
            major1: 'ECONOMICS',
            major2: 'PSYCHOLOGY',
            major3: 'POLITICAL SCIENCE AND GOVERNMENT',
            reasoning: 'Social Science majors benefit tremendously from your analytical thinking and researching abilities to understand human behavior and societal patterns. Your critical evaluation skills help you analyze complex social phenomena and policy implications, while systematic planning supports rigorous research methodologies. These fields value continuous learning to stay current with evolving social dynamics, and your creative thinking enables innovative approaches to addressing social challenges.',
        },
    ],
};

function formatRecommendedJobsToMarkdown(jobs: RecommendedJob[]): string {
    return jobs.map((job, index) => `## ${index + 1}. ${job.faculty}

**Recommended Majors:**
- ${job.major1}
- ${job.major2}
- ${job.major3}

**Why this fits you:**

${job.reasoning}`).join('\n\n---\n\n');
}

class ApiService {
    getToken(): string | null {
        return getToken();
    }

    private transformUser(apiUser: ApiLoginResponse['user']): User {
        return {
            id: apiUser.id,
            name: apiUser.name,
            email: apiUser.email,
            companyName: apiUser.company_name,
            phone: apiUser.phone,
            createdAt: apiUser.created_at,
            updatedAt: apiUser.updated_at,
        };
    }

    private transformRecommendedJob(apiJob: {
        faculty: string,
        major_1: string,
        major_2: string,
        major_3: string,
        reasoning: string,
    }): RecommendedJob {
        return {
            faculty: apiJob.faculty,
            major1: apiJob.major_1,
            major2: apiJob.major_2,
            major3: apiJob.major_3,
            reasoning: apiJob.reasoning,
        };
    }

    async login(email: string, password: string): Promise<LoginResponse> {
        const response = await axiosClient.post<ApiLoginResponse>(
            apiEndpoints.auth.login,
            { email, password }
        );

        setToken(response.data.token);

        return {
            user: this.transformUser(response.data.user),
            token: response.data.token,
            tokenType: response.data.token_type,
        };
    }

    async logout(): Promise<void> {
        try {
            await axiosClient.post(apiEndpoints.auth.logout);
        } finally {
            removeToken();
        }
    }

    async getCurrentUser(): Promise<User> {
        const response = await axiosClient.get<ApiLoginResponse['user']>(apiEndpoints.auth.me);
        return this.transformUser(response.data);
    }

    async refreshToken(): Promise<{ token: string; tokenType: string }> {
        const response = await axiosClient.post<{ token: string; token_type: string }>(
            apiEndpoints.auth.refresh
        );

        setToken(response.data.token);

        return {
            token: response.data.token,
            tokenType: response.data.token_type,
        };
    }

    async processExamCode(examCode: string): Promise<ProcessResponse> {
        try {
            const response = await axiosClient.post<ApiProcessResponse>(
                apiEndpoints.exam.process,
                { exam_code: examCode }
            );

            return {
                success: true,
                jobId: response.data.data.job_id,
            };
        } catch (error) {
            const message = error instanceof Error ? error.message : 'An error occurred';

            if (message.includes('404') || message.toLowerCase().includes('not found')) {
                return { success: false, error: 'Exam not found' };
            }

            if (message.includes('422') || message.toLowerCase().includes('invalid')) {
                return { success: false, error: 'Invalid exam code' };
            }

            return { success: false, error: message };
        }
    }

    async getExamStatus(jobId: string, examCode: string, userName: string): Promise<StatusResponse> {
        try {
            const response = await axiosClient.get<ApiStatusResponse>(
                `${apiEndpoints.exam.status}/${jobId}`
            );

            const { data } = response.data;

            if (data.status === 'completed' && data.result) {
                const transformedJobs = data.result.recommended_jobs.map(
                    (job) => this.transformRecommendedJob(job)
                );

                const chatResult: ChatResult = {
                    id: crypto.randomUUID(),
                    userName,
                    code: examCode,
                    content: formatRecommendedJobsToMarkdown(transformedJobs),
                    recommendedJobs: transformedJobs,
                };

                return {
                    success: true,
                    status: data.status,
                    progress: data.progress,
                    currentStep: data.current_step,
                    result: chatResult,
                };
            }

            if (data.status === 'failed') {
                return {
                    success: false,
                    status: data.status,
                    progress: data.progress,
                    currentStep: data.current_step,
                    error: data.error_message || 'Processing failed',
                };
            }

            return {
                success: true,
                status: data.status,
                progress: data.progress,
                currentStep: data.current_step,
            };
        } catch (error) {
            const message = error instanceof Error ? error.message : 'An error occurred';

            if (message.includes('404') || message.toLowerCase().includes('not found')) {
                return {
                    success: false,
                    status: 'failed',
                    progress: 0,
                    currentStep: '',
                    error: 'Job not found',
                };
            }

            if (message.includes('422') || message.toLowerCase().includes('invalid')) {
                return {
                    success: false,
                    status: 'failed',
                    progress: 0,
                    currentStep: '',
                    error: 'Invalid job ID',
                };
            }

            return {
                success: false,
                status: 'failed',
                progress: 0,
                currentStep: '',
                error: message,
            };
        }
    }

    getDemoResult(examCode: string, userName: string): ChatResult {
        return {
            id: crypto.randomUUID(),
            userName,
            code: examCode,
            content: formatRecommendedJobsToMarkdown(demoResult.recommendedJobs),
            recommendedJobs: demoResult.recommendedJobs,
        };
    }

    async getCompanyProfile(): Promise<{ name: string; companyName: string; phone: string }> {
        const response = await axiosClient.get<{ name: string; company_name: string; phone: string }>(
            apiEndpoints.company.profile
        );

        return {
            name: response.data.name,
            companyName: response.data.company_name,
            phone: response.data.phone,
        };
    }

    async updateCompanyProfile(data: {
        name?: string;
        companyName?: string;
        phone?: string;
    }): Promise<{ message: string }> {
        const response = await axiosClient.put<{ message: string }>(
            apiEndpoints.company.profile,
            {
                name: data.name,
                company_name: data.companyName,
                phone: data.phone,
            }
        );

        return response.data;
    }
}

export const api = new ApiService();
