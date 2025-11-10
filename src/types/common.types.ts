/**
 * 공통 타입 정의
 * @description 애플리케이션 전반에서 사용되는 공통 타입 정의
 */

/**
 * API 응답 기본 타입
 */
export interface ApiResponse<T = unknown> {
  success: boolean
  data: T
  message?: string
  error?: {
    code: string
    message: string
    details?: unknown
  }
  timestamp?: string
}

/**
 * 페이지네이션 타입
 */
export interface Pagination {
  page: number
  pageSize: number
  totalPages: number
  totalItems: number
}

/**
 * 페이지네이션 응답 타입
 */
export interface PaginatedResponse<T> {
  items: T[]
  pagination: Pagination
}

/**
 * 정렬 옵션 타입
 */
export interface SortOptions {
  field: string
  order: 'asc' | 'desc'
}

/**
 * 필터 옵션 타입
 */
export interface FilterOptions {
  [key: string]: string | number | boolean | Date | undefined
}

/**
 * 에러 타입
 */
export interface AppError extends Error {
  code: string
  statusCode?: number
  details?: unknown
}

/**
 * 로딩 상태 타입
 */
export interface LoadingState {
  isLoading: boolean
  error: AppError | null
}

/**
 * 폼 필드 에러 타입
 */
export interface FormFieldError {
  field: string
  message: string
}

/**
 * 폼 상태 타입
 */
export interface FormState<T> {
  values: T
  errors: Record<keyof T, string>
  touched: Record<keyof T, boolean>
  isSubmitting: boolean
  isValid: boolean
}