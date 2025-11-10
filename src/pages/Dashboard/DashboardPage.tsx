/**
 * 대시보드 페이지
 * @description 서비스 카드 그리드를 표시하는 메인 대시보드
 */

import { useEffect, useState } from 'react'
import { MainLayout } from '@components/layout'
import { ServiceCard } from '@components/domain'
import { Loading } from '@components/common'
import { serviceService } from '@services/serviceService'
import type { Service } from '@/types/service.types'

/**
 * DashboardPage 컴포넌트
 */
export const DashboardPage = () => {
  const [services, setServices] = useState<Service[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  /**
   * 서비스 목록 조회
   */
  useEffect(() => {
    const fetchServices = async () => {
      try {
        setIsLoading(true)
        const data = await serviceService.getServices()
        setServices(data)
        setError(null)
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : '서비스 목록을 불러오는데 실패했습니다.'
        setError(errorMessage)
      } finally {
        setIsLoading(false)
      }
    }

    fetchServices()
  }, [])

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto">
        {/* 페이지 헤더 */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">서비스 선택</h1>
          <p className="text-gray-600">관리하실 서비스를 선택해주세요.</p>
        </div>

        {/* 로딩 상태 */}
        {isLoading && (
          <div className="flex justify-center items-center h-64">
            <Loading size="lg" message="서비스 목록을 불러오는 중..." />
          </div>
        )}

        {/* 에러 상태 */}
        {error && !isLoading && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <p className="text-red-600 mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              다시 시도
            </button>
          </div>
        )}

        {/* 서비스 카드 그리드 */}
        {!isLoading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        )}

        {/* 서비스가 없는 경우 */}
        {!isLoading && !error && services.length === 0 && (
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-12 text-center">
            <p className="text-gray-600 text-lg">등록된 서비스가 없습니다.</p>
          </div>
        )}
      </div>
    </MainLayout>
  )
}