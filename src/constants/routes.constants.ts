/**
 * 라우트 관련 상수 정의
 * @description 애플리케이션 라우트 경로 상수
 */

/**
 * 라우트 경로
 */
export const ROUTES = {
  // 인증 관련
  LOGIN: '/login',
  LOGOUT: '/logout',
  FORGOT_PASSWORD: '/forgot-password',
  RESET_PASSWORD: '/reset-password/:token',

  // 메인
  HOME: '/',
  DASHBOARD: '/dashboard',

  // 서비스별 라우트
  SERVICES: {
    ONPREMISE_DATACENTER: '/services/onpremise-datacenter',
    ONPREMISE_OFFICE: '/services/onpremise-office',
    CLOUD_AWS: '/services/cloud-aws',
    CLOUD_AZURE: '/services/cloud-azure',
    CLOUD_GCP: '/services/cloud-gcp',
    RETAIL_STORE: '/services/retail-store',
    OTHER_ASSETS: '/services/other-assets',
  },

  // 자산 관리
  ASSETS: {
    LIST: '/assets',
    DETAIL: '/assets/:id',
    CREATE: '/assets/new',
    EDIT: '/assets/:id/edit',
  },

  // 보고서
  REPORTS: {
    LIST: '/reports',
    DETAIL: '/reports/:id',
    CREATE: '/reports/new',
  },

  // 설정
  SETTINGS: {
    GENERAL: '/settings/general',
    PROFILE: '/settings/profile',
    SECURITY: '/settings/security',
    NOTIFICATIONS: '/settings/notifications',
  },

  // 관리자
  ADMIN: {
    USERS: '/admin/users',
    ROLES: '/admin/roles',
    PERMISSIONS: '/admin/permissions',
    SYSTEM: '/admin/system',
    LOGS: '/admin/logs',
  },

  // 오류 페이지
  NOT_FOUND: '/404',
  SERVER_ERROR: '/500',
  FORBIDDEN: '/403',
} as const

/**
 * 공개 라우트 (인증 불필요)
 */
export const PUBLIC_ROUTES = [
  ROUTES.LOGIN,
  ROUTES.FORGOT_PASSWORD,
  ROUTES.RESET_PASSWORD,
] as const

/**
 * 보호된 라우트 (인증 필요)
 */
export const PROTECTED_ROUTES = [
  ROUTES.DASHBOARD,
  ROUTES.SERVICES.ONPREMISE_DATACENTER,
  ROUTES.SERVICES.ONPREMISE_OFFICE,
  ROUTES.SERVICES.CLOUD_AWS,
  ROUTES.SERVICES.CLOUD_AZURE,
  ROUTES.SERVICES.CLOUD_GCP,
  ROUTES.SERVICES.RETAIL_STORE,
  ROUTES.SERVICES.OTHER_ASSETS,
  ROUTES.ASSETS.LIST,
  ROUTES.REPORTS.LIST,
  ROUTES.SETTINGS.GENERAL,
] as const

/**
 * 관리자 전용 라우트
 */
export const ADMIN_ROUTES = [
  ROUTES.ADMIN.USERS,
  ROUTES.ADMIN.ROLES,
  ROUTES.ADMIN.PERMISSIONS,
  ROUTES.ADMIN.SYSTEM,
  ROUTES.ADMIN.LOGS,
] as const

/**
 * 라우트 이름 매핑
 */
export const ROUTE_NAMES = {
  [ROUTES.LOGIN]: '로그인',
  [ROUTES.DASHBOARD]: '대시보드',
  [ROUTES.SERVICES.ONPREMISE_DATACENTER]: '온프렘 데이터센터',
  [ROUTES.SERVICES.ONPREMISE_OFFICE]: '온프렘 사무실',
  [ROUTES.SERVICES.CLOUD_AWS]: 'AWS 클라우드',
  [ROUTES.SERVICES.CLOUD_AZURE]: 'Azure 클라우드',
  [ROUTES.SERVICES.CLOUD_GCP]: 'GCP 클라우드',
  [ROUTES.SERVICES.RETAIL_STORE]: '리테일 스토어',
  [ROUTES.SERVICES.OTHER_ASSETS]: '기타 자산',
  [ROUTES.ASSETS.LIST]: '자산 목록',
  [ROUTES.REPORTS.LIST]: '보고서',
  [ROUTES.SETTINGS.GENERAL]: '설정',
  [ROUTES.ADMIN.USERS]: '사용자 관리',
} as const