/**
 * 폼 유효성 검증 유틸리티
 * @description 입력값 검증 헬퍼 함수
 */

import { REGEX } from '@constants/app.constants'

/**
 * 이메일 유효성 검증
 */
export const validateEmail = (email: string): boolean => {
  return REGEX.EMAIL.test(email)
}

/**
 * 비밀번호 유효성 검증
 * 최소 8자, 대문자, 소문자, 숫자, 특수문자 포함
 */
export const validatePassword = (password: string): boolean => {
  return REGEX.PASSWORD.test(password)
}

/**
 * 사용자명 유효성 검증
 * 3-20자, 영문, 숫자, _, - 허용
 */
export const validateUsername = (username: string): boolean => {
  return REGEX.USERNAME.test(username)
}

/**
 * 전화번호 유효성 검증
 */
export const validatePhone = (phone: string): boolean => {
  return REGEX.PHONE.test(phone)
}

/**
 * URL 유효성 검증
 */
export const validateUrl = (url: string): boolean => {
  return REGEX.URL.test(url)
}

/**
 * IP 주소 유효성 검증
 */
export const validateIpAddress = (ip: string): boolean => {
  return REGEX.IP_ADDRESS.test(ip)
}

/**
 * 필수 값 검증
 */
export const validateRequired = (value: unknown): boolean => {
  if (value === null || value === undefined) {
    return false
  }
  if (typeof value === 'string') {
    return value.trim().length > 0
  }
  if (Array.isArray(value)) {
    return value.length > 0
  }
  return true
}

/**
 * 최소 길이 검증
 */
export const validateMinLength = (value: string, minLength: number): boolean => {
  return value.trim().length >= minLength
}

/**
 * 최대 길이 검증
 */
export const validateMaxLength = (value: string, maxLength: number): boolean => {
  return value.trim().length <= maxLength
}

/**
 * 숫자 범위 검증
 */
export const validateRange = (value: number, min: number, max: number): boolean => {
  return value >= min && value <= max
}

/**
 * 비밀번호 일치 검증
 */
export const validatePasswordMatch = (password: string, confirmPassword: string): boolean => {
  return password === confirmPassword
}

/**
 * 파일 크기 검증
 */
export const validateFileSize = (file: File, maxSizeInBytes: number): boolean => {
  return file.size <= maxSizeInBytes
}

/**
 * 파일 타입 검증
 */
export const validateFileType = (file: File, allowedTypes: string[]): boolean => {
  return allowedTypes.some((type) => {
    if (type === '*/*') return true
    if (type.endsWith('/*')) {
      const category = type.split('/')[0]
      return file.type.startsWith(category + '/')
    }
    return file.type === type
  })
}

/**
 * 에러 메시지 생성
 */
export const getValidationErrorMessage = (field: string, rule: string): string => {
  const messages: Record<string, string> = {
    required: `${field}은(는) 필수 입력 항목입니다.`,
    email: '올바른 이메일 형식이 아닙니다.',
    password: '비밀번호는 최소 8자, 대문자, 소문자, 숫자, 특수문자를 포함해야 합니다.',
    username: '사용자명은 3-20자의 영문, 숫자, _, -만 사용 가능합니다.',
    phone: '올바른 전화번호 형식이 아닙니다.',
    url: '올바른 URL 형식이 아닙니다.',
    ipAddress: '올바른 IP 주소 형식이 아닙니다.',
    passwordMatch: '비밀번호가 일치하지 않습니다.',
    minLength: `${field}은(는) 최소 길이를 충족하지 않습니다.`,
    maxLength: `${field}은(는) 최대 길이를 초과했습니다.`,
    range: `${field}은(는) 허용 범위를 벗어났습니다.`,
    fileSize: '파일 크기가 너무 큽니다.',
    fileType: '지원하지 않는 파일 형식입니다.',
  }

  return messages[rule] || `${field} 검증에 실패했습니다.`
}