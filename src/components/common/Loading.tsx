/**
 * Loading 공통 컴포넌트
 * @description 로딩 스피너 및 오버레이 컴포넌트
 */

/**
 * Loading 컴포넌트 Props
 */
interface LoadingProps {
  size?: 'sm' | 'md' | 'lg'
  overlay?: boolean
  message?: string
}

/**
 * Loading 컴포넌트
 */
export const Loading = ({ size = 'md', overlay = false, message }: LoadingProps) => {
  // Size 스타일
  const sizeStyles = {
    sm: 'h-6 w-6',
    md: 'h-10 w-10',
    lg: 'h-16 w-16',
  }

  // 스피너 컴포넌트
  const spinner = (
    <div className="flex flex-col items-center justify-center gap-3">
      <svg
        className={`animate-spin text-primary-600 ${sizeStyles[size]}`}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
      {message && <p className="text-sm text-gray-600">{message}</p>}
    </div>
  )

  // 오버레이가 있는 경우
  if (overlay) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6">{spinner}</div>
      </div>
    )
  }

  // 오버레이가 없는 경우
  return <div className="flex items-center justify-center p-4">{spinner}</div>
}