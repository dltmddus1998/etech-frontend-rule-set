/**
 * 애플리케이션 전역 상수 정의
 * @description 앱 설정 및 전역 상수
 */

/**
 * 애플리케이션 기본 설정
 */
export const APP_CONFIG = {
  NAME: 'ETECH ITSM Portal',
  VERSION: 'v2.1',
  COMPANY: 'GS Retail',
  DESCRIPTION: 'IT Service Management System',
  COPYRIGHT: '© 2024 GS Retail. All rights reserved.',
} as const

/**
 * 로컬 스토리지 키
 */
export const STORAGE_KEYS = {
  ACCESS_TOKEN: 'etech_access_token',
  REFRESH_TOKEN: 'etech_refresh_token',
  USER_INFO: 'etech_user_info',
  THEME: 'etech_theme',
  LANGUAGE: 'etech_language',
  REMEMBER_ME: 'etech_remember_me',
  LAST_VISITED_ROUTE: 'etech_last_visited_route',
  SIDEBAR_COLLAPSED: 'etech_sidebar_collapsed',
  PREFERENCES: 'etech_preferences',
} as const

/**
 * 세션 스토리지 키
 */
export const SESSION_KEYS = {
  TEMP_DATA: 'etech_temp_data',
  FORM_DRAFT: 'etech_form_draft',
  SEARCH_HISTORY: 'etech_search_history',
} as const

/**
 * 쿠키 키
 */
export const COOKIE_KEYS = {
  SESSION_ID: 'etech_session_id',
  CSRF_TOKEN: 'etech_csrf_token',
} as const

/**
 * 테마 설정
 */
export const THEME = {
  LIGHT: 'light',
  DARK: 'dark',
  AUTO: 'auto',
} as const

/**
 * 언어 설정
 */
export const LANGUAGE = {
  KO: 'ko',
  EN: 'en',
} as const

/**
 * 페이지네이션 기본 설정
 */
export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_PAGE_SIZE: 20,
  PAGE_SIZE_OPTIONS: [10, 20, 50, 100],
  MAX_PAGE_SIZE: 100,
} as const

/**
 * 날짜 포맷
 */
export const DATE_FORMAT = {
  FULL: 'YYYY-MM-DD HH:mm:ss',
  DATE: 'YYYY-MM-DD',
  TIME: 'HH:mm:ss',
  DATETIME: 'YYYY-MM-DD HH:mm',
  MONTH: 'YYYY-MM',
  YEAR: 'YYYY',
  RELATIVE: 'relative', // moment.js fromNow()
} as const

/**
 * 정렬 순서
 */
export const SORT_ORDER = {
  ASC: 'asc',
  DESC: 'desc',
} as const

/**
 * 토스트 알림 지속 시간
 */
export const TOAST_DURATION = {
  SHORT: 2000,
  MEDIUM: 3000,
  LONG: 5000,
  PERSISTENT: 0,
} as const

/**
 * 디바운스 지연 시간
 */
export const DEBOUNCE_DELAY = {
  SEARCH: 300,
  INPUT: 500,
  SCROLL: 100,
  RESIZE: 200,
} as const

/**
 * 파일 업로드 제한
 */
export const FILE_UPLOAD = {
  MAX_SIZE: 10 * 1024 * 1024, // 10MB
  MAX_FILES: 5,
  ALLOWED_TYPES: {
    IMAGE: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
    DOCUMENT: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
    SPREADSHEET: ['application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'],
    ALL: ['*/*'],
  },
} as const

/**
 * 정규 표현식
 */
export const REGEX = {
  EMAIL: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
  PHONE: /^01[0-9]-?[0-9]{3,4}-?[0-9]{4}$/,
  PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
  USERNAME: /^[a-zA-Z0-9_-]{3,20}$/,
  URL: /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/,
  IP_ADDRESS: /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/,
} as const

/**
 * 에러 메시지
 */
export const ERROR_MESSAGES = {
  NETWORK_ERROR: '네트워크 오류가 발생했습니다.',
  SERVER_ERROR: '서버 오류가 발생했습니다.',
  UNAUTHORIZED: '인증이 필요합니다.',
  FORBIDDEN: '권한이 없습니다.',
  NOT_FOUND: '요청하신 페이지를 찾을 수 없습니다.',
  VALIDATION_ERROR: '입력값을 확인해주세요.',
  TIMEOUT_ERROR: '요청 시간이 초과되었습니다.',
  UNKNOWN_ERROR: '알 수 없는 오류가 발생했습니다.',
} as const

/**
 * 성공 메시지
 */
export const SUCCESS_MESSAGES = {
  LOGIN: '로그인되었습니다.',
  LOGOUT: '로그아웃되었습니다.',
  SAVE: '저장되었습니다.',
  DELETE: '삭제되었습니다.',
  UPDATE: '수정되었습니다.',
  CREATE: '생성되었습니다.',
} as const