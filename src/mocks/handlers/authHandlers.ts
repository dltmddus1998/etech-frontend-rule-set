/**
 * 인증 관련 MSW 핸들러
 */

import { http, HttpResponse } from 'msw'
import { API_ENDPOINTS } from '@constants/api.constants'
import { findUserByUsername, validatePassword } from '../data/users.mock'
import type { LoginCredentials, LoginResponse } from '@/types/auth.types'

/**
 * 토큰 생성 (Mock)
 */
const generateToken = (userId: string): string => {
  return `mock_token_${userId}_${Date.now()}`
}

/**
 * 인증 핸들러
 */
export const authHandlers = [
  /**
   * 로그인
   */
  http.post(`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:5173/api'}${API_ENDPOINTS.AUTH.LOGIN}`, async ({ request }) => {
    try {
      const credentials = (await request.json()) as LoginCredentials

      // 사용자 조회
      const user = findUserByUsername(credentials.username)
      if (!user) {
        return HttpResponse.json(
          {
            success: false,
            message: '사용자를 찾을 수 없습니다.',
          },
          { status: 404 },
        )
      }

      // 비밀번호 검증
      if (!validatePassword(credentials.username, credentials.password)) {
        return HttpResponse.json(
          {
            success: false,
            message: '비밀번호가 일치하지 않습니다.',
          },
          { status: 401 },
        )
      }

      // 토큰 생성
      const accessToken = generateToken(user.id)
      const refreshToken = generateToken(`${user.id}_refresh`)

      const response: LoginResponse = {
        user,
        accessToken,
        refreshToken,
        expiresIn: 3600, // 1시간
      }

      return HttpResponse.json(
        {
          success: true,
          data: response,
          message: '로그인되었습니다.',
        },
        { status: 200 },
      )
    } catch (error) {
      return HttpResponse.json(
        {
          success: false,
          message: '로그인 처리 중 오류가 발생했습니다.',
          error,
        },
        { status: 500 },
      )
    }
  }),

  /**
   * 로그아웃
   */
  http.post(`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:5173/api'}${API_ENDPOINTS.AUTH.LOGOUT}`, () => {
    return HttpResponse.json(
      {
        success: true,
        message: '로그아웃되었습니다.',
      },
      { status: 200 },
    )
  }),

  /**
   * 토큰 갱신
   */
  http.post(`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:5173/api'}${API_ENDPOINTS.AUTH.REFRESH}`, async ({ request }) => {
    try {
      const body = (await request.json()) as { refreshToken: string }
      const { refreshToken } = body

      if (!refreshToken) {
        return HttpResponse.json(
          {
            success: false,
            message: 'Refresh token이 필요합니다.',
          },
          { status: 400 },
        )
      }

      // Mock: 새 토큰 생성
      const userId = '1' // 실제로는 refreshToken에서 추출
      const newAccessToken = generateToken(userId)
      const newRefreshToken = generateToken(`${userId}_refresh`)

      return HttpResponse.json(
        {
          success: true,
          data: {
            accessToken: newAccessToken,
            refreshToken: newRefreshToken,
            expiresIn: 3600,
          },
        },
        { status: 200 },
      )
    } catch (error) {
      return HttpResponse.json(
        {
          success: false,
          message: '토큰 갱신 중 오류가 발생했습니다.',
          error,
        },
        { status: 500 },
      )
    }
  }),

  /**
   * 토큰 검증
   */
  http.get(`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:5173/api'}${API_ENDPOINTS.AUTH.VERIFY}`, ({ request }) => {
    const authHeader = request.headers.get('Authorization')

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return HttpResponse.json(
        {
          success: false,
          message: '유효하지 않은 토큰입니다.',
        },
        { status: 401 },
      )
    }

    return HttpResponse.json(
      {
        success: true,
        data: { valid: true },
      },
      { status: 200 },
    )
  }),
]