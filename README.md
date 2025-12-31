# Long Tail AI Studio

> Build to $1M ARR. Auction for 6-10x. Repeat.

## 🚀 Quick Start

```bash
# 1. Clone and install
git clone <repo>
cd longtail-web
npm install

# 2. Configure environment
cp .env.example .env.local
# Fill in your Supabase, Stripe, ElevenLabs keys

# 3. Run automated setup (creates products, agents, configures integrations)
npm run setup

# 4. Run database migration
# Copy supabase/migrations/001_initial_schema.sql to Supabase SQL Editor

# 5. Start development
npm run dev
```

## 🔧 Automated Setup Scripts

| Command | What it does |
|---------|--------------|
| `npm run setup` | Interactive setup wizard (runs all below) |
| `npm run setup:vercel` | Configures Vercel env vars + Supabase auth URLs |
| `npm run setup:stripe` | Creates products, prices, webhook in Stripe |
| `npm run setup:elevenlabs` | Creates 4 voice agents with system prompts |

### What gets auto-configured:

**Stripe** (`npm run setup:stripe`)
- 4 subscription products (Community, Starter, Builder, Scale)
- Monthly prices ($0, $49, $99, $199)
- Credit top-up packages (50, 150, 500 credits)
- Webhook endpoint for your domain
- Customer portal configuration

**ElevenLabs** (`npm run setup:elevenlabs`)
- Alex (homepage, pricing, contact)
- Scout (marketplace, portfolio)
- Morgan (partner, invest, join)
- Victoria (investor qualification)

**Vercel-Supabase** (`npm run setup:vercel`)
- Sets Supabase env vars in Vercel
- Outputs Supabase Auth redirect URLs to configure
- Generates complete .env template

## 📦 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **Payments**: Stripe
- **Voice AI**: ElevenLabs
- **Deployment**: Vercel

## 🗂️ Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Homepage
│   ├── marketplace/       # Platform marketplace
│   ├── partner/           # Partnership applications
│   ├── pricing/           # Pricing tiers
│   ├── community/         # Skool community
│   ├── contact/           # Contact form
│   ├── voice-ai/          # Voice AI approach
│   ├── studio/            # Studio section
│   │   ├── thesis/        # Long tail thesis
│   │   ├── portfolio/     # Platform portfolio
│   │   ├── invest/        # Investor page
│   │   └── join/          # Team applications
│   └── api/               # API routes
│       ├── leads/
│       ├── waitlist/
│       └── voice/
├── components/
│   ├── layout/            # Header, Footer
│   ├── ui/                # Button, Card, etc.
│   └── voice/             # Voice agent widget
├── lib/                   # Utilities
│   ├── constants.ts       # Site config, platforms
│   ├── supabase.ts        # Supabase client
│   └── elevenlabs.ts      # Voice AI utilities
├── styles/
│   └── globals.css        # Tailwind + custom styles
└── types/
    └── index.ts           # TypeScript types
```

## 🎯 Site Architecture

### 6 Paths for Visitors

| Path | Audience | Goal | CTA |
|------|----------|------|-----|
| **Use** | SMBs, Founders | Subscribe to platforms | Marketplace |
| **Build** | Industry experts | Revenue-share partnership | Partner |
| **Invest** | Angels, Family offices | Fund the studio | Invest |
| **Join Team** | Engineers, Marketers | DevOps + GTM roles | Apply |
| **Community** | Curious builders | Free Skool group | Join |
| **Learn** | Everyone | Understand the thesis | Thesis |

### The Long Tail Thesis

- **Build cost**: $5-10K per platform (7 days)
- **Break-even**: 50 subscribers × $50/mo = $2,500 MRR
- **Target exit**: $1M ARR → 6-10x multiple → $6-10M
- **Portfolio approach**: Many small wins > unicorn hunting

## 🔧 Environment Variables

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# ElevenLabs
NEXT_PUBLIC_ELEVENLABS_API_KEY=
ELEVENLABS_AGENT_ID_ALEX=
ELEVENLABS_AGENT_ID_SCOUT=
ELEVENLABS_AGENT_ID_MORGAN=

# Skool
NEXT_PUBLIC_SKOOL_URL=https://www.skool.com/the-easily-distracted-5598

# Site
NEXT_PUBLIC_SITE_URL=https://corporateaisolutions.com
NEXT_PUBLIC_CONTACT_EMAIL=hello@corporateaisolutions.com
NEXT_PUBLIC_CONTACT_PHONE=+61402612471
```

## 💾 Database Setup

1. Create a new Supabase project
2. Run the migration in `supabase/migrations/001_initial_schema.sql`
3. Copy your API keys to `.env.local`

### Tables

- `leads` - All lead captures
- `voice_conversations` - Voice agent transcripts
- `waitlist` - Platform waitlist signups
- `team_applications` - DevOps/GTM applications
- `investor_leads` - Investor inquiries
- `partnership_applications` - Partner proposals
- `subscriptions` - (Future) Stripe subscriptions

## 🎙️ Voice Agents

Three agents with different personalities:

| Agent | Pages | Personality |
|-------|-------|-------------|
| **Alex** | Homepage, Pricing, Contact | Friendly, direct |
| **Scout** | Marketplace, Solutions | Curious, helpful |
| **Morgan** | Partner, Invest | Professional, consultative |

## 🚀 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

Or connect your GitHub repo to Vercel for automatic deployments.

### Environment Variables on Vercel

Add all variables from `.env.example` in your Vercel project settings.

## 📊 17 Live Platforms

1. **RaiseReady Impact** - AI pitch coaching
2. **TenderWatch** - Government tender monitoring
3. **TourLingo** - Multi-language tourism
4. **Rehearsals.ai** - Universal rehearsal platform
5. **Deal Findrs** - Deal aggregation
6. **Soxton Law AI** - Legal practice tools
7. **Lionhearted Business Online** - Business coaching
8. **Creative Action Consulting** - Consulting platform
9. **Ether Software** - Software company showcase
... and more

## 💰 Pricing Model

| Tier | Price | Platforms | Target |
|------|-------|-----------|--------|
| Community | Free | 0 | Curious |
| Starter | $49/mo | Any 3 | Individual |
| Builder | $99/mo | Any 7 | Power user |
| Scale | $199/mo | All 17 | Team/Agency |
| Partner | Rev-share | Build new | Industry expert |

## 📈 Revenue Streams

1. **Marketplace subscriptions** - $49-199/mo recurring
2. **Revenue share** - 70-90% of partner platforms
3. **Exits** - Auction at $1M ARR for 6-10x

## 🤝 Contributing

This is a private project for Corporate AI Solutions.

## 📄 License

Proprietary - © 2024 Global Buildtech Australia Pty Ltd

---

**"We don't need unicorns. We need 50 subscribers per platform. The long tail does the rest."**
