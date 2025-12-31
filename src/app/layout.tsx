import type { Metadata } from 'next'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { VoiceAgent } from '@/components/voice/VoiceAgent'
import '@/styles/globals.css'

export const metadata: Metadata = {
  title: {
    default: 'Long Tail AI Studio | Build to $1M ARR. Auction for 6-10x. Repeat.',
    template: '%s | Long Tail AI Studio',
  },
  description: 'We turn problems into platforms. 17 platforms built. Subscribe to existing solutions or partner to build yours.',
  openGraph: {
    type: 'website',
    locale: 'en_AU',
    url: 'https://corporateaisolutions.com',
    siteName: 'Long Tail AI Studio',
    title: 'Long Tail AI Studio | Venture Farming, Not Venture Capital',
    description: 'Build cheap. Grow to $1M ARR. Auction for 6-10x. Repeat.',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow pt-16">{children}</main>
        <Footer />
        <VoiceAgent />
      </body>
    </html>
  )
}
