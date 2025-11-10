/**
 * 서비스 관련 타입 정의
 * @description ITSM 서비스 카테고리 및 관련 타입
 */

/**
 * 서비스 카테고리 열거형
 */
export enum ServiceCategory {
  ONPREMISE_DATACENTER = 'ONPREMISE_DATACENTER',
  ONPREMISE_OFFICE = 'ONPREMISE_OFFICE',
  CLOUD_AWS = 'CLOUD_AWS',
  CLOUD_AZURE = 'CLOUD_AZURE',
  CLOUD_GCP = 'CLOUD_GCP',
  RETAIL_STORE = 'RETAIL_STORE',
  OTHER_ASSETS = 'OTHER_ASSETS',
}

/**
 * 서비스 상태 열거형
 */
export enum ServiceStatus {
  OPERATIONAL = 'OPERATIONAL',
  DEGRADED = 'DEGRADED',
  PARTIAL_OUTAGE = 'PARTIAL_OUTAGE',
  MAJOR_OUTAGE = 'MAJOR_OUTAGE',
  MAINTENANCE = 'MAINTENANCE',
  UNKNOWN = 'UNKNOWN',
}

/**
 * 서비스 정보 타입
 */
export interface Service {
  id: string
  category: ServiceCategory
  name: string
  description: string
  icon: string
  emoji: string
  status: ServiceStatus
  route: string
  isActive: boolean
  order: number
  metadata?: {
    [key: string]: unknown
  }
}

/**
 * 서비스 통계 타입
 */
export interface ServiceStats {
  serviceId: string
  totalAssets: number
  activeAssets: number
  incidents: number
  uptime: number
  lastUpdated: string
}

/**
 * 대시보드 서비스 카드 타입
 */
export interface ServiceCard {
  service: Service
  stats?: ServiceStats
  onClick?: () => void
}