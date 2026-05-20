export interface ApiResponse<T = unknown> {
    success: boolean;
    message: string;
    data?: T;
    meta?: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
}
export interface ApiError {
    success: false;
    message: string;
    errors?: Record<string, string[]>;
    traceId?: string;
}
export declare function success<T>(message: string, data?: T, meta?: ApiResponse["meta"]): ApiResponse<T>;
export declare function error(message: string, errors?: Record<string, string[]>, traceId?: string): ApiError;
