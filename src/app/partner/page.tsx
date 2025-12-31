'use client'

import { useState } from 'react'
import { Metadata } from 'next'
import { Button } from '@/components/ui/Button'
import { SKOOL } from '@/lib/constants'

export default function PartnerPage() {
  const [formState, setFormState] = useState({ isSubmitting: false, isSuccess: false })
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', industry: '', problem: '', whyYou: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormState({ isSubmitting: true, isSuccess: false })
    // API call would go here
    await new Promise(r => setTimeout(r, 1000))
    setFormState({ isSubmitting: false, isSuccess: true })
  }

  return (
    <>
      {/* Hero */}
      <section className="section bg-grid min-h-[60vh] flex items-center">
        <div className="max-w-4xl mx-auto text-center">
          <div className="tag tag-center mb-4">Partnership Model</div>
          <h1 className="mb-6">
            Your Problem Is <span className="text-gradient-orange">Different?</span><br />
            Even Better.
          </h1>
          <p className="text-xl text-gray-light">
            You bring the problem. We build the solution. And because you showed us what to build—
            <strong className="text-white"> we share the revenue with you.</strong>
          </p>
        </div>
      </section>

      {/* Revenue Share Model */}
      <section className="section bg-gray-dark">
        <div className="max-w-3xl mx-auto">
          <div className="card-orange p-8 md:p-12">
            <h2 className="text-2xl font-bold mb-6 text-orange">🤝 The Revenue Share Model</h2>
            <p className="text-gray-light mb-4">
              You&apos;ve identified a problem that needs solving. That&apos;s valuable. You understand the industry, 
              the pain points, the users. We have the AI expertise and the ability to build fast. 
              <strong className="text-white"> Together, we create something neither could alone.</strong>
            </p>
            <p className="text-gray-light mb-8">
              You become a co-owner of the solution. When others subscribe, you earn. 
              <strong className="text-white"> Your problem becomes your passive income stream.</strong>
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { num: '01', text: 'You describe the problem' },
                { num: '02', text: 'We define the solution together' },
                { num: '03', text: 'We build it (fast)' },
                { num: '04', text: 'Revenue is shared' },
              ].map((step) => (
                <div key={step.num} className="text-center">
                  <div className="font-mono text-3xl font-bold text-orange mb-2">{step.num}</div>
                  <div className="text-sm text-gray-light">{step.text}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* The Math */}
      <section className="section">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-8 text-center">The Economics</h2>
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div className="card">
              <div className="font-mono text-3xl font-bold text-accent mb-2">10-30%</div>
              <div className="text-gray-light">Your revenue share</div>
            </div>
            <div className="card">
              <div className="font-mono text-3xl font-bold text-accent mb-2">$0</div>
              <div className="text-gray-light">Upfront cost to you</div>
            </div>
            <div className="card">
              <div className="font-mono text-3xl font-bold text-accent mb-2">7 days</div>
              <div className="text-gray-light">Typical build time</div>
            </div>
          </div>
          <p className="text-center text-gray-light mt-8">
            Example: Platform earns $10K MRR → You earn $1K-3K/month. Passive income from your insight.
          </p>
        </div>
      </section>

      {/* Ideal Partner */}
      <section className="section bg-gray-dark">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <div className="tag tag-center mb-4">What Makes a Good Partnership</div>
            <h2>Ideal Partnership Fit</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { title: 'You deeply understand the problem', desc: "You've lived it or researched it extensively." },
              { title: 'You have access to potential customers', desc: 'Your network can help validate and adopt.' },
              { title: 'The problem is real and recurring', desc: 'Not a one-time issue—affects many people.' },
              { title: "You're willing to help promote", desc: 'Partnership means collaboration on GTM.' },
            ].map((item) => (
              <div key={item.title} className="flex gap-4">
                <span className="text-orange text-xl">✓</span>
                <div>
                  <h3 className="font-bold mb-1">{item.title}</h3>
                  <p className="text-sm text-gray-light">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partnership Form */}
      <section className="section">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <div className="tag tag-center mb-4">Get Started</div>
            <h2>Tell Us About Your Problem</h2>
            <p className="text-gray-light mt-4">
              We&apos;ll review and reach out within 48 hours to discuss.
            </p>
          </div>

          {formState.isSuccess ? (
            <div className="card-green p-8 text-center">
              <div className="text-4xl mb-4">✓</div>
              <h3 className="text-xl font-bold mb-2">Partnership Request Received!</h3>
              <p className="text-gray-light">
                We&apos;ll review your submission and reach out within 48 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="card p-8 space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="label">Your Name *</label>
                  <input
                    type="text"
                    required
                    className="input"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div>
                  <label className="label">Email *</label>
                  <input
                    type="email"
                    required
                    className="input"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="label">Phone</label>
                  <input
                    type="tel"
                    className="input"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
                <div>
                  <label className="label">Your Industry *</label>
                  <input
                    type="text"
                    required
                    className="input"
                    value={formData.industry}
                    onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                  />
                </div>
              </div>
              <div>
                <label className="label">Describe the problem you see *</label>
                <textarea
                  required
                  className="textarea"
                  placeholder="What's the pain point? Who experiences it? How often?"
                  value={formData.problem}
                  onChange={(e) => setFormData({ ...formData, problem: e.target.value })}
                />
              </div>
              <div>
                <label className="label">Why are you the right partner for this?</label>
                <textarea
                  className="textarea"
                  placeholder="Your experience, network, unique insight..."
                  value={formData.whyYou}
                  onChange={(e) => setFormData({ ...formData, whyYou: e.target.value })}
                />
              </div>
              <Button type="submit" variant="orange" fullWidth disabled={formState.isSubmitting}>
                {formState.isSubmitting ? 'Submitting...' : 'Submit Partnership Request →'}
              </Button>
            </form>
          )}
        </div>
      </section>

      {/* Not Ready CTA */}
      <section className="section bg-gray-dark">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="mb-4">Not Ready to Pitch Yet?</h2>
          <p className="text-gray-light mb-8">
            Join &quot;The Easily Distracted&quot; — share your half-formed idea, get feedback, and see if it&apos;s worth building.
          </p>
          <Button href={SKOOL.url} external variant="purple">
            Join the Community First →
          </Button>
        </div>
      </section>
    </>
  )
}
