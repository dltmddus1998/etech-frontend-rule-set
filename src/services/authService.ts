/**
 * 인증 API 서비스
 * @description 로그인, 로그아웃, 토큰 갱신 등 인증 관련 API
 */

import { api } from './api'
import { API_ENDPOINTS } from '@constants/api.constants'
import type { LoginCredentials, LoginResponse, User } from '@/types/auth.types'

/**
 * API 응답 타입
 */
interface ApiResponse<T> {
  success: boolean
  data: T
  message?: string
}

/**
 * 인증 서비스
 */
export const authService = {
  /**
   * 로그인
   */
  login: async (credentials: LoginCredentials): Promise<LoginResponse> => {
    const response = await api.post<ApiResponse<LoginResponse>>(API_ENDPOINTS.AUTH.LOGIN, credentials)
    return response.data
  },

  /**
   * 로그아웃
   */
  logout: async (): Promise<void> => {
    await api.post<ApiResponse<void>>(API_ENDPOINTS.AUTH.LOGOUT)
  },

  /**
   * 토큰 갱신
   */
  refreshToken: async (refreshToken: string): Promise<LoginResponse> => {
    const response = await api.post<ApiResponse<LoginResponse>>(API_ENDPOINTS.AUTH.REFRESH, { refreshToken })
    return response.data
  },

  /**
   * 토큰 검증
   */
  verifyToken: async (): Promise<boolean> => {
    try {
      const response = await api.get<ApiResponse<{ valid: boolean }>>(API_ENDPOINTS.AUTH.VERIFY)
      return response.data.valid
    } catch {
      return false
    }
  },

  /**
   * 프로필 조회
   */
  getProfile: async (): Promise<User> => {
    const response = await api.get<ApiResponse<User>>(API_ENDPOINTS.AUTH.PROFILE)
    return response.data
  },

  /**
   * 비밀번호 재설정 요청
   */
  requestPasswordReset: async (email: string): Promise<void> => {
    await api.post<ApiResponse<void>>(API_ENDPOINTS.AUTH.PASSWORD_RESET_REQUEST, { email })
  },

  /**
   * 비밀번호 재설정
   */
  resetPassword: async (token: string, newPassword: string): Promise<void> => {
    await api.post<ApiResponse<void>>(API_ENDPOINTS.AUTH.PASSWORD_RESET, { token, newPassword })
  },
}