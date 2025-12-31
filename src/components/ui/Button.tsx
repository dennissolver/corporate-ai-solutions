'use client'

import { forwardRef } from 'react'
import Link from 'next/link'
import { clsx } from 'clsx'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'orange' | 'purple'
  size?: 'default' | 'sm' | 'lg'
  href?: string
  external?: boolean
  fullWidth?: boolean
  children: React.ReactNode
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'default',
      href,
      external,
      fullWidth,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const baseClasses = clsx(
      'btn',
      {
        'btn-primary': variant === 'primary',
        'btn-secondary': variant === 'secondary',
        'btn-orange': variant === 'orange',
        'btn-purple': variant === 'purple',
        'btn-sm': size === 'sm',
        'px-10 py-5 text-lg': size === 'lg',
        'btn-full': fullWidth,
      },
      className
    )

    if (href) {
      if (external) {
        return (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={baseClasses}
          >
            {children}
          </a>
        )
      }
      return (
        <Link href={href} className={baseClasses}>
          {children}
        </Link>
      )
    }

    return (
      <button ref={ref} className={baseClasses} {...props}>
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'
