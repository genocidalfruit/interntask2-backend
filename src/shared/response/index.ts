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

export function success<T>(message: string, data?: T, meta?: ApiResponse["meta"]): ApiResponse<T> {
  return { success: true, message, data, meta };
}

export function error(message: string, errors?: Record<string, string[]>, traceId?: string): ApiError {
  return { success: false, message, errors, traceId };
}