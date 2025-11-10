/**
 * Header 레이아웃 컴포넌트
 * @description 애플리케이션 헤더 (로고, 사용자 정보, 로그아웃)
 */

import { useNavigate } from 'react-router-dom'
import { LogOut, User } from 'lucide-react'
import { useAuthStore } from '@stores/authStore'
import { Button } from '@components/common'
import { APP_CONFIG } from '@constants/app.constants'
import { ROUTES } from '@constants/routes.constants'

/**
 * Header 컴포넌트
 */
export const Header = () => {
  const navigate = useNavigate()
  const user = useAuthStore((state) => state.user)
  const logout = useAuthStore((state) => state.logout)

  /**
   * 로그아웃 핸들러
   */
  const handleLogout = () => {
    logout()
    navigate(ROUTES.LOGIN)
  }

  /**
   * 로고 클릭 핸들러
   */
  const handleLogoClick = () => {
    navigate(ROUTES.DASHBOARD)
  }

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="flex items-center justify-between px-6 py-4">
        {/* 왼쪽: 로고 */}
        <div
          className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity"
          onClick={handleLogoClick}
        >
          <div className="flex items-center gap-2">
            <span className="text-2xl">☁️</span>
            <div className="flex flex-col">
              <h1 className="text-xl font-bold text-gray-800">
                {APP_CONFIG.COMPANY} {APP_CONFIG.NAME}
              </h1>
              <span className="text-xs text-gray-500">{APP_CONFIG.VERSION}</span>
            </div>
          </div>
        </div>

        {/* 오른쪽: 사용자 정보 및 로그아웃 */}
        <div className="flex items-center gap-4">
          {/* 사용자 정보 */}
          {user && (
            <div className="flex items-center gap-3 px-4 py-2 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-center w-8 h-8 bg-primary-600 text-white rounded-full">
                <User size={16} />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-medium text-gray-800">{user.name}</span>
                <span className="text-xs text-gray-500">{user.department}</span>
              </div>
            </div>
          )}

          {/* 로그아웃 버튼 */}
          <Button
            variant="outline"
            size="sm"
            onClick={handleLogout}
            leftIcon={<LogOut size={16} />}
          >
            로그아웃
          </Button>
        </div>
      </div>
    </header>
  )
}