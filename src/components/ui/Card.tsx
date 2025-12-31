'use client'

import { clsx } from 'clsx'

interface CardProps {
  variant?: 'default' | 'green' | 'orange' | 'purple' | 'featured'
  className?: string
  children: React.ReactNode
}

export function Card({ variant = 'default', className, children }: CardProps) {
  return (
    <div
      className={clsx(
        'p-8 transition-all duration-300',
        {
          'card': variant === 'default',
          'card-green': variant === 'green',
          'card-orange': variant === 'orange',
          'card-purple': variant === 'purple',
          'card col-span-2 bg-gradient-to-br from-gray-mid to-gray-dark border-accent': variant === 'featured',
        },
        className
      )}
    >
      {children}
    </div>
  )
}
