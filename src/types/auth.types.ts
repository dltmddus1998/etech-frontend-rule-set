/**
 * 인증 관련 타입 정의
 * @description 사용자 인증 및 권한 관리 관련 타입
 */

/**
 * 사용자 역할 열거형
 */
export enum UserRole {
  ADMIN = 'ADMIN',
  MANAGER = 'MANAGER',
  USER = 'USER',
  GUEST = 'GUEST',
}

/**
 * 사용자 상태 열거형
 */
export enum UserStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  SUSPENDED = 'SUSPENDED',
  DELETED = 'DELETED',
}

/**
 * 사용자 기본 정보 타입
 */
export interface User {
  id: string
  username: string
  email: string
  name: string
  department?: string
  position?: string
  role: UserRole
  status: UserStatus
  profileImage?: string
  phoneNumber?: string
  lastLoginAt?: string
  createdAt: string
  updatedAt: string
}

/**
 * 로그인 자격 증명 타입
 */
export interface LoginCredentials {
  username: string
  password: string
  rememberMe?: boolean
}

/**
 * 로그인 응답 타입
 */
export interface LoginResponse {
  user: User
  accessToken: string
  refreshToken: string
  expiresIn: number
}

/**
 * 토큰 페이로드 타입
 */
export interface TokenPayload {
  sub: string // user id
  username: string
  role: UserRole
  exp: number
  iat: number
}

/**
 * 인증 상태 타입
 */
export interface AuthState {
  isAuthenticated: boolean
  user: User | null
  accessToken: string | null
  refreshToken: string | null
  isLoading: boolean
  error: string | null
}

/**
 * 비밀번호 재설정 요청 타입
 */
export interface PasswordResetRequest {
  email: string
}

/**
 * 비밀번호 재설정 타입
 */
export interface PasswordReset {
  token: string
  newPassword: string
  confirmPassword: string
}

/**
 * 사용자 권한 타입
 */
export interface Permission {
  id: string
  name: string
  resource: string
  action: string
  description?: string
}

/**
 * 권한 체크 타입
 */
export interface PermissionCheck {
  resource: string
  action: string
}

/**
 * 세션 정보 타입
 */
export interface SessionInfo {
  id: string
  userId: string
  ipAddress: string
  userAgent: string
  createdAt: string
  expiresAt: string
  isActive: boolean
}