/**
 * Axios 기본 설정 및 인터셉터
 * @description API 요청을 위한 Axios 인스턴스 및 인터셉터 설정
 */

import axios, { AxiosInstance, AxiosRequestConfig, AxiosError, AxiosResponse } from 'axios'
import { API_CONFIG, API_HEADERS, CONTENT_TYPES } from '@constants/api.constants'
import { STORAGE_KEYS } from '@constants/app.constants'
import { localStorageHelper } from '@utils/storage.utils'

/**
 * Axios 인스턴스 생성
 */
const apiClient: AxiosInstance = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
  headers: {
    [API_HEADERS.CONTENT_TYPE]: CONTENT_TYPES.JSON,
    [API_HEADERS.ACCEPT]: CONTENT_TYPES.JSON,
  },
})

/**
 * 요청 인터셉터
 * - 모든 요청에 토큰 주입
 * - 요청 로깅 (개발 환경)
 */
apiClient.interceptors.request.use(
  (config) => {
    // 액세스 토큰 주입
    const accessToken = localStorageHelper.get<string>(STORAGE_KEYS.ACCESS_TOKEN)
    if (accessToken) {
      config.headers[API_HEADERS.AUTHORIZATION] = `Bearer ${accessToken}`
    }

    // Request ID 생성 (추적용)
    const requestId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    config.headers[API_HEADERS.X_REQUEST_ID] = requestId

    // API 버전 헤더
    config.headers[API_HEADERS.X_API_VERSION] = '1.0'

    // 개발 환경에서 요청 로깅
    if (import.meta.env.DEV) {
      console.log('API Request:', {
        method: config.method?.toUpperCase(),
        url: config.url,
        headers: config.headers,
        data: config.data,
      })
    }

    return config
  },
  (error) => {
    console.error('Request interceptor error:', error)
    return Promise.reject(error)
  },
)

/**
 * 응답 인터셉터
 * - 응답 데이터 가공
 * - 에러 처리
 * - 토큰 갱신
 */
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    // 개발 환경에서 응답 로깅
    if (import.meta.env.DEV) {
      console.log('API Response:', {
        status: response.status,
        url: response.config.url,
        data: response.data,
      })
    }

    return response
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean }

    // 개발 환경에서 에러 로깅
    if (import.meta.env.DEV) {
      console.error('API Error:', {
        status: error.response?.status,
        url: originalRequest?.url,
        message: error.message,
        data: error.response?.data,
      })
    }

    // 401 에러 (인증 실패) - 토큰 갱신 시도
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      try {
        const refreshToken = localStorageHelper.get<string>(STORAGE_KEYS.REFRESH_TOKEN)
        if (!refreshToken) {
          throw new Error('No refresh token available')
        }

        // 토큰 갱신 API 호출
        const response = await axios.post(`${API_CONFIG.BASE_URL}/auth/refresh`, {
          refreshToken,
        })

        const { accessToken: newAccessToken, refreshToken: newRefreshToken } = response.data

        // 새 토큰 저장
        localStorageHelper.set(STORAGE_KEYS.ACCESS_TOKEN, newAccessToken)
        localStorageHelper.set(STORAGE_KEYS.REFRESH_TOKEN, newRefreshToken)

        // 원래 요청 재시도
        if (originalRequest.headers) {
          originalRequest.headers[API_HEADERS.AUTHORIZATION] = `Bearer ${newAccessToken}`
        }

        return apiClient(originalRequest)
      } catch (refreshError) {
        // 토큰 갱신 실패 - 로그아웃 처리
        localStorageHelper.remove(STORAGE_KEYS.ACCESS_TOKEN)
        localStorageHelper.remove(STORAGE_KEYS.REFRESH_TOKEN)
        localStorageHelper.remove(STORAGE_KEYS.USER_INFO)

        // 로그인 페이지로 리다이렉트
        window.location.href = '/login'

        return Promise.reject(refreshError)
      }
    }

    // 기타 에러 처리
    return Promise.reject(error)
  },
)

/**
 * API 클라이언트 헬퍼 함수
 */
export const api = {
  /**
   * GET 요청
   */
  get: <T = unknown>(url: string, config?: AxiosRequestConfig): Promise<T> => {
    return apiClient.get<T>(url, config).then((response) => response.data)
  },

  /**
   * POST 요청
   */
  post: <T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> => {
    return apiClient.post<T>(url, data, config).then((response) => response.data)
  },

  /**
   * PUT 요청
   */
  put: <T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> => {
    return apiClient.put<T>(url, data, config).then((response) => response.data)
  },

  /**
   * PATCH 요청
   */
  patch: <T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> => {
    return apiClient.patch<T>(url, data, config).then((response) => response.data)
  },

  /**
   * DELETE 요청
   */
  delete: <T = unknown>(url: string, config?: AxiosRequestConfig): Promise<T> => {
    return apiClient.delete<T>(url, config).then((response) => response.data)
  },
}

export default apiClient