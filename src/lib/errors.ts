// Error handling utilities

export class AppError extends Error {
  constructor(
    message: string,
    public statusCode: number = 500,
    public code?: string
  ) {
    super(message);
    this.name = "AppError";
    Error.captureStackTrace(this, this.constructor);
  }
}

export class ValidationError extends AppError {
  constructor(message: string, public field?: string) {
    super(message, 400, "VALIDATION_ERROR");
    this.name = "ValidationError";
  }
}

export class NotFoundError extends AppError {
  constructor(resource: string = "Resource") {
    super(`${resource} bulunamadı`, 404, "NOT_FOUND");
    this.name = "NotFoundError";
  }
}

export class UnauthorizedError extends AppError {
  constructor(message: string = "Yetkisiz erişim") {
    super(message, 401, "UNAUTHORIZED");
    this.name = "UnauthorizedError";
  }
}

export class ForbiddenError extends AppError {
  constructor(message: string = "Erişim reddedildi") {
    super(message, 403, "FORBIDDEN");
    this.name = "ForbiddenError";
  }
}

// Error handler for API routes
export function handleApiError(error: unknown): { message: string; statusCode: number } {
  if (error instanceof AppError) {
    return {
      message: error.message,
      statusCode: error.statusCode,
    };
  }

  if (error instanceof Error) {
    return {
      message: process.env.NODE_ENV === "development" 
        ? error.message 
        : "Bir hata oluştu",
      statusCode: 500,
    };
  }

  return {
    message: "Beklenmeyen bir hata oluştu",
    statusCode: 500,
  };
}

// Async error wrapper
export function asyncHandler<T extends (...args: unknown[]) => Promise<unknown>>(
  fn: T
): T {
  return ((...args: Parameters<T>) => {
    return fn(...args).catch((error) => {
      throw error instanceof AppError ? error : new AppError(error instanceof Error ? error.message : "Unknown error");
    });
  }) as T;
}

// Type guard for checking if error is from API
export function isApiError(error: unknown): error is { response?: { data?: { message?: string } } } {
  return typeof error === "object" && error !== null && "response" in error;
}

// Get user-friendly error message
export function getErrorMessage(error: unknown): string {
  if (error instanceof AppError) {
    return error.message;
  }

  if (error instanceof Error) {
    return error.message;
  }

  if (typeof error === "string") {
    return error;
  }

  return "Beklenmeyen bir hata oluştu";
}
