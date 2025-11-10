/**
 * Card 공통 컴포넌트
 * @description 재사용 가능한 카드 컴포넌트
 */

import { HTMLAttributes, ReactNode } from 'react'

/**
 * Card 컴포넌트 Props
 */
interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  header?: ReactNode
  footer?: ReactNode
  hoverable?: boolean
  bordered?: boolean
  padding?: 'none' | 'sm' | 'md' | 'lg'
}

/**
 * Card 컴포넌트
 */
export const Card = ({
  children,
  header,
  footer,
  hoverable = false,
  bordered = true,
  padding = 'md',
  className = '',
  ...props
}: CardProps) => {
  // 기본 스타일
  const baseStyles = 'bg-white rounded-lg overflow-hidden'

  // 보더 스타일
  const borderStyles = bordered ? 'border border-gray-200' : ''

  // Hover 스타일
  const hoverStyles = hoverable
    ? 'transition-shadow duration-200 hover:shadow-lg cursor-pointer'
    : 'shadow-sm'

  // 패딩 스타일
  const paddingStyles = {
    none: '',
    sm: 'p-3',
    md: 'p-6',
    lg: 'p-8',
  }

  return (
    <div className={`${baseStyles} ${borderStyles} ${hoverStyles} ${className}`} {...props}>
      {/* 헤더 */}
      {header && (
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">{header}</div>
      )}

      {/* 본문 */}
      <div className={paddingStyles[padding]}>{children}</div>

      {/* 푸터 */}
      {footer && (
        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">{footer}</div>
      )}
    </div>
  )
}