/**
 * 인증 상태 관리 스토어
 * @description Zustand를 활용한 전역 인증 상태 관리 (단순화 버전)
 */

import { create } from 'zustand'
import type { User, LoginCredentials, LoginResponse } from '@/types/auth.types'
import { authService } from '@services/authService'

/**
 * 인증 스토어 상태 타입
 */
interface AuthState {
  // 상태
  isAuthenticated: boolean
  user: User | null
  accessToken: string | null
  refreshToken: string | null
  isLoading: boolean
  error: string | null

  // 액션
  login: (credentials: LoginCredentials) => Promise<void>
  logout: () => void
  setUser: (user: User) => void
}

/**
 * 인증 스토어 (persist 없는 단순 버전)
 */
export const useAuthStore = create<AuthState>((set) => ({
  // 초기 상태
  isAuthenticated: false,
  user: null,
  accessToken: null,
  refreshToken: null,
  isLoading: false,
  error: null,

  /**
   * 로그인
   */
  login: async (credentials: LoginCredentials) => {
    set({ isLoading: true, error: null })

    try {
      const response: LoginResponse = await authService.login(credentials)

      set({
        isAuthenticated: true,
        user: response.user,
        accessToken: response.accessToken,
        refreshToken: response.refreshToken,
        isLoading: false,
        error: null,
      })

      // localStorage에 수동 저장
      localStorage.setItem('auth', JSON.stringify({
        isAuthenticated: true,
        user: response.user,
        accessToken: response.accessToken,
        refreshToken: response.refreshToken,
      }))
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : '로그인에 실패했습니다.'
      set({
        isAuthenticated: false,
        user: null,
        accessToken: null,
        refreshToken: null,
        isLoading: false,
        error: errorMessage,
      })
      throw error
    }
  },

  /**
   * 로그아웃
   */
  logout: () => {
    set({
      isAuthenticated: false,
      user: null,
      accessToken: null,
      refreshToken: null,
      isLoading: false,
      error: null,
    })

    // localStorage 클리어
    localStorage.removeItem('auth')
  },

  /**
   * 사용자 정보 설정
   */
  setUser: (user: User) => {
    set({ user })
  },
}))

// 앱 시작 시 localStorage에서 복원
const stored = localStorage.getItem('auth')
if (stored) {
  try {
    const parsed = JSON.parse(stored)
    useAuthStore.setState({
      isAuthenticated: parsed.isAuthenticated,
      user: parsed.user,
      accessToken: parsed.accessToken,
      refreshToken: parsed.refreshToken,
    })
  } catch (error) {
    console.error('Failed to parse stored auth:', error)
    localStorage.removeItem('auth')
  }
}
