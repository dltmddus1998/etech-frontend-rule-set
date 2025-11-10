/**
 * 로컬 스토리지 및 세션 스토리지 유틸리티
 * @description 타입 안전성을 보장하는 스토리지 헬퍼 함수
 */

/**
 * 로컬 스토리지 헬퍼
 */
export const localStorageHelper = {
  /**
   * 값 저장
   */
  set<T>(key: string, value: T): void {
    try {
      const serialized = JSON.stringify(value)
      localStorage.setItem(key, serialized)
    } catch (error) {
      console.error('LocalStorage set error:', error)
    }
  },

  /**
   * 값 가져오기
   */
  get<T>(key: string, defaultValue?: T): T | null {
    try {
      const item = localStorage.getItem(key)
      if (item === null) {
        return defaultValue ?? null
      }
      return JSON.parse(item) as T
    } catch (error) {
      console.error('LocalStorage get error:', error)
      return defaultValue ?? null
    }
  },

  /**
   * 값 제거
   */
  remove(key: string): void {
    try {
      localStorage.removeItem(key)
    } catch (error) {
      console.error('LocalStorage remove error:', error)
    }
  },

  /**
   * 모든 값 제거
   */
  clear(): void {
    try {
      localStorage.clear()
    } catch (error) {
      console.error('LocalStorage clear error:', error)
    }
  },

  /**
   * 키 존재 여부 확인
   */
  has(key: string): boolean {
    return localStorage.getItem(key) !== null
  },
}

/**
 * 세션 스토리지 헬퍼
 */
export const sessionStorageHelper = {
  /**
   * 값 저장
   */
  set<T>(key: string, value: T): void {
    try {
      const serialized = JSON.stringify(value)
      sessionStorage.setItem(key, serialized)
    } catch (error) {
      console.error('SessionStorage set error:', error)
    }
  },

  /**
   * 값 가져오기
   */
  get<T>(key: string, defaultValue?: T): T | null {
    try {
      const item = sessionStorage.getItem(key)
      if (item === null) {
        return defaultValue ?? null
      }
      return JSON.parse(item) as T
    } catch (error) {
      console.error('SessionStorage get error:', error)
      return defaultValue ?? null
    }
  },

  /**
   * 값 제거
   */
  remove(key: string): void {
    try {
      sessionStorage.removeItem(key)
    } catch (error) {
      console.error('SessionStorage remove error:', error)
    }
  },

  /**
   * 모든 값 제거
   */
  clear(): void {
    try {
      sessionStorage.clear()
    } catch (error) {
      console.error('SessionStorage clear error:', error)
    }
  },

  /**
   * 키 존재 여부 확인
   */
  has(key: string): boolean {
    return sessionStorage.getItem(key) !== null
  },
}