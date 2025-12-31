'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { PLATFORMS } from '@/lib/constants'

export default function InvestPage() {
  const [formState, setFormState] = useState({ isSubmitting: false, isSuccess: false })

  const livePlatforms = PLATFORMS.filter(p => p.status === 'live')

  return (
    <>
      {/* Hero */}
      <section className="section bg-grid min-h-[60vh] flex items-center">
        <div className="max-w-4xl mx-auto text-center">
          <div className="tag tag-center mb-4">Investment Opportunity</div>
          <h1 className="mb-6">
            Venture Farming,<br />
            <span className="text-gradient-accent">Not Venture Capital</span>
          </h1>
          <p className="text-2xl text-gray-light">
            We don&apos;t need moonshots. We need many small wins.
            The long tail does the rest.
          </p>
        </div>
      </section>

      {/* The Difference */}
      <section className="section bg-gray-dark">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-8 text-center">The Difference</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-6 border border-gray-border">
              <h3 className="text-lg font-bold mb-4 text-gray-light">Traditional VC</h3>
              <ul className="space-y-3 text-gray-light text-sm">
                <li>Hunt unicorns</li>
                <li>Need 100x returns</li>
                <li>Binary outcomes</li>
                <li>7-10 year liquidity</li>
                <li>High burn, high risk</li>
                <li>Pray for moonshots</li>
              </ul>
            </div>
            <div className="p-6 border-2 border-accent bg-accent/5">
              <h3 className="text-lg font-bold mb-4 text-accent">Long Tail Studio</h3>
              <ul className="space-y-3 text-sm">
                <li>Farm cash cows</li>
                <li>Need 50 subscribers</li>
                <li>Portfolio outcomes</li>
                <li>Cash flow in months</li>
                <li>Low burn, distributed risk</li>
                <li>Moonshots are bonus</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Proof */}
      <section className="section">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div className="tag tag-center mb-4">Proof</div>
            <h2>{livePlatforms.length} Platforms Already Built</h2>
            <p className="text-gray-light mt-4">This isn&apos;t a pitch deck. It&apos;s a portfolio.</p>
          </div>
          <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-4">
            {livePlatforms.map((platform) => (
              <a
                key={platform.id}
                href={platform.url}
                target="_blank"
                rel="noopener noreferrer"
                className="card p-4 text-center hover:border-accent transition-colors"
              >
                <div className="font-bold text-sm mb-1">{platform.name}</div>
                <div className="status-live text-xs justify-center">Live</div>
              </a>
            ))}
          </div>
          <div className="grid md:grid-cols-3 gap-6 mt-8 text-center">
            <div className="card">
              <div className="font-mono text-sm text-accent mb-2">AVG BUILD COST</div>
              <div className="text-3xl font-bold">$5,000</div>
            </div>
            <div className="card">
              <div className="font-mono text-sm text-accent mb-2">AVG BUILD TIME</div>
              <div className="text-3xl font-bold">7 days</div>
            </div>
            <div className="card">
              <div className="font-mono text-sm text-accent mb-2">TOTAL INVESTED</div>
              <div className="text-3xl font-bold">~$85K</div>
            </div>
          </div>
        </div>
      </section>

      {/* The Economics */}
      <section className="section bg-gray-dark">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-8 text-center">The Economics</h2>
          
          <div className="card p-8 mb-8">
            <h3 className="font-bold mb-6">Per Platform</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="flex justify-between"><span className="text-gray-light">Build + GTM:</span> <span className="font-mono">$10,000</span></div>
                <div className="flex justify-between"><span className="text-gray-light">Break-even:</span> <span className="font-mono">50 subs × $50 = $2,500 MRR</span></div>
                <div className="flex justify-between"><span className="text-gray-light">Payback:</span> <span className="font-mono">4 months</span></div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between"><span className="text-gray-light">Target ARR:</span> <span className="font-mono">$1M</span></div>
                <div className="flex justify-between"><span className="text-gray-light">Exit multiple:</span> <span className="font-mono">6-10x</span></div>
                <div className="flex justify-between"><span className="text-gray-light">Exit value:</span> <span className="font-mono text-accent">$6-10M</span></div>
              </div>
            </div>
          </div>

          <div className="card p-8">
            <h3 className="font-bold mb-6">5-Year Portfolio (100 platforms)</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-red-500/10 border border-red-500/30">
                <span>20% fail</span>
                <span className="font-mono text-red-400">-$200K</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-mid">
                <span>50% break even</span>
                <span className="font-mono">$0</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-accent/10 border border-accent/30">
                <span>25% steady earners ($10K MRR each)</span>
                <span className="font-mono text-accent">$250K MRR</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-accent/10 border border-accent/30">
                <span>5% breakouts ($50K+ MRR each)</span>
                <span className="font-mono text-accent">$250K+ MRR</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-accent text-black font-bold">
                <span>Total Portfolio</span>
                <span className="font-mono">$500K+ MRR = $6M+ ARR</span>
              </div>
            </div>
            <p className="text-center text-gray-light mt-4">+ Exits at 6-10x = $30-70M+ over 5 years</p>
          </div>
        </div>
      </section>

      {/* Three Return Mechanisms */}
      <section className="section">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-8 text-center">Three Return Mechanisms</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="card p-6">
              <div className="font-mono text-sm text-accent mb-2">CASH FLOW</div>
              <h3 className="font-bold mb-2">Monthly</h3>
              <p className="text-sm text-gray-light mb-4">Marketplace subscriptions compound. Quarterly distributions to investors.</p>
              <div className="text-2xl font-bold">$49-199/mo</div>
            </div>
            <div className="card-orange p-6">
              <div className="font-mono text-sm text-orange mb-2">REV-SHARE</div>
              <h3 className="font-bold mb-2">Ongoing</h3>
              <p className="text-sm text-gray-light mb-4">Partners earn 10-30%, studio earns 70-90%. Aligned incentives.</p>
              <div className="text-2xl font-bold">70-90%</div>
            </div>
            <div className="card-purple p-6">
              <div className="font-mono text-sm text-purple mb-2">EXITS</div>
              <h3 className="font-bold mb-2">Liquidity Events</h3>
              <p className="text-sm text-gray-light mb-4">Auction platforms at $1M ARR to corporates.</p>
              <div className="text-2xl font-bold">6-10x ARR</div>
            </div>
          </div>
        </div>
      </section>

      {/* The Raise */}
      <section className="section bg-gray-dark">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-8 text-center">The Raise</h2>
          <div className="card p-8">
            <div className="grid md:grid-cols-3 gap-6 mb-8 text-center">
              <div>
                <div className="font-mono text-sm text-accent mb-2">AMOUNT</div>
                <div className="text-2xl font-bold">$150K-$300K</div>
              </div>
              <div>
                <div className="font-mono text-sm text-accent mb-2">MINIMUM</div>
                <div className="text-2xl font-bold">$25,000</div>
              </div>
              <div>
                <div className="font-mono text-sm text-accent mb-2">STRUCTURE</div>
                <div className="text-2xl font-bold">SAFE</div>
              </div>
            </div>
            
            <h3 className="font-bold mb-4">Use of Funds</h3>
            <div className="space-y-3 mb-8">
              <div className="flex justify-between items-center">
                <span>40% DevOps</span>
                <span className="text-gray-light text-sm">Faster builds, platform hardening</span>
              </div>
              <div className="flex justify-between items-center">
                <span>40% GTM</span>
                <span className="text-gray-light text-sm">Find 50 subscribers per platform</span>
              </div>
              <div className="flex justify-between items-center">
                <span>20% Pipeline</span>
                <span className="text-gray-light text-sm">Validate next 30 problems</span>
              </div>
            </div>

            <h3 className="font-bold mb-4">Investor Returns</h3>
            <ul className="space-y-2 text-gray-light">
              <li className="flex items-center gap-2"><span className="text-accent">✓</span> Studio equity with quarterly distributions</li>
              <li className="flex items-center gap-2"><span className="text-accent">✓</span> Pro-rata on exit proceeds</li>
              <li className="flex items-center gap-2"><span className="text-accent">✓</span> No 10-year lockup—liquidity from exits in 24 months</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Ideal Investor */}
      <section className="section">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-8 text-center">Ideal Investor</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-bold mb-4 text-accent">You&apos;re a fit if:</h3>
              <ul className="space-y-2 text-gray-light">
                <li className="flex items-start gap-2"><span className="text-accent">✓</span> You understand portfolio theory</li>
                <li className="flex items-start gap-2"><span className="text-accent">✓</span> You prefer cash flow to moonshot prayers</li>
                <li className="flex items-start gap-2"><span className="text-accent">✓</span> You&apos;ve seen traditional VC math fail</li>
                <li className="flex items-start gap-2"><span className="text-accent">✓</span> You want AI exposure without unicorn risk</li>
                <li className="flex items-start gap-2"><span className="text-accent">✓</span> You can invest $25K-$100K</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4 text-red-400">Not a fit if:</h3>
              <ul className="space-y-2 text-gray-light">
                <li className="flex items-start gap-2"><span className="text-red-400">✗</span> You need 100x returns to get excited</li>
                <li className="flex items-start gap-2"><span className="text-red-400">✗</span> You only invest in Series A+</li>
                <li className="flex items-start gap-2"><span className="text-red-400">✗</span> You want board seats and control</li>
                <li className="flex items-start gap-2"><span className="text-red-400">✗</span> You need quick liquidity (12 months)</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section bg-gray-dark">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="mb-4">Ready to Talk?</h2>
          <p className="text-xl text-gray-light mb-8">
            &quot;We&apos;re not hunting unicorns. We&apos;re farming exits.&quot;
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Button href="/contact?type=investor">Book an Investor Call</Button>
            <Button href="mailto:invest@corporateaisolutions.com" variant="secondary">
              Email: invest@corporateaisolutions.com
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
