import { Metadata } from 'next'
import { Button } from '@/components/ui/Button'
import { PricingCard } from '@/components/ui/PricingCard'
import { PRICING_TIERS, SKOOL } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Pricing',
  description: 'Subscribe to AI platforms from $49/mo or partner with us for revenue sharing.',
}

export default function PricingPage() {
  return (
    <>
      {/* Hero */}
      <section className="section bg-grid">
        <div className="max-w-4xl mx-auto text-center">
          <div className="tag tag-center mb-4">Pricing</div>
          <h1 className="mb-6">Subscribe, Partner, or Join Free</h1>
          <p className="text-xl text-gray-light">
            Access existing platforms monthly, build something new together, or start with our free community.
          </p>
        </div>
      </section>

      {/* Pricing Grid */}
      <section className="section bg-gray-dark">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {PRICING_TIERS.map((tier) => (
              <PricingCard key={tier.name} tier={tier} />
            ))}
          </div>
        </div>
      </section>

      {/* Add-On Pricing */}
      <section className="section">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-8 text-center">Need More Platforms?</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="card text-center">
              <div className="font-mono text-sm text-accent mb-2">STARTER ADD-ON</div>
              <div className="text-3xl font-bold mb-2">+$15<span className="text-sm text-gray-light">/platform</span></div>
              <p className="text-sm text-gray-light">Add extra platforms to your Starter plan</p>
            </div>
            <div className="card text-center">
              <div className="font-mono text-sm text-accent mb-2">BUILDER ADD-ON</div>
              <div className="text-3xl font-bold mb-2">+$12<span className="text-sm text-gray-light">/platform</span></div>
              <p className="text-sm text-gray-light">Add extra platforms to your Builder plan</p>
            </div>
          </div>
          <p className="text-center text-gray-light mt-6">
            Need more than 7? <strong className="text-white">Scale plan gives you all 17 for $199/mo.</strong>
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="section bg-gray-dark">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <div className="tag tag-center mb-4">FAQ</div>
            <h2>Frequently Asked Questions</h2>
          </div>
          <div className="space-y-6">
            {[
              {
                q: 'Can I switch between platforms?',
                a: 'Yes. Starter plan can switch 1 platform/month. Builder can switch 2. Scale has unlimited access to all 17.',
              },
              {
                q: 'How does the revenue share work?',
                a: 'Typical splits range from 10-30% depending on your involvement level. We discuss specifics during the discovery call.',
              },
              {
                q: 'How fast can you build a new platform?',
                a: 'Most platforms go from concept to live in 3-7 days. Complex solutions may take 2-3 weeks.',
              },
              {
                q: 'Do I need technical skills to partner?',
                a: "No. You bring the problem and industry expertise. We handle all the technical work.",
              },
              {
                q: "What if my platform doesn't get subscribers?",
                a: "We both take that risk. That's why we validate together before building. If it doesn't work, you don't owe us anything.",
              },
              {
                q: 'Is there a free trial?',
                a: 'Some platforms offer free trials. RaiseReady Impact is free to try. Contact us for demos of any platform.',
              },
              {
                q: 'Can I cancel anytime?',
                a: 'Yes. All subscriptions are month-to-month. Cancel anytime, no questions asked.',
              },
            ].map((item) => (
              <div key={item.q}>
                <h3 className="font-bold mb-2">{item.q}</h3>
                <p className="text-gray-light">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="mb-4">Still Have Questions?</h2>
          <p className="text-gray-light mb-8">
            Let&apos;s have a quick call. No pressure—just answers.
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Button href="/contact">Book a Call</Button>
            <Button href={SKOOL.url} external variant="purple">
              Join Community Free
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
