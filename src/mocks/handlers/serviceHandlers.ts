/**
 * 서비스 관련 MSW 핸들러
 */

import { http, HttpResponse } from 'msw'
import { API_ENDPOINTS } from '@constants/api.constants'
import { mockServices } from '../data/services.mock'

/**
 * 서비스 핸들러
 */
export const serviceHandlers = [
  /**
   * 서비스 목록 조회
   */
  http.get(`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:5173/api'}${API_ENDPOINTS.SERVICES.LIST}`, () => {
    return HttpResponse.json(
      {
        success: true,
        data: mockServices,
      },
      { status: 200 },
    )
  }),

  /**
   * 서비스 상세 조회
   */
  http.get(`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:5173/api'}/services/:id`, ({ params }) => {
    const { id } = params
    const service = mockServices.find((s) => s.id === id)

    if (!service) {
      return HttpResponse.json(
        {
          success: false,
          message: '서비스를 찾을 수 없습니다.',
        },
        { status: 404 },
      )
    }

    return HttpResponse.json(
      {
        success: true,
        data: service,
      },
      { status: 200 },
    )
  }),

  /**
   * 서비스 통계 조회
   */
  http.get(`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:5173/api'}/services/:id/stats`, ({ params }) => {
    const { id } = params

    return HttpResponse.json(
      {
        success: true,
        data: {
          serviceId: id,
          totalAssets: Math.floor(Math.random() * 1000) + 100,
          activeAssets: Math.floor(Math.random() * 900) + 50,
          incidents: Math.floor(Math.random() * 10),
          uptime: 99.9,
          lastUpdated: new Date().toISOString(),
        },
      },
      { status: 200 },
    )
  }),

  /**
   * 전체 서비스 상태 조회
   */
  http.get(`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:5173/api'}${API_ENDPOINTS.SERVICES.STATUS}`, () => {
    const status = mockServices.reduce(
      (acc, service) => {
        acc[service.id] = service.status
        return acc
      },
      {} as Record<string, string>,
    )

    return HttpResponse.json(
      {
        success: true,
        data: status,
      },
      { status: 200 },
    )
  }),
]