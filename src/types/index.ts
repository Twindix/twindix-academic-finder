export type CodePageStatus = 'idle' | 'loading' | 'success' | 'error';

export type AlertVariant = 'error' | 'warning' | 'success' | 'info';

export type ButtonVariant = 'primary' | 'muted' | 'danger';

export type LogoSize = 'sm' | 'md' | 'lg';

export type GradientVariant = 'loading' | 'error';

export type JobStatus = 'pending' | 'processing' | 'completed' | 'failed';

export enum JOB_STATUS {
    PENDING = 'pending',
    PROCESSING = 'processing',
    COMPLETED = 'completed',
    FAILED = 'failed',
}
