/**
 * Input 공통 컴포넌트
 * @description 재사용 가능한 입력 필드 컴포넌트
 */

import { InputHTMLAttributes, forwardRef, ReactNode } from 'react'

/**
 * Input 컴포넌트 Props
 */
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  helperText?: string
  leftIcon?: ReactNode
  rightIcon?: ReactNode
  fullWidth?: boolean
}

/**
 * Input 컴포넌트
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      helperText,
      leftIcon,
      rightIcon,
      fullWidth = false,
      className = '',
      id,
      ...props
    },
    ref,
  ) => {
    // 고유 ID 생성
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`

    // 기본 스타일
    const baseStyles =
      'px-4 py-2 border rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:bg-gray-100 disabled:cursor-not-allowed'

    // 에러 스타일
    const errorStyles = error
      ? 'border-error focus:ring-error'
      : 'border-gray-300 focus:border-primary-500'

    // 아이콘이 있을 때 패딩 조정
    const iconPaddingStyles = leftIcon ? 'pl-10' : rightIcon ? 'pr-10' : ''

    // 전체 너비
    const widthStyles = fullWidth ? 'w-full' : ''

    return (
      <div className={`${fullWidth ? 'w-full' : ''}`}>
        {/* 라벨 */}
        {label && (
          <label htmlFor={inputId} className="block text-sm font-medium text-gray-700 mb-1">
            {label}
            {props.required && <span className="text-error ml-1">*</span>}
          </label>
        )}

        {/* 입력 필드 컨테이너 */}
        <div className="relative">
          {/* 왼쪽 아이콘 */}
          {leftIcon && (
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              {leftIcon}
            </div>
          )}

          {/* 입력 필드 */}
          <input
            ref={ref}
            id={inputId}
            className={`${baseStyles} ${errorStyles} ${iconPaddingStyles} ${widthStyles} ${className}`}
            {...props}
          />

          {/* 오른쪽 아이콘 */}
          {rightIcon && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              {rightIcon}
            </div>
          )}
        </div>

        {/* 에러 메시지 */}
        {error && <p className="mt-1 text-sm text-error">{error}</p>}

        {/* 도움말 텍스트 */}
        {!error && helperText && <p className="mt-1 text-sm text-gray-500">{helperText}</p>}
      </div>
    )
  },
)

Input.displayName = 'Input'