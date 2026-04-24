import { NextResponse } from "next/server";

export type ApiResponse<T = unknown> = {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
};

export function successResponse<T>(data: T, message?: string, status = 200) {
  const body: ApiResponse<T> = { success: true, data };
  if (message) body.message = message;
  return NextResponse.json(body, { status });
}

export function errorResponse(error: string, status = 400) {
  const body: ApiResponse = { success: false, error };
  return NextResponse.json(body, { status });
}

export function notFoundResponse(resource = "Resource") {
  return errorResponse(`${resource} not found`, 404);
}

export function unauthorizedResponse(message = "Unauthorized") {
  return errorResponse(message, 401);
}

export function forbiddenResponse(message = "Forbidden") {
  return errorResponse(message, 403);
}

export function validationErrorResponse(errors: Record<string, string[]>) {
  const formatted = Object.entries(errors)
    .map(([field, msgs]) => `${field}: ${msgs.join(", ")}`)
    .join("; ");
  return errorResponse(`Validation failed: ${formatted}`, 422);
}

export function serverErrorResponse(error?: unknown) {
  const message =
    error instanceof Error ? error.message : "Internal server error";
  return errorResponse(message, 500);
}

export function parseBody<T>(request: Request): Promise<T> {
  return request.json() as Promise<T>;
}

export function getSearchParams(
  request: Request,
  key: string
): string | null {
  const url = new URL(request.url);
  return url.searchParams.get(key);
}

export function getPaginationParams(request: Request) {
  const url = new URL(request.url);
  const page = parseInt(url.searchParams.get("page") ?? "1", 10);
  const limit = parseInt(url.searchParams.get("limit") ?? "20", 10);
  const safePage = Math.max(1, page);
  const safeLimit = Math.min(Math.max(1, limit), 100);
  return { page: safePage, limit: safeLimit, skip: (safePage - 1) * safeLimit };
}

export function getSortParams(request: Request, defaultField = "createdAt") {
  const url = new URL(request.url);
  const sortBy = url.searchParams.get("sortBy") ?? defaultField;
  const sortOrder = url.searchParams.get("sortOrder") === "asc" ? "asc" : "desc";
  return { sortBy, sortOrder };
}

export function getFilterParams(request: Request) {
  const url = new URL(request.url);
  return Object.fromEntries(url.searchParams.entries());
}
