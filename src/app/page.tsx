import Link from 'next/link'
import { ArrowRight, Zap, Users, TrendingUp, Briefcase, MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { PLATFORMS, STATS, SKOOL } from '@/lib/constants'

export default function HomePage() {
  const featuredPlatforms = PLATFORMS.filter(p => p.featured || p.status === 'live').slice(0, 6)

  return (
    <>
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-50" />
        <div className="max-w-7xl mx-auto px-6 py-24 relative z-10">
          <div className="tag mb-6">The Long Tail AI Studio</div>
          
          <h1 className="mb-6">
            <span className="block">Build to $1M ARR.</span>
            <span className="block text-gradient-accent">Auction for 6-10x.</span>
            <span className="block">Repeat.</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-light max-w-3xl mb-8 leading-relaxed">
            AI collapsed build costs. We&apos;re building the portfolio that profits.
            <strong className="text-white"> 17 platforms live.</strong> Each one started as someone&apos;s problem.
            We don&apos;t need unicorns. We need 50 subscribers per platform.
          </p>

          <div className="flex flex-wrap gap-4 mb-12">
            <Button href="/marketplace" size="lg">
              Use the Platforms <ArrowRight size={20} />
            </Button>
            <Button href="/partner" variant="orange" size="lg">
              Build With Us <ArrowRight size={20} />
            </Button>
            <Button href="/studio/invest" variant="secondary" size="lg">
              Invest in the Studio
            </Button>
          </div>

          <div className="flex flex-wrap gap-12 pt-8 border-t border-gray-border">
            {STATS.map((stat) => (
              <div key={stat.label}>
                <div className="font-mono text-4xl md:text-5xl font-bold text-accent">{stat.number}</div>
                <div className="text-sm text-gray-light mt-1">{stat.label}</div>
              </div>
            ))}
            <div>
              <div className="font-mono text-4xl md:text-5xl font-bold text-accent">$5K</div>
              <div className="text-sm text-gray-light mt-1">Avg Build Cost</div>
            </div>
            <div>
              <div className="font-mono text-4xl md:text-5xl font-bold text-accent">6-10x</div>
              <div className="text-sm text-gray-light mt-1">Exit Multiple</div>
            </div>
          </div>
        </div>
      </section>

      {/* What Brings You Here - 5 Paths */}
      <section className="section bg-gray-dark">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="tag tag-center mb-4">Choose Your Path</div>
            <h2>What Brings You Here?</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-6">
            {/* Use */}
            <div className="card-green p-8">
              <div className="text-4xl mb-4">🛠️</div>
              <h3 className="text-xl font-bold mb-2">USE</h3>
              <p className="text-gray-light mb-4">I need AI tools that work. Browse 17 platforms. Subscribe.</p>
              <ul className="text-sm text-gray-light space-y-2 mb-6">
                <li>• Voice AI coaching</li>
                <li>• Business intelligence</li>
                <li>• Industry solutions</li>
              </ul>
              <Button href="/marketplace" fullWidth>
                Marketplace → <span className="text-sm font-normal ml-2">from $49/mo</span>
              </Button>
            </div>

            {/* Build */}
            <div className="card-orange p-8">
              <div className="text-4xl mb-4">🤝</div>
              <h3 className="text-xl font-bold mb-2">BUILD</h3>
              <p className="text-gray-light mb-4">I have a problem worth solving. Partner with us. Share the revenue.</p>
              <ul className="text-sm text-gray-light space-y-2 mb-6">
                <li>• You bring the problem</li>
                <li>• We build the solution</li>
                <li>• Revenue share 10-30%</li>
              </ul>
              <Button href="/partner" variant="orange" fullWidth>
                Partner → <span className="text-sm font-normal ml-2">Rev-share</span>
              </Button>
            </div>

            {/* Invest */}
            <div className="card p-8 border-2 border-accent">
              <div className="text-4xl mb-4">💰</div>
              <h3 className="text-xl font-bold mb-2">INVEST</h3>
              <p className="text-gray-light mb-4">I want exposure to AI ventures. Fund the studio. Back 17+ platforms.</p>
              <ul className="text-sm text-gray-light space-y-2 mb-6">
                <li>• Portfolio diversification</li>
                <li>• Cash flow + exits</li>
                <li>• Not hunting unicorns</li>
              </ul>
              <Button href="/studio/invest" fullWidth>
                Invest → <span className="text-sm font-normal ml-2">$25K min</span>
              </Button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Join Team */}
            <div className="card p-8">
              <div className="flex items-start gap-4">
                <div className="text-3xl">🚀</div>
                <div className="flex-grow">
                  <h3 className="text-xl font-bold mb-2">JOIN THE TEAM</h3>
                  <p className="text-gray-light mb-4">
                    Help us build and scale. Equity + upside in every platform you touch.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <span className="text-xs bg-gray-mid px-3 py-1 text-gray-light">DevOps</span>
                    <span className="text-xs bg-gray-mid px-3 py-1 text-gray-light">GTM / Growth</span>
                  </div>
                  <Button href="/studio/join" variant="secondary" className="mt-4">
                    See Open Roles →
                  </Button>
                </div>
              </div>
            </div>

            {/* Community */}
            <div className="card-purple p-8">
              <div className="flex items-start gap-4">
                <div className="text-3xl">🧠</div>
                <div className="flex-grow">
                  <h3 className="text-xl font-bold mb-2">JOIN THE COMMUNITY</h3>
                  <p className="text-gray-light mb-4">
                    Not ready yet? Join &quot;The Easily Distracted&quot; on Skool. Free.
                  </p>
                  <p className="text-sm text-purple-light mb-4">
                    For problem-solvers who can&apos;t ignore mess. Share ideas, find collaborators.
                  </p>
                  <Button href={SKOOL.url} external variant="purple">
                    Join Free on Skool →
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Long Tail Thesis */}
      <section className="section">
        <div className="max-w-4xl mx-auto">
          <div className="tag mb-4">Our Thesis</div>
          <h2 className="mb-8">The Long Tail of AI Solutions</h2>
          
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="p-6 border border-gray-border">
              <h3 className="text-lg font-bold mb-3 text-red-400">❌ Traditional VC</h3>
              <ul className="space-y-2 text-gray-light text-sm">
                <li>• $500K to build one product</li>
                <li>• 18 months to market</li>
                <li>• Need 100x return to matter</li>
                <li>• 90% failure rate</li>
                <li>• Pray for moonshots</li>
              </ul>
            </div>
            <div className="p-6 border-2 border-accent bg-accent/5">
              <h3 className="text-lg font-bold mb-3 text-accent">✓ Long Tail Studio</h3>
              <ul className="space-y-2 text-gray-light text-sm">
                <li>• $5K to build one product</li>
                <li>• 7 days to market</li>
                <li>• Need 50 subscribers to matter</li>
                <li>• Portfolio diversification</li>
                <li>• Moonshots are cream on top</li>
              </ul>
            </div>
          </div>

          <blockquote className="border-l-4 border-accent pl-6 py-4 text-xl text-gray-light italic">
            &quot;Amazon proved you don&apos;t need bestsellers when you have infinite shelf space.
            We&apos;re proving you don&apos;t need unicorns when you can build fast and cheap.&quot;
          </blockquote>

          <div className="mt-8 text-center">
            <Button href="/studio/thesis">Read the Full Thesis →</Button>
          </div>
        </div>
      </section>

      {/* Featured Platforms */}
      <section className="section bg-gray-dark">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-12">
            <div>
              <div className="tag mb-4">Portfolio</div>
              <h2>17 Platforms Built</h2>
            </div>
            <Button href="/studio/portfolio" variant="secondary">
              View All →
            </Button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredPlatforms.map((platform) => (
              <div key={platform.id} className="card">
                <div className="flex justify-between items-start mb-4">
                  <span className="font-mono text-xs text-accent uppercase">{platform.category}</span>
                  {platform.hasVoiceAI && (
                    <span className="text-xs bg-accent/20 text-accent px-2 py-1">Voice AI</span>
                  )}
                </div>
                <h3 className="text-lg font-bold mb-2">{platform.name}</h3>
                <p className="text-sm text-gray-light mb-4">{platform.problem}</p>
                <a
                  href={platform.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-accent hover:text-white transition-colors"
                >
                  View Platform →
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Exit Strategy */}
      <section className="section">
        <div className="max-w-4xl mx-auto text-center">
          <div className="tag tag-center mb-4">The Playbook</div>
          <h2 className="mb-8">Build → Grow → Exit</h2>
          
          <div className="grid grid-cols-4 gap-4 mb-12">
            {[
              { step: 'BUILD', detail: '$5-10K', time: '7 days' },
              { step: 'VALIDATE', detail: '50 subs', time: '6 months' },
              { step: 'GROW', detail: '$1M ARR', time: '18-24 mo' },
              { step: 'EXIT', detail: '6-10x', time: 'Auction' },
            ].map((item, i) => (
              <div key={item.step} className="relative">
                <div className="bg-gray-dark p-4 border border-gray-border">
                  <div className="font-mono text-accent text-xs mb-2">0{i + 1}</div>
                  <div className="font-bold mb-1">{item.step}</div>
                  <div className="text-2xl font-bold text-accent">{item.detail}</div>
                  <div className="text-xs text-gray-light mt-1">{item.time}</div>
                </div>
                {i < 3 && (
                  <div className="hidden md:block absolute top-1/2 -right-2 transform -translate-y-1/2 text-gray-light">
                    →
                  </div>
                )}
              </div>
            ))}
          </div>

          <p className="text-xl text-gray-light mb-8">
            <strong className="text-white">$10K build cost → $6-10M exit.</strong><br />
            We don&apos;t need every platform to exit. We need many to reach $1M ARR.
          </p>

          <div className="flex justify-center gap-4">
            <Button href="/studio/invest">Invest in the Portfolio</Button>
            <Button href="/partner" variant="orange">Bring a Problem</Button>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="section bg-gradient-to-b from-gray-dark to-black">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="mb-6">Ready to Join the Long Tail?</h2>
          <p className="text-xl text-gray-light mb-8">
            Whether you want to use our platforms, build with us, or invest in the studio—
            let&apos;s talk.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button href="/contact" size="lg">Book a Call</Button>
            <Button href={SKOOL.url} external variant="purple" size="lg">
              Join Community Free
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
