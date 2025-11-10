/**
 * ProtectedRoute 컴포넌트
 * @description 인증이 필요한 라우트를 보호하는 가드 컴포넌트
 */

import { ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuthStore } from '@stores/authStore'

/**
 * ProtectedRoute Props
 */
interface ProtectedRouteProps {
  children: ReactNode
}

/**
 * ProtectedRoute 컴포넌트
 */
export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const location = useLocation()
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)

  // 인증되지 않은 경우 로그인 페이지로 리다이렉트
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  // 인증된 경우 자식 컴포넌트 렌더링
  return <>{children}</>
}
