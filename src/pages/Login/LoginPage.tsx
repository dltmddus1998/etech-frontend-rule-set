/**
 * 로그인 페이지
 * @description 사용자 로그인 화면
 */

import { useState, FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { Mail, Lock } from 'lucide-react'
import { Button, Input } from '@components/common'
import { useAuthStore } from '@stores/authStore'

/**
 * 폼 에러 타입
 */
interface FormErrors {
  username?: string
  password?: string
}

/**
 * LoginPage 컴포넌트
 */
export const LoginPage = () => {
  const navigate = useNavigate()
  const login = useAuthStore((state) => state.login)

  // 폼 상태
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const [errors, setErrors] = useState<FormErrors>({})
  const [isLoading, setIsLoading] = useState(false)
  const [serverError, setServerError] = useState<string | null>(null)

  /**
   * 폼 유효성 검증
   */
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (!username) {
      newErrors.username = '사용자 ID를 입력해주세요.'
    }

    if (!password) {
      newErrors.password = '비밀번호를 입력해주세요.'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  /**
   * 로그인 핸들러
   */
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setServerError(null)

    // 폼 유효성 검증
    if (!validateForm()) {
      return
    }

    setIsLoading(true)

    try {
      // 로그인 API 호출
      await login({
        username,
        password,
        rememberMe,
      })

      // 로그인 성공 시 대시보드로 이동
      navigate('/dashboard')
    } catch (error) {
      // 에러 처리
      const errorMessage = error instanceof Error ? error.message : '로그인에 실패했습니다.'
      setServerError(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4">
      {/* 로그인 카드 */}
      <div className="w-full max-w-md">
        {/* 로고 */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="text-5xl">☁️</span>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">
            ETECH ITSM Portal
          </h1>
          <p className="text-gray-400">v1.0.0</p>
        </div>

        {/* 로그인 폼 */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">로그인</h2>

          {/* 서버 에러 메시지 */}
          {serverError && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600">{serverError}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* 사용자 ID */}
            <Input
              type="text"
              label="사용자 ID"
              placeholder="admin"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              error={errors.username}
              leftIcon={<Mail size={20} />}
              fullWidth
              required
              autoComplete="username"
            />

            {/* 비밀번호 */}
            <Input
              type="password"
              label="비밀번호"
              placeholder="admin"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={errors.password}
              leftIcon={<Lock size={20} />}
              fullWidth
              required
              autoComplete="current-password"
            />

            {/* Remember Me */}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="rememberMe"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 text-black border-gray-300 rounded focus:ring-black focus:ring-offset-0"
              />
              <label htmlFor="rememberMe" className="ml-2 text-sm text-gray-700">
                로그인 상태 유지
              </label>
            </div>

            {/* 로그인 버튼 */}
            <Button type="submit" fullWidth isLoading={isLoading} size="lg">
              로그인
            </Button>
          </form>

          {/* 테스트 계정 안내 */}
          <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg">
            <p className="text-xs text-gray-600 font-medium mb-2">테스트 계정</p>
            <p className="text-xs text-gray-700">
              사용자 ID: <code className="bg-gray-200 px-2 py-1 rounded text-gray-900">admin</code>
            </p>
            <p className="text-xs text-gray-700">
              비밀번호: <code className="bg-gray-200 px-2 py-1 rounded text-gray-900">admin</code>
            </p>
          </div>
        </div>

        {/* 저작권 */}
        <div className="text-center mt-6">
          <p className="text-sm text-gray-500">© 2025 ETECH. All rights reserved.</p>
        </div>
      </div>
    </div>
  )
}
