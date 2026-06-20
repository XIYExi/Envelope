import { NextResponse } from "next/server";
import type { ApiErrorPayload } from "./errors";
import { ApiError, apiErrors, isApiError } from "./errors";

export function jsonError(error: unknown, fallback: ApiError = apiErrors.internal()) {
  const err = isApiError(error) ? error : fallback;
  const payload: ApiErrorPayload = {
    code: err.code,
    message: err.message,
    ...(err.details === undefined ? {} : { details: err.details }),
  };
  return NextResponse.json({ error: payload }, { status: err.status });
}

