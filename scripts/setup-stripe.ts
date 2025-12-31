#!/usr/bin/env node
/**
 * Stripe Products & Prices Setup Script
 * 
 * Run: npx ts-node scripts/setup-stripe.ts
 * 
 * Requires: STRIPE_SECRET_KEY in .env.local
 * 
 * Creates:
 * - 4 subscription products (Community, Starter, Builder, Scale)
 * - Monthly prices for each
 * - Webhook endpoint for your domain
 */

import Stripe from 'stripe'
import * as dotenv from 'dotenv'
import * as fs from 'fs'
import * as path from 'path'

dotenv.config({ path: '.env.local' })

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://corporateaisolutions.com'

if (!STRIPE_SECRET_KEY) {
  console.error('❌ Missing STRIPE_SECRET_KEY in .env.local')
  process.exit(1)
}

const stripe = new Stripe(STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16',
})

// Product configurations
const PRODUCTS = [
  {
    name: 'Community',
    description: 'Free access to The Easily Distracted Skool community',
    price: 0,
    features: [
      'Skool community access',
      'Share problems, get feedback',
      'Find collaborators',
      'No platform access',
    ],
    metadata: {
      tier: 'community',
      platforms_included: '0',
      credits: '0',
    },
  },
  {
    name: 'Starter',
    description: 'Access any 3 AI platforms with 50 monthly credits',
    price: 4900, // $49.00 in cents
    features: [
      'Any 3 platforms',
      '50 credits/month',
      'Email support',
      'Switch 1 platform/month',
    ],
    metadata: {
      tier: 'starter',
      platforms_included: '3',
      credits: '50',
      additional_platform_price: '1500', // $15
    },
  },
  {
    name: 'Builder',
    description: 'Access any 7 AI platforms with 150 monthly credits',
    price: 9900, // $99.00
    features: [
      'Any 7 platforms',
      '150 credits/month',
      'Priority support',
      'Switch 2 platforms/month',
    ],
    metadata: {
      tier: 'builder',
      platforms_included: '7',
      credits: '150',
      additional_platform_price: '1200', // $12
    },
  },
  {
    name: 'Scale',
    description: 'Access all 17 AI platforms with 500 monthly credits',
    price: 19900, // $199.00
    features: [
      'All 17 platforms',
      '500 credits/month',
      'Dedicated support',
      'Unlimited switching',
      'Early access to new platforms',
    ],
    metadata: {
      tier: 'scale',
      platforms_included: '17',
      credits: '500',
    },
  },
]

// Credit top-up packages
const CREDIT_PACKAGES = [
  { name: '50 Credits', credits: 50, price: 1500 },
  { name: '150 Credits', credits: 150, price: 3900 },
  { name: '500 Credits', credits: 500, price: 9900 },
]

async function createProduct(config: typeof PRODUCTS[0]) {
  console.log(`\n📦 Creating product: ${config.name}...`)

  // Create product
  const product = await stripe.products.create({
    name: `Long Tail AI Studio - ${config.name}`,
    description: config.description,
    metadata: config.metadata,
    features: config.features.map((f) => ({ name: f })),
  })

  console.log(`   ✅ Product created: ${product.id}`)

  // Create price (skip for free tier)
  let price = null
  if (config.price > 0) {
    price = await stripe.prices.create({
      product: product.id,
      unit_amount: config.price,
      currency: 'usd',
      recurring: {
        interval: 'month',
      },
      metadata: {
        tier: config.metadata.tier,
      },
    })
    console.log(`   ✅ Price created: ${price.id} ($${config.price / 100}/mo)`)
  }

  return {
    tier: config.metadata.tier,
    product_id: product.id,
    price_id: price?.id || null,
    price: config.price,
  }
}

async function createCreditPackage(config: typeof CREDIT_PACKAGES[0]) {
  console.log(`\n💳 Creating credit package: ${config.name}...`)

  const product = await stripe.products.create({
    name: `Long Tail AI Studio - ${config.name} Top-up`,
    description: `One-time purchase of ${config.credits} platform credits`,
    metadata: {
      type: 'credits',
      credits: config.credits.toString(),
    },
  })

  const price = await stripe.prices.create({
    product: product.id,
    unit_amount: config.price,
    currency: 'usd',
    metadata: {
      credits: config.credits.toString(),
    },
  })

  console.log(`   ✅ Created: ${product.id} / ${price.id}`)

  return {
    credits: config.credits,
    product_id: product.id,
    price_id: price.id,
    price: config.price,
  }
}

async function createWebhook() {
  console.log('\n🔗 Creating webhook endpoint...')

  const webhook = await stripe.webhookEndpoints.create({
    url: `${SITE_URL}/api/webhooks/stripe`,
    enabled_events: [
      'checkout.session.completed',
      'customer.subscription.created',
      'customer.subscription.updated',
      'customer.subscription.deleted',
      'invoice.paid',
      'invoice.payment_failed',
    ],
  })

  console.log(`   ✅ Webhook created: ${webhook.id}`)
  console.log(`   🔑 Webhook secret: ${webhook.secret}`)

  return {
    webhook_id: webhook.id,
    webhook_secret: webhook.secret,
  }
}

async function createCustomerPortalConfig() {
  console.log('\n🎛️ Creating customer portal configuration...')

  const config = await stripe.billingPortal.configurations.create({
    business_profile: {
      headline: 'Long Tail AI Studio - Manage Your Subscription',
    },
    features: {
      subscription_cancel: {
        enabled: true,
        mode: 'at_period_end',
      },
      subscription_update: {
        enabled: true,
        default_allowed_updates: ['price'],
        proration_behavior: 'create_prorations',
      },
      payment_method_update: {
        enabled: true,
      },
      invoice_history: {
        enabled: true,
      },
    },
  })

  console.log(`   ✅ Portal config created: ${config.id}`)
  return config.id
}

async function main() {
  console.log('🚀 Setting up Stripe Products & Prices...')
  console.log(`   Site URL: ${SITE_URL}\n`)

  const results: {
    products: Array<{ tier: string; product_id: string; price_id: string | null; price: number }>
    credits: Array<{ credits: number; product_id: string; price_id: string; price: number }>
    webhook?: { webhook_id: string; webhook_secret: string }
    portal_config?: string
  } = {
    products: [],
    credits: [],
  }

  // Create subscription products
  for (const product of PRODUCTS) {
    const result = await createProduct(product)
    results.products.push(result)
  }

  // Create credit packages
  for (const pkg of CREDIT_PACKAGES) {
    const result = await createCreditPackage(pkg)
    results.credits.push(result)
  }

  // Create webhook
  try {
    results.webhook = await createWebhook()
  } catch (e: any) {
    console.log(`   ⚠️ Webhook creation skipped: ${e.message}`)
  }

  // Create customer portal
  try {
    results.portal_config = await createCustomerPortalConfig()
  } catch (e: any) {
    console.log(`   ⚠️ Portal config skipped: ${e.message}`)
  }

  // Generate .env additions
  console.log('\n📝 Add these to your .env.local:\n')
  console.log('# Stripe Price IDs (auto-generated)')
  results.products.forEach((p) => {
    if (p.price_id) {
      console.log(`NEXT_PUBLIC_STRIPE_PRICE_${p.tier.toUpperCase()}=${p.price_id}`)
    }
  })
  console.log('')
  results.credits.forEach((c) => {
    console.log(`NEXT_PUBLIC_STRIPE_CREDITS_${c.credits}=${c.price_id}`)
  })
  if (results.webhook) {
    console.log(`\nSTRIPE_WEBHOOK_SECRET=${results.webhook.webhook_secret}`)
  }

  // Generate config file
  const configContent = `// Auto-generated by setup-stripe.ts
// Run: npx ts-node scripts/setup-stripe.ts

export const STRIPE_PRODUCTS = {
${results.products.map((p) => `  ${p.tier}: {
    product_id: '${p.product_id}',
    price_id: ${p.price_id ? `'${p.price_id}'` : 'null'},
    price: ${p.price},
  },`).join('\n')}
} as const

export const STRIPE_CREDITS = {
${results.credits.map((c) => `  credits_${c.credits}: {
    product_id: '${c.product_id}',
    price_id: '${c.price_id}',
    credits: ${c.credits},
    price: ${c.price},
  },`).join('\n')}
} as const

export type StripeTier = keyof typeof STRIPE_PRODUCTS
`

  const outputPath = path.join(process.cwd(), 'src/lib/stripe-products.ts')
  fs.writeFileSync(outputPath, configContent)
  console.log(`\n✅ Stripe config written to: ${outputPath}`)

  // Save full results for reference
  const resultsPath = path.join(process.cwd(), 'scripts/stripe-setup-results.json')
  fs.writeFileSync(resultsPath, JSON.stringify(results, null, 2))
  console.log(`📄 Full results saved to: ${resultsPath}`)

  console.log('\n🎉 Stripe setup complete!')
}

main().catch(console.error)
