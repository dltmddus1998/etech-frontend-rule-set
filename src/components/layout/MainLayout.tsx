/**
 * MainLayout 컴포넌트
 * @description 메인 레이아웃 (Header + Content)
 */

import { ReactNode } from 'react'
import { Header } from './Header'

/**
 * MainLayout Props
 */
interface MainLayoutProps {
  children: ReactNode
}

/**
 * MainLayout 컴포넌트
 */
export const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* 헤더 */}
      <Header />

      {/* 메인 컨텐츠 */}
      <main className="container mx-auto px-6 py-8">{children}</main>

      {/* 푸터 (선택적) */}
      <footer className="bg-white border-t border-gray-200 mt-auto">
        <div className="container mx-auto px-6 py-4">
          <p className="text-center text-sm text-gray-500">
            © 2024 GS Retail. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}