'use client'

import Link from 'next/link'
import { ArrowUpRight, Mic } from 'lucide-react'
import { Platform } from '@/types'
import { clsx } from 'clsx'

interface SolutionCardProps {
  platform: Platform
  featured?: boolean
}

export function SolutionCard({ platform, featured }: SolutionCardProps) {
  return (
    <div
      className={clsx(
        'card relative flex flex-col',
        featured && 'col-span-2 bg-gradient-to-br from-gray-mid to-gray-dark border-accent'
      )}
    >
      {/* Status badge */}
      <div className="absolute top-6 right-6 flex items-center gap-3">
        {platform.hasVoiceAI && (
          <span className="flex items-center gap-1.5 text-accent font-mono text-xs">
            <Mic size={12} />
            Voice AI
          </span>
        )}
        {platform.status === 'live' ? (
          <span className="status-live">Live</span>
        ) : (
          <span className="status-building">Coming Soon</span>
        )}
      </div>

      {/* Content */}
      <div className="font-mono text-xs text-accent uppercase tracking-wider mb-3">
        The Problem: {platform.problem}
      </div>
      
      <h3 className="text-xl font-bold mb-3">{platform.name}</h3>
      
      <p className="text-gray-light text-sm leading-relaxed flex-grow mb-6">
        {platform.description}
      </p>

      {/* Link */}
      {platform.status === 'live' ? (
        <a
          href={platform.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 font-mono text-sm text-white hover:text-accent transition-colors"
        >
          Try it free
          <ArrowUpRight size={16} />
        </a>
      ) : (
        <Link
          href={`/contact?waitlist=${platform.slug}`}
          className="inline-flex items-center gap-2 font-mono text-sm text-white hover:text-orange transition-colors"
        >
          Join waitlist
          <ArrowUpRight size={16} />
        </Link>
      )}
    </div>
  )
}
