/**
 * MSW 브라우저 워커 설정
 * @description 개발 환경에서 API 모킹을 위한 Service Worker 설정
 */

import { setupWorker } from 'msw/browser'
import { handlers } from './handlers'

/**
 * MSW 워커 생성
 */
export const worker = setupWorker(...handlers)

/**
 * MSW 시작 함수
 */
export const startMockServiceWorker = async () => {
  if (import.meta.env.DEV) {
    await worker.start({
      onUnhandledRequest: 'bypass', // 핸들러가 없는 요청은 통과
      serviceWorker: {
        url: '/mockServiceWorker.js',
      },
    })
    console.log('MSW Mock Service Worker started')
  }
}