/**
 * Mock 사용자 데이터
 */

import { User, UserRole, UserStatus } from '@/types/auth.types'

export const mockUsers: User[] = [
  {
    id: '1',
    username: 'admin',
    email: 'admin@gsretail.com',
    name: '관리자',
    department: 'IT운영팀',
    position: '팀장',
    role: UserRole.ADMIN,
    status: UserStatus.ACTIVE,
    phoneNumber: '010-1234-5678',
    lastLoginAt: new Date().toISOString(),
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    username: 'user',
    email: 'user@gsretail.com',
    name: '홍길동',
    department: 'IT운영팀',
    position: '대리',
    role: UserRole.USER,
    status: UserStatus.ACTIVE,
    phoneNumber: '010-2345-6789',
    lastLoginAt: new Date().toISOString(),
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: new Date().toISOString(),
  },
]

/**
 * 사용자 조회 헬퍼
 */
export const findUserByUsername = (username: string): User | undefined => {
  return mockUsers.find((user) => user.username === username)
}

/**
 * 비밀번호 검증 헬퍼 (Mock)
 */
export const validatePassword = (username: string, password: string): boolean => {
  // Mock: 사용자명과 비밀번호가 같으면 성공
  return username === password
}