/**
 * API 관련 상수 정의
 * @description API 엔드포인트 및 설정 상수
 */

/**
 * API 기본 설정
 */
export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5173/api',
  TIMEOUT: 30000, // 30초
  RETRY_COUNT: 3,
  RETRY_DELAY: 1000, // 1초
} as const

/**
 * API 엔드포인트
 */
export const API_ENDPOINTS = {
  // 인증 관련
  AUTH: {
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
    VERIFY: '/auth/verify',
    PROFILE: '/auth/profile',
    PASSWORD_RESET_REQUEST: '/auth/password/reset-request',
    PASSWORD_RESET: '/auth/password/reset',
  },

  // 사용자 관련
  USERS: {
    LIST: '/users',
    DETAIL: (id: string) => `/users/${id}`,
    CREATE: '/users',
    UPDATE: (id: string) => `/users/${id}`,
    DELETE: (id: string) => `/users/${id}`,
    UPDATE_PROFILE: '/users/profile',
    CHANGE_PASSWORD: '/users/password',
  },

  // 서비스 관련
  SERVICES: {
    LIST: '/services',
    DETAIL: (id: string) => `/services/${id}`,
    STATS: (id: string) => `/services/${id}/stats`,
    STATUS: '/services/status',
  },

  // 데이터센터 자산 관련
  DATACENTER: {
    SERVERS: {
      LIST: '/datacenter/servers',
      DETAIL: (id: string) => `/datacenter/servers/${id}`,
      CREATE: '/datacenter/servers',
      UPDATE: (id: string) => `/datacenter/servers/${id}`,
      DELETE: (id: string) => `/datacenter/servers/${id}`,
    },
    STORAGE: {
      LIST: '/datacenter/storage',
      DETAIL: (id: string) => `/datacenter/storage/${id}`,
    },
    NETWORK: {
      LIST: '/datacenter/network',
      DETAIL: (id: string) => `/datacenter/network/${id}`,
    },
  },

  // 클라우드 자산 관련
  CLOUD: {
    AWS: {
      LIST: '/cloud/aws',
      DETAIL: (id: string) => `/cloud/aws/${id}`,
      INSTANCES: '/cloud/aws/instances',
      COSTS: '/cloud/aws/costs',
    },
    AZURE: {
      LIST: '/cloud/azure',
      DETAIL: (id: string) => `/cloud/azure/${id}`,
      INSTANCES: '/cloud/azure/instances',
      COSTS: '/cloud/azure/costs',
    },
    GCP: {
      LIST: '/cloud/gcp',
      DETAIL: (id: string) => `/cloud/gcp/${id}`,
      INSTANCES: '/cloud/gcp/instances',
      COSTS: '/cloud/gcp/costs',
    },
  },

  // 대시보드 관련
  DASHBOARD: {
    SUMMARY: '/dashboard/summary',
    METRICS: '/dashboard/metrics',
    ALERTS: '/dashboard/alerts',
    ACTIVITIES: '/dashboard/activities',
  },

  // 보고서 관련
  REPORTS: {
    LIST: '/reports',
    GENERATE: '/reports/generate',
    DOWNLOAD: (id: string) => `/reports/${id}/download`,
  },

  // 설정 관련
  SETTINGS: {
    GENERAL: '/settings/general',
    NOTIFICATIONS: '/settings/notifications',
    SECURITY: '/settings/security',
    PREFERENCES: '/settings/preferences',
  },
} as const

/**
 * HTTP 메서드
 */
export const HTTP_METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  PATCH: 'PATCH',
  DELETE: 'DELETE',
} as const

/**
 * HTTP 상태 코드
 */
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  TOO_MANY_REQUESTS: 429,
  INTERNAL_SERVER_ERROR: 500,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
  GATEWAY_TIMEOUT: 504,
} as const

/**
 * API 헤더 키
 */
export const API_HEADERS = {
  AUTHORIZATION: 'Authorization',
  CONTENT_TYPE: 'Content-Type',
  ACCEPT: 'Accept',
  X_REQUEST_ID: 'X-Request-Id',
  X_API_VERSION: 'X-Api-Version',
} as const

/**
 * Content Type
 */
export const CONTENT_TYPES = {
  JSON: 'application/json',
  FORM_DATA: 'multipart/form-data',
  URL_ENCODED: 'application/x-www-form-urlencoded',
  TEXT: 'text/plain',
} as const