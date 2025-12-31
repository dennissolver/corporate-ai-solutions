'use client'

import { Button } from './Button'
import { PricingTier } from '@/types'
import { clsx } from 'clsx'
import { Check, Star } from 'lucide-react'

interface PricingCardProps {
  tier: PricingTier
}

export function PricingCard({ tier }: PricingCardProps) {
  const isPartner = tier.variant === 'partner'
  const isFeatured = tier.variant === 'featured'

  return (
    <div
      className={clsx(
        'relative p-8 transition-all duration-300',
        {
          'bg-gray-dark border border-gray-border hover:border-accent': tier.variant === 'default',
          'bg-gradient-to-b from-gray-mid to-gray-dark border-2 border-accent': isFeatured,
          'bg-gradient-to-b from-orange-dim to-gray-dark border-2 border-orange': isPartner,
        }
      )}
    >
      {/* Featured badge */}
      {isFeatured && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent text-black font-mono text-xs font-bold px-4 py-1.5">
          MOST POPULAR
        </div>
      )}

      {/* Tier name */}
      <div
        className={clsx(
          'font-mono text-sm uppercase tracking-wider mb-4',
          isPartner ? 'text-orange' : 'text-accent'
        )}
      >
        {tier.name}
      </div>

      {/* Price */}
      <div className="mb-2">
        <span className="text-5xl font-extrabold">{tier.price}</span>
        {tier.period && (
          <span className="text-gray-light text-lg">{tier.period}</span>
        )}
      </div>

      {/* Description */}
      <p className="text-gray-light text-sm mb-6 pb-6 border-b border-gray-border">
        {tier.description}
      </p>

      {/* Features */}
      <ul className="space-y-4 mb-8">
        {tier.features.map((feature, index) => (
          <li key={index} className="flex items-start gap-3 text-sm text-gray-light">
            <span className={clsx('mt-0.5', isPartner ? 'text-orange' : 'text-accent')}>
              {isPartner ? <Star size={16} /> : <Check size={16} />}
            </span>
            {feature}
          </li>
        ))}
      </ul>

      {/* CTA */}
      <Button
        href={tier.cta.href}
        external={tier.cta.href.startsWith('http')}
        variant={isPartner ? 'orange' : isFeatured ? 'primary' : 'secondary'}
        fullWidth
      >
        {tier.cta.label}
      </Button>
    </div>
  )
}
