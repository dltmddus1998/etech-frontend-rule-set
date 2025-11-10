/**
 * ServiceCard 컴포넌트
 * @description 대시보드 서비스 카드
 */

import { useNavigate } from 'react-router-dom'
import { Card } from '@components/common'
import type { Service, ServiceStatus } from '@/types/service.types'

/**
 * ServiceCard Props
 */
interface ServiceCardProps {
  service: Service
}

/**
 * 서비스 상태 색상 매핑
 */
const statusColors: Record<ServiceStatus, string> = {
  OPERATIONAL: 'bg-green-500',
  DEGRADED: 'bg-yellow-500',
  PARTIAL_OUTAGE: 'bg-orange-500',
  MAJOR_OUTAGE: 'bg-red-500',
  MAINTENANCE: 'bg-blue-500',
  UNKNOWN: 'bg-gray-500',
}

/**
 * ServiceCard 컴포넌트
 */
export const ServiceCard = ({ service }: ServiceCardProps) => {
  const navigate = useNavigate()

  /**
   * 카드 클릭 핸들러
   */
  const handleClick = () => {
    navigate(service.route)
  }

  return (
    <Card
      hoverable
      padding="md"
      onClick={handleClick}
      className="relative cursor-pointer transform transition-all duration-200 hover:-translate-y-1"
    >
      {/* 상태 인디케이터 */}
      <div className="absolute top-4 right-4">
        <div
          className={`w-3 h-3 rounded-full ${statusColors[service.status]}`}
          title={service.status}
        />
      </div>

      {/* 카드 내용 */}
      <div className="flex flex-col items-center text-center gap-3">
        {/* 이모지 아이콘 */}
        <div className="text-6xl mb-2">{service.emoji}</div>

        {/* 서비스 이름 */}
        <h3 className="text-lg font-bold text-gray-800">{service.name}</h3>

        {/* 서비스 설명 */}
        <p className="text-sm text-gray-600">{service.description}</p>
      </div>
    </Card>
  )
}