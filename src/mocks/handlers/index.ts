/**
 * MSW 핸들러 통합
 */

import { authHandlers } from './authHandlers'
import { serviceHandlers } from './serviceHandlers'

export const handlers = [...authHandlers, ...serviceHandlers]