'use client'

import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Phone, Mail, MapPin } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { SITE } from '@/lib/constants'

export default function ContactPage() {
  const searchParams = useSearchParams()
  const type = searchParams.get('type') || 'general'
  const plan = searchParams.get('plan')
  const waitlist = searchParams.get('waitlist')

  const [formState, setFormState] = useState({ isSubmitting: false, isSuccess: false })
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    type: type,
    message: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormState({ isSubmitting: true, isSuccess: false })
    await new Promise(r => setTimeout(r, 1000))
    setFormState({ isSubmitting: false, isSuccess: true })
  }

  const getTitle = () => {
    if (type === 'investor') return 'Investor Inquiry'
    if (type === 'referral') return 'Referral'
    if (plan) return `Subscribe to ${plan.charAt(0).toUpperCase() + plan.slice(1)} Plan`
    if (waitlist) return `Join Waitlist for ${waitlist}`
    return 'Get in Touch'
  }

  return (
    <>
      {/* Hero */}
      <section className="section bg-grid">
        <div className="max-w-4xl mx-auto text-center">
          <div className="tag tag-center mb-4">Contact</div>
          <h1 className="mb-6">{getTitle()}</h1>
          <p className="text-xl text-gray-light">
            Let&apos;s talk about how we can work together.
          </p>
        </div>
      </section>

      {/* Contact Info + Form */}
      <section className="section bg-gray-dark">
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h2 className="text-xl font-bold mb-6">Direct Contact</h2>
                <div className="space-y-4">
                  <a 
                    href={`tel:${SITE.phone}`} 
                    className="flex items-center gap-3 text-gray-light hover:text-accent transition-colors"
                  >
                    <Phone size={20} />
                    {SITE.phoneFormatted}
                  </a>
                  <a 
                    href={`mailto:${SITE.email}`}
                    className="flex items-center gap-3 text-gray-light hover:text-accent transition-colors"
                  >
                    <Mail size={20} />
                    {SITE.email}
                  </a>
                  <div className="flex items-start gap-3 text-gray-light">
                    <MapPin size={20} className="mt-1" />
                    <div>
                      <p>{SITE.location}</p>
                      <p className="text-sm">{SITE.company}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-bold mb-4">Quick Links</h3>
                <div className="space-y-2">
                  <Button href="/marketplace" variant="secondary" size="sm" fullWidth>
                    Browse Platforms
                  </Button>
                  <Button href="/partner" variant="orange" size="sm" fullWidth>
                    Partnership Inquiry
                  </Button>
                  <Button href="/studio/invest" variant="secondary" size="sm" fullWidth>
                    Investor Inquiry
                  </Button>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-2">
              {formState.isSuccess ? (
                <div className="card-green p-8 text-center">
                  <div className="text-4xl mb-4">✓</div>
                  <h3 className="text-xl font-bold mb-2">Message Sent!</h3>
                  <p className="text-gray-light">We&apos;ll get back to you within 24-48 hours.</p>
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
                      <label className="label">Inquiry Type *</label>
                      <select
                        required
                        className="input"
                        value={formData.type}
                        onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                      >
                        <option value="general">General Inquiry</option>
                        <option value="subscribe">Subscribe to Platforms</option>
                        <option value="partner">Partnership / Revenue Share</option>
                        <option value="investor">Investment Opportunity</option>
                        <option value="team">Join the Team</option>
                        <option value="media">Media / Press</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="label">Message *</label>
                    <textarea
                      required
                      className="textarea"
                      placeholder="Tell us what you're looking for..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    />
                  </div>

                  <Button type="submit" fullWidth disabled={formState.isSubmitting}>
                    {formState.isSubmitting ? 'Sending...' : 'Send Message →'}
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Book a Call */}
      <section className="section">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="mb-4">Prefer to Talk?</h2>
          <p className="text-gray-light mb-8">
            Book a 15-30 minute call. No pressure—just a conversation.
          </p>
          <div className="flex justify-center gap-4">
            <Button href={`tel:${SITE.phone}`} size="lg">
              Call Now: {SITE.phoneFormatted}
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
