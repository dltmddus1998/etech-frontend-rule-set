/**
 * 애플리케이션 메인 진입점
 */

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './App'
import './styles/index.css'

// MSW Mock Service Worker 시작
import { startMockServiceWorker } from './mocks/browser'

/**
 * 애플리케이션 초기화 및 렌더링
 */
const initApp = async () => {
  // MSW 시작 (개발 환경)
  if (import.meta.env.DEV) {
    await startMockServiceWorker()
  }

  // React 앱 렌더링
  const root = document.getElementById('root')
  if (!root) {
    throw new Error('Root element not found')
  }

  createRoot(root).render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
}

// 앱 초기화
initApp().catch((error) => {
  console.error('Failed to initialize app:', error)
})
