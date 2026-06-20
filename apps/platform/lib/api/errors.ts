export type ApiErrorPayload = {
  code: string;
  message: string;
  details?: unknown;
};

export class ApiError extends Error {
  readonly status: number;
  readonly code: string;
  readonly details?: unknown;

  constructor(input: { status: number; code: string; message: string; details?: unknown }) {
    super(input.message);
    this.status = input.status;
    this.code = input.code;
    this.details = input.details;
  }
}

export function isApiError(error: unknown): error is ApiError {
  return (
    typeof error === "object" &&
    error !== null &&
    "status" in error &&
    "code" in error &&
    typeof (error as { status?: unknown }).status === "number" &&
    typeof (error as { code?: unknown }).code === "string"
  );
}

export const apiErrors = {
  unauthorized: (message = "Not authenticated") =>
    new ApiError({ status: 401, code: "AUTH.UNAUTHORIZED", message }),
  forbidden: (message = "Forbidden") => new ApiError({ status: 403, code: "AUTH.FORBIDDEN", message }),
  notFound: (message = "Not found", code = "RESOURCE.NOT_FOUND") =>
    new ApiError({ status: 404, code, message }),
  validation: (details: unknown, message = "Validation failed") =>
    new ApiError({ status: 400, code: "VALIDATION.INVALID_BODY", message, details }),
  conflict: (message = "Conflict", code = "RESOURCE.CONFLICT") => new ApiError({ status: 409, code, message }),
  db: (message = "Database error", details?: unknown) =>
    new ApiError({ status: 500, code: "DB.ERROR", message, details }),
  internal: (message = "Internal server error") =>
    new ApiError({ status: 500, code: "INTERNAL.ERROR", message }),
};
