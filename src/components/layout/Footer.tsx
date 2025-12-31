'use client'

import Link from 'next/link'
import { SITE, SKOOL } from '@/lib/constants'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-black border-t border-gray-border">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div>
            <h4 className="font-mono text-xs text-accent uppercase tracking-wider mb-4">Solutions</h4>
            <ul className="space-y-3">
              <li><Link href="/marketplace" className="text-sm text-gray-light hover:text-accent transition-colors">Marketplace</Link></li>
              <li><a href="https://raiseready-six.vercel.app" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-light hover:text-accent transition-colors">RaiseReady</a></li>
              <li><a href="https://tenderwatch-alpha.vercel.app" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-light hover:text-accent transition-colors">TenderWatch</a></li>
              <li><Link href="/studio/portfolio" className="text-sm text-gray-light hover:text-accent transition-colors">All Platforms →</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-mono text-xs text-accent uppercase tracking-wider mb-4">Studio</h4>
            <ul className="space-y-3">
              <li><Link href="/studio/thesis" className="text-sm text-gray-light hover:text-accent transition-colors">Our Thesis</Link></li>
              <li><Link href="/studio/portfolio" className="text-sm text-gray-light hover:text-accent transition-colors">Portfolio</Link></li>
              <li><Link href="/studio/invest" className="text-sm text-gray-light hover:text-accent transition-colors">Invest</Link></li>
              <li><Link href="/studio/join" className="text-sm text-gray-light hover:text-accent transition-colors">Join Team</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-mono text-xs text-accent uppercase tracking-wider mb-4">Community</h4>
            <ul className="space-y-3">
              <li><a href={SKOOL.url} target="_blank" rel="noopener noreferrer" className="text-sm text-gray-light hover:text-accent transition-colors">The Easily Distracted</a></li>
              <li><Link href="/partner" className="text-sm text-gray-light hover:text-accent transition-colors">Partner With Us</Link></li>
              <li><Link href="/voice-ai" className="text-sm text-gray-light hover:text-accent transition-colors">Voice AI Approach</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-mono text-xs text-accent uppercase tracking-wider mb-4">Connect</h4>
            <ul className="space-y-3">
              <li><Link href="/contact" className="text-sm text-gray-light hover:text-accent transition-colors">Book a Call</Link></li>
              <li><a href={`tel:${SITE.phone}`} className="text-sm text-gray-light hover:text-accent transition-colors">{SITE.phoneFormatted}</a></li>
              <li><a href={`mailto:${SITE.email}`} className="text-sm text-gray-light hover:text-accent transition-colors">Email Us</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-border flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-center md:text-left">
            <p className="text-sm font-medium text-white">{SITE.name}</p>
            <p className="text-xs text-gray-light mt-1">{SITE.company} | ABN {SITE.abn} | {SITE.location}</p>
          </div>
          <p className="text-xs text-gray-light">© {currentYear} {SITE.name}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
