import { Platform, PricingTier, NavItem, VoiceAgentConfig } from '@/types'

// Site info
export const SITE = {
  name: 'Corporate AI Solutions',
  tagline: "Got a problem? We've probably solved it. If not, let's build it together.",
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://corporateaisolutions.com',
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'hello@corporateaisolutions.com',
  phone: process.env.NEXT_PUBLIC_CONTACT_PHONE || '+61402612471',
  phoneFormatted: '+61 402 612 471',
  company: 'Global Buildtech Australia Pty Ltd',
  abn: '54 672 395 685',
  location: 'Brisbane, Queensland, Australia',
}

// Skool community
export const SKOOL = {
  url: process.env.NEXT_PUBLIC_SKOOL_URL || 'https://www.skool.com/the-easily-distracted-5598',
  name: 'The Easily Distracted',
  tagline: 'No Funnels. No Gurus. Just Problems Worth Solving.',
  description: 'A community for late-night thinkers, chaos navigators, and real-world fixers who can\'t ignore a problem once they see it.',
}

// Navigation
export const NAV_ITEMS: NavItem[] = [
  {
    label: 'Solutions',
    href: '/solutions',
    children: [
      { label: 'All Solutions', href: '/solutions' },
      { label: 'High-Stakes Performance', href: '/solutions#performance' },
      { label: 'Business Intelligence', href: '/solutions#intelligence' },
      { label: 'Industry Solutions', href: '/solutions#industry' },
    ],
  },
  { label: 'Partner', href: '/partner' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Community', href: '/community' },
  {
    label: 'About',
    href: '/about',
    children: [
      { label: 'Our Story', href: '/about' },
      { label: 'Voice AI Approach', href: '/voice-ai' },
      { label: 'Investors', href: '/invest-in-the-future-of-ai' },
    ],
  },
]

// All platforms
export const PLATFORMS: Platform[] = [
  // High-Stakes Performance
  {
    id: 'raiseready',
    name: 'RaiseReady Impact',
    slug: 'raiseready',
    tagline: 'Practice your pitch with AI investors',
    problem: 'Founders bomb investor pitches',
    description: 'Practice your pitch with AI investors—skeptical, supportive, technical, or impact-focused. Voice coaching with ElevenLabs. Real-time feedback with Claude AI. Match with investors when you\'re ready.',
    url: 'https://raiseready-six.vercel.app',
    status: 'live',
    category: 'performance',
    hasVoiceAI: true,
    featured: true,
  },
  {
    id: 'rehearsals',
    name: 'Rehearsals.ai',
    slug: 'rehearsals',
    tagline: 'Universal rehearsal platform',
    problem: 'Any high-stakes moment',
    description: 'Universal rehearsal platform. Same core technology, infinite applications.',
    url: 'https://rehearsals-ai.vercel.app',
    status: 'live',
    category: 'performance',
    hasVoiceAI: true,
  },
  {
    id: 'interviews',
    name: 'Universal Interviews',
    slug: 'interviews',
    tagline: 'Practice job interviews with AI',
    problem: 'Job interview anxiety',
    description: 'Practice job interviews with AI personas. Get feedback. Match with employers when ready.',
    url: '#',
    status: 'building',
    category: 'performance',
    hasVoiceAI: true,
  },
  
  // Business Intelligence
  {
    id: 'tenderwatch',
    name: 'TenderWatch',
    slug: 'tenderwatch',
    tagline: 'AI-powered government tender monitoring',
    problem: 'Missing government tenders',
    description: 'AI-powered government tender monitoring. Never miss a relevant RFP. Automated alerts matching your capabilities.',
    url: 'https://tenderwatch-alpha.vercel.app',
    status: 'live',
    category: 'intelligence',
    hasVoiceAI: false,
  },
  {
    id: 'dealfindrs',
    name: 'Deal Findrs',
    slug: 'deal-findrs',
    tagline: 'AI deal aggregation',
    problem: 'Deals buried across sources',
    description: 'AI aggregation that surfaces deals, opportunities, and market intelligence from multiple sources.',
    url: 'https://deal-findrs.vercel.app',
    status: 'live',
    category: 'intelligence',
    hasVoiceAI: false,
  },
  
  // Industry Solutions
  {
    id: 'tourlingo',
    name: 'TourLingo',
    slug: 'tourlingo',
    tagline: 'Multi-language tourism platform',
    problem: 'Tour operators serving international visitors',
    description: 'Multi-language tourism platform with operator portal. AI-powered translation and booking management. Complete dual-app ecosystem for tour operators and travelers.',
    url: 'https://tour-lingo.vercel.app',
    status: 'live',
    category: 'industry',
    hasVoiceAI: true,
    featured: true,
  },
  {
    id: 'soxton',
    name: 'Soxton Law AI',
    slug: 'soxton-law',
    tagline: 'AI-enhanced legal practice tools',
    problem: 'Legal research takes too long',
    description: 'AI-enhanced legal practice tools. Document analysis, case research, client communication automation.',
    url: 'https://soxton-law-ai.vercel.app',
    status: 'live',
    category: 'industry',
    hasVoiceAI: true,
  },
  {
    id: 'lionhearted',
    name: 'Lionhearted Business Online',
    slug: 'lionhearted',
    tagline: 'Business coaching platform',
    problem: 'Scaling business coaching',
    description: 'Business coaching platform with AI-enhanced learning modules and progress tracking.',
    url: 'https://lionhearted-business-online.vercel.app',
    status: 'live',
    category: 'industry',
    hasVoiceAI: false,
  },
  {
    id: 'creativeaction',
    name: 'Creative Action Consulting',
    slug: 'creative-action',
    tagline: 'Consulting firm digital presence',
    problem: 'Client engagement in consulting',
    description: 'Consulting firm digital presence with AI-powered service recommendations and client portal.',
    url: 'https://creative-action-consulting.vercel.app',
    status: 'live',
    category: 'industry',
    hasVoiceAI: false,
  },
  {
    id: 'ether',
    name: 'Ether Software',
    slug: 'ether-software',
    tagline: 'Software company showcase',
    problem: 'Software company showcase',
    description: 'Software development company website with project showcase and client engagement tools.',
    url: 'https://ether-software.vercel.app',
    status: 'live',
    category: 'industry',
    hasVoiceAI: false,
  },
]

// Pricing tiers
export const PRICING_TIERS: PricingTier[] = [
  {
    name: 'Community',
    price: 'Free',
    description: 'Join The Easily Distracted. Share problems, find collaborators.',
    features: [
      'Skool community access',
      'Share problems & ideas',
      'Find potential collaborators',
      'Learn in public',
      'No commitment',
    ],
    cta: {
      label: 'Join Free',
      href: SKOOL.url,
    },
    variant: 'default',
  },
  {
    name: 'Starter',
    price: '$49',
    period: '/mo',
    description: 'Access one platform. Perfect for trying out a specific solution.',
    features: [
      '1 platform access',
      'Unlimited usage',
      'Email support',
      'All future updates',
      'Switch platforms monthly',
    ],
    cta: {
      label: 'Get Started',
      href: '/contact?plan=starter',
    },
    variant: 'default',
  },
  {
    name: 'Pro',
    price: '$199',
    period: '/mo',
    description: 'Full access to all 17 platforms. Best value for power users.',
    features: [
      'All 17 platforms',
      'Unlimited usage',
      'Priority support',
      'Early access to new platforms',
      'API access where available',
      'Custom integrations',
    ],
    cta: {
      label: 'Get Full Access',
      href: '/contact?plan=pro',
    },
    variant: 'featured',
  },
  {
    name: 'Partner',
    price: 'Rev Share',
    description: 'Build something new together. You bring the problem, we build the solution.',
    features: [
      'Custom solution built for you',
      'Ongoing revenue share (10-30%)',
      'Your name on the product',
      'Direct collaboration',
      'Built in days, not months',
      'No upfront cost',
    ],
    cta: {
      label: "Let's Talk",
      href: '/partner',
    },
    variant: 'partner',
  },
]

// Voice agent configuration - Natasha
export const NATASHA_AGENT = {
  agentId: 'agent_01jwc8jtrpebsb4y3bq1agrgg4',
  name: 'Natasha',
  personality: 'Confident, professional, relentlessly helpful',
  role: 'Sales Development Representative',
  greeting: "Hi! Thanks for visiting. I'm Natasha, from Corporate AI Solutions. What brought you to us today and what are you hoping to achieve?",
}

// Legacy agent configs (kept for potential future multi-agent setup)
export const VOICE_AGENTS: Record<string, VoiceAgentConfig> = {
  natasha: {
    agentId: NATASHA_AGENT.agentId,
    name: NATASHA_AGENT.name,
    personality: NATASHA_AGENT.personality,
    greeting: NATASHA_AGENT.greeting,
    pageContext: 'all',
    canRoute: {
      solutions: true,
      partner: true,
      community: true,
      pricing: true,
    },
  },
}

// Stats for homepage
export const STATS = [
  { number: '17', label: 'Platforms Built' },
  { number: '72h', label: 'Average Build Time' },
  { number: '35+', label: 'Years Experience' },
]

// Process steps
export const PROCESS_STEPS = [
  {
    number: '01',
    title: 'Learn the Problem',
    description: 'Deep dive into your industry, pain points, and existing workflows. We don\'t build generic solutions—we build YOUR solution.',
    time: 'Day 1',
  },
  {
    number: '02',
    title: 'Define the Solution',
    description: 'Map the user journey, identify AI integration points, and architect a system that actually solves the problem—not just looks good in a demo.',
    time: 'Day 1-2',
  },
  {
    number: '03',
    title: 'Build It Fast',
    description: 'Next.js, Vercel, Supabase, Claude AI, ElevenLabs. Modern stack. Rapid iteration. Working software, not wireframes.',
    time: 'Day 2-4',
  },
  {
    number: '04',
    title: 'Ship & Iterate',
    description: 'Deploy to production. Real users. Real feedback. Continuous improvement. Your solution gets better every day.',
    time: 'Day 5+',
  },
]
