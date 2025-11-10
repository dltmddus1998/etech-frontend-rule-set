/**
 * 서비스 API
 * @description 서비스 목록, 상세 정보, 통계 등 조회 API
 */

import { api } from './api'
import { API_ENDPOINTS } from '@constants/api.constants'
import type { Service, ServiceStats } from '@/types/service.types'

/**
 * API 응답 타입
 */
interface ApiResponse<T> {
  success: boolean
  data: T
}

/**
 * 서비스 API 서비스
 */
export const serviceService = {
  /**
   * 서비스 목록 조회
   */
  getServices: async (): Promise<Service[]> => {
    const response = await api.get<ApiResponse<Service[]>>(API_ENDPOINTS.SERVICES.LIST)
    return response.data
  },

  /**
   * 서비스 상세 조회
   */
  getServiceDetail: async (id: string): Promise<Service> => {
    const response = await api.get<ApiResponse<Service>>(API_ENDPOINTS.SERVICES.DETAIL(id))
    return response.data
  },

  /**
   * 서비스 통계 조회
   */
  getServiceStats: async (id: string): Promise<ServiceStats> => {
    const response = await api.get<ApiResponse<ServiceStats>>(API_ENDPOINTS.SERVICES.STATS(id))
    return response.data
  },

  /**
   * 전체 서비스 상태 조회
   */
  getServicesStatus: async (): Promise<Record<string, string>> => {
    const response = await api.get<ApiResponse<Record<string, string>>>(API_ENDPOINTS.SERVICES.STATUS)
    return response.data
  },
}