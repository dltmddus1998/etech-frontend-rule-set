/**
 * Button 공통 컴포넌트
 * @description 재사용 가능한 버튼 컴포넌트 (다양한 variant 지원)
 */

import { ButtonHTMLAttributes, ReactNode } from 'react'

/**
 * Button 컴포넌트 Props
 */
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  fullWidth?: boolean
  isLoading?: boolean
  leftIcon?: ReactNode
  rightIcon?: ReactNode
  children: ReactNode
}

/**
 * Button 컴포넌트
 */
export const Button = ({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  isLoading = false,
  leftIcon,
  rightIcon,
  children,
  className = '',
  disabled,
  ...props
}: ButtonProps) => {
  // Variant 스타일
  const variantStyles = {
    primary: 'bg-black hover:bg-gray-800 text-white',
    secondary: 'bg-gray-700 hover:bg-gray-800 text-white',
    outline:
      'border-2 border-black text-black hover:bg-gray-100 bg-transparent',
    ghost: 'text-black hover:bg-gray-100 bg-transparent',
    danger: 'bg-red-600 hover:bg-red-700 text-white',
  }

  // Size 스타일
  const sizeStyles = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  }

  // 기본 스타일
  const baseStyles =
    'inline-flex items-center justify-center gap-2 font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed'

  // 전체 너비
  const widthStyles = fullWidth ? 'w-full' : ''

  // 로딩 스타일
  const loadingStyles = isLoading ? 'cursor-wait opacity-70' : ''

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${widthStyles} ${loadingStyles} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && (
        <svg
          className="animate-spin h-5 w-5"
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
      )}
      {!isLoading && leftIcon && <span className="flex-shrink-0">{leftIcon}</span>}
      <span>{children}</span>
      {!isLoading && rightIcon && <span className="flex-shrink-0">{rightIcon}</span>}
    </button>
  )
}