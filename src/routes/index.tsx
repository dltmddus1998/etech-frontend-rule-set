/**
 * 라우트 설정
 * @description React Router를 활용한 애플리케이션 라우팅
 */

import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Loading } from '@components/common'
import { ProtectedRoute } from './ProtectedRoute'
import { ROUTES } from '@constants/routes.constants'

/**
 * Lazy Loading 페이지
 */
const LoginPage = lazy(() =>
  import('@pages/Login').then((module) => ({ default: module.LoginPage })),
)
const DashboardPage = lazy(() =>
  import('@pages/Dashboard').then((module) => ({ default: module.DashboardPage })),
)

/**
 * 로딩 폴백 컴포넌트
 */
const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center">
    <Loading size="lg" message="페이지를 불러오는 중..." />
  </div>
)

/**
 * AppRouter 컴포넌트
 */
export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          {/* 루트 경로 - 로그인 페이지 */}
          <Route path="/" element={<LoginPage />} />
          <Route path={ROUTES.LOGIN} element={<LoginPage />} />

          {/* 보호된 라우트 */}
          <Route
            path={ROUTES.DASHBOARD}
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />

          {/* 서비스별 라우트 (추후 구현) */}
          <Route
            path={ROUTES.SERVICES.ONPREMISE_DATACENTER}
            element={
              <ProtectedRoute>
                <div className="min-h-screen flex items-center justify-center">
                  <h1 className="text-2xl font-bold">온프렘 데이터센터 (준비 중)</h1>
                </div>
              </ProtectedRoute>
            }
          />

          <Route
            path={ROUTES.SERVICES.ONPREMISE_OFFICE}
            element={
              <ProtectedRoute>
                <div className="min-h-screen flex items-center justify-center">
                  <h1 className="text-2xl font-bold">온프렘 사무실 (준비 중)</h1>
                </div>
              </ProtectedRoute>
            }
          />

          <Route
            path={ROUTES.SERVICES.CLOUD_AWS}
            element={
              <ProtectedRoute>
                <div className="min-h-screen flex items-center justify-center">
                  <h1 className="text-2xl font-bold">AWS 클라우드 (준비 중)</h1>
                </div>
              </ProtectedRoute>
            }
          />

          <Route
            path={ROUTES.SERVICES.CLOUD_AZURE}
            element={
              <ProtectedRoute>
                <div className="min-h-screen flex items-center justify-center">
                  <h1 className="text-2xl font-bold">Azure 클라우드 (준비 중)</h1>
                </div>
              </ProtectedRoute>
            }
          />

          <Route
            path={ROUTES.SERVICES.CLOUD_GCP}
            element={
              <ProtectedRoute>
                <div className="min-h-screen flex items-center justify-center">
                  <h1 className="text-2xl font-bold">GCP 클라우드 (준비 중)</h1>
                </div>
              </ProtectedRoute>
            }
          />

          <Route
            path={ROUTES.SERVICES.RETAIL_STORE}
            element={
              <ProtectedRoute>
                <div className="min-h-screen flex items-center justify-center">
                  <h1 className="text-2xl font-bold">리테일 스토어 (준비 중)</h1>
                </div>
              </ProtectedRoute>
            }
          />

          <Route
            path={ROUTES.SERVICES.OTHER_ASSETS}
            element={
              <ProtectedRoute>
                <div className="min-h-screen flex items-center justify-center">
                  <h1 className="text-2xl font-bold">기타 자산 (준비 중)</h1>
                </div>
              </ProtectedRoute>
            }
          />

          {/* 404 페이지 */}
          <Route
            path="*"
            element={
              <div className="min-h-screen flex items-center justify-center flex-col gap-4">
                <h1 className="text-6xl font-bold text-gray-800">404</h1>
                <p className="text-xl text-gray-600">페이지를 찾을 수 없습니다.</p>
                <a
                  href={ROUTES.DASHBOARD}
                  className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                >
                  대시보드로 돌아가기
                </a>
              </div>
            }
          />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}