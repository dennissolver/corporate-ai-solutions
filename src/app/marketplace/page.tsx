import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowUpRight, Mic, Check } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { PLATFORMS } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Marketplace',
  description: '17 AI platforms. One subscription. Pick what you need.',
}

export default function MarketplacePage() {
  const performancePlatforms = PLATFORMS.filter(p => p.category === 'performance')
  const intelligencePlatforms = PLATFORMS.filter(p => p.category === 'intelligence')
  const industryPlatforms = PLATFORMS.filter(p => p.category === 'industry')

  return (
    <>
      {/* Hero */}
      <section className="section bg-grid">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <div className="tag mb-4">The Marketplace</div>
            <h1 className="mb-6">17 AI Platforms.<br />One Subscription.</h1>
            <p className="text-xl text-gray-light mb-8">
              Every platform below started as someone&apos;s problem. Now they&apos;re subscription-ready.
              Pick the ones you need.
            </p>
            <div className="flex gap-4">
              <Button href="/pricing">See Pricing</Button>
              <Button href="/partner" variant="orange">Don&apos;t See Your Problem?</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Summary */}
      <section className="py-8 px-6 bg-gray-dark border-y border-gray-border">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-center gap-8 text-center">
          <div>
            <div className="text-2xl font-bold text-accent">$49<span className="text-sm text-gray-light">/mo</span></div>
            <div className="text-xs text-gray-light">Any 3 platforms</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-accent">$99<span className="text-sm text-gray-light">/mo</span></div>
            <div className="text-xs text-gray-light">Any 7 platforms</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-white">$199<span className="text-sm text-gray-light">/mo</span></div>
            <div className="text-xs text-gray-light">All 17 platforms</div>
          </div>
        </div>
      </section>

      {/* High-Stakes Performance */}
      <section id="performance" className="section">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-4 gap-8">
            <div>
              <div className="text-4xl mb-4">🎯</div>
              <h2 className="text-2xl font-bold mb-4">High-Stakes Performance</h2>
              <p className="text-gray-light">
                Nervous before pitches, interviews, or presentations? 
                Practice 100 times with AI before doing it for real.
              </p>
            </div>
            <div className="lg:col-span-3 grid md:grid-cols-2 gap-6">
              {performancePlatforms.map((platform) => (
                <PlatformCard key={platform.id} platform={platform} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Business Intelligence */}
      <section id="intelligence" className="section bg-gray-dark">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-4 gap-8">
            <div>
              <div className="text-4xl mb-4">📊</div>
              <h2 className="text-2xl font-bold mb-4">Business Intelligence</h2>
              <p className="text-gray-light">
                Missing opportunities because you can&apos;t monitor everything? 
                AI watches for you.
              </p>
            </div>
            <div className="lg:col-span-3 grid md:grid-cols-2 gap-6">
              {intelligencePlatforms.map((platform) => (
                <PlatformCard key={platform.id} platform={platform} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Industry Solutions */}
      <section id="industry" className="section">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-4 gap-8">
            <div>
              <div className="text-4xl mb-4">🏢</div>
              <h2 className="text-2xl font-bold mb-4">Industry Solutions</h2>
              <p className="text-gray-light">
                Custom-built platforms for specific industries. 
                Legal, tourism, coaching, and more.
              </p>
            </div>
            <div className="lg:col-span-3 grid md:grid-cols-2 gap-6">
              {industryPlatforms.map((platform) => (
                <PlatformCard key={platform.id} platform={platform} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section bg-gray-dark">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="mb-4">Don&apos;t See Your Problem?</h2>
          <p className="text-xl text-gray-light mb-8">
            Tell us about it. We might build it—and you could earn revenue from it.
          </p>
          <div className="flex justify-center gap-4">
            <Button href="/partner" variant="orange">Partner With Us</Button>
            <Button href="/pricing" variant="secondary">See All Pricing</Button>
          </div>
        </div>
      </section>
    </>
  )
}

function PlatformCard({ platform }: { platform: typeof PLATFORMS[0] }) {
  return (
    <div className={`card ${platform.featured ? 'border-accent' : ''}`}>
      <div className="flex justify-between items-start mb-4">
        <div className="flex gap-2">
          {platform.hasVoiceAI && (
            <span className="flex items-center gap-1 text-xs bg-accent/20 text-accent px-2 py-1">
              <Mic size={12} /> Voice AI
            </span>
          )}
        </div>
        {platform.status === 'live' ? (
          <span className="status-live">Live</span>
        ) : (
          <span className="status-building">Coming Soon</span>
        )}
      </div>
      
      <div className="font-mono text-xs text-accent uppercase tracking-wider mb-2">
        Problem: {platform.problem}
      </div>
      
      <h3 className="text-lg font-bold mb-2">{platform.name}</h3>
      <p className="text-sm text-gray-light mb-4">{platform.description}</p>
      
      {platform.status === 'live' ? (
        <a
          href={platform.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm text-accent hover:text-white transition-colors"
        >
          Try it free <ArrowUpRight size={14} />
        </a>
      ) : (
        <Link
          href={`/contact?waitlist=${platform.slug}`}
          className="inline-flex items-center gap-2 text-sm text-orange hover:text-white transition-colors"
        >
          Join waitlist <ArrowUpRight size={14} />
        </Link>
      )}
    </div>
  )
}
