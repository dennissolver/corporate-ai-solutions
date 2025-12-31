#!/usr/bin/env node
/**
 * Vercel ↔ Supabase Integration Setup
 * 
 * Run: npx ts-node scripts/setup-vercel-supabase.ts
 * 
 * This script:
 * 1. Reads your Supabase credentials
 * 2. Sets them as Vercel environment variables
 * 3. Configures Supabase Auth redirect URLs for your Vercel deployment
 * 
 * Requires:
 * - VERCEL_TOKEN (from vercel.com/account/tokens)
 * - VERCEL_PROJECT_ID (from vercel.com project settings)
 * - VERCEL_TEAM_ID (optional, for team projects)
 * - Supabase credentials in .env.local
 */

import * as dotenv from 'dotenv'
import * as fs from 'fs'
import * as path from 'path'
import { createClient } from '@supabase/supabase-js'

dotenv.config({ path: '.env.local' })

// Required environment variables
const VERCEL_TOKEN = process.env.VERCEL_TOKEN
const VERCEL_PROJECT_ID = process.env.VERCEL_PROJECT_ID
const VERCEL_TEAM_ID = process.env.VERCEL_TEAM_ID // Optional

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY

// Validation
const missing: string[] = []
if (!VERCEL_TOKEN) missing.push('VERCEL_TOKEN')
if (!VERCEL_PROJECT_ID) missing.push('VERCEL_PROJECT_ID')
if (!SUPABASE_URL) missing.push('NEXT_PUBLIC_SUPABASE_URL')
if (!SUPABASE_ANON_KEY) missing.push('NEXT_PUBLIC_SUPABASE_ANON_KEY')
if (!SUPABASE_SERVICE_KEY) missing.push('SUPABASE_SERVICE_ROLE_KEY')

if (missing.length > 0) {
  console.error('❌ Missing required environment variables:')
  missing.forEach((v) => console.error(`   - ${v}`))
  console.error('\nAdd these to your .env.local file')
  process.exit(1)
}

const VERCEL_API = 'https://api.vercel.com'

interface VercelEnvVar {
  key: string
  value: string
  target: ('production' | 'preview' | 'development')[]
  type: 'plain' | 'secret' | 'encrypted'
}

async function vercelFetch(endpoint: string, options: RequestInit = {}) {
  const url = new URL(endpoint, VERCEL_API)
  if (VERCEL_TEAM_ID) {
    url.searchParams.set('teamId', VERCEL_TEAM_ID)
  }

  const response = await fetch(url.toString(), {
    ...options,
    headers: {
      Authorization: `Bearer ${VERCEL_TOKEN}`,
      'Content-Type': 'application/json',
      ...options.headers,
    },
  })

  if (!response.ok) {
    const error = await response.text()
    throw new Error(`Vercel API error: ${response.status} - ${error}`)
  }

  return response.json()
}

async function getProjectDomains(): Promise<string[]> {
  console.log('🔍 Fetching Vercel project domains...')
  
  const project = await vercelFetch(`/v9/projects/${VERCEL_PROJECT_ID}`)
  
  const domains: string[] = []
  
  // Production domain
  if (project.alias && project.alias.length > 0) {
    domains.push(...project.alias.map((a: any) => `https://${a.domain}`))
  }
  
  // Default vercel.app domain
  if (project.name) {
    domains.push(`https://${project.name}.vercel.app`)
  }
  
  // Preview URLs pattern
  domains.push(`https://${project.name}-*-${project.accountId || 'preview'}.vercel.app`)
  
  console.log(`   Found domains:`)
  domains.forEach((d) => console.log(`   - ${d}`))
  
  return domains
}

async function setVercelEnvVars(vars: VercelEnvVar[]) {
  console.log('\n📝 Setting Vercel environment variables...')

  for (const envVar of vars) {
    try {
      // Try to create new
      await vercelFetch(`/v10/projects/${VERCEL_PROJECT_ID}/env`, {
        method: 'POST',
        body: JSON.stringify(envVar),
      })
      console.log(`   ✅ Set: ${envVar.key}`)
    } catch (error: any) {
      // If exists, try to update
      if (error.message.includes('already exists')) {
        try {
          // Get existing to find ID
          const existing = await vercelFetch(`/v9/projects/${VERCEL_PROJECT_ID}/env`)
          const existingVar = existing.envs.find((e: any) => e.key === envVar.key)
          
          if (existingVar) {
            await vercelFetch(`/v9/projects/${VERCEL_PROJECT_ID}/env/${existingVar.id}`, {
              method: 'PATCH',
              body: JSON.stringify({ value: envVar.value }),
            })
            console.log(`   ✅ Updated: ${envVar.key}`)
          }
        } catch (updateError) {
          console.log(`   ⚠️ Could not update ${envVar.key}: ${updateError}`)
        }
      } else {
        console.log(`   ⚠️ Error setting ${envVar.key}: ${error.message}`)
      }
    }
  }
}

async function configureSupabaseAuth(redirectUrls: string[]) {
  console.log('\n🔐 Configuring Supabase Auth redirect URLs...')
  console.log('   Note: This requires manual configuration in Supabase Dashboard')
  console.log('')
  console.log('   Go to: https://supabase.com/dashboard/project/YOUR_PROJECT/auth/url-configuration')
  console.log('')
  console.log('   Add these Redirect URLs:')
  redirectUrls.forEach((url) => {
    console.log(`   - ${url}`)
    console.log(`   - ${url}/auth/callback`)
  })
  console.log('')
  console.log('   Add these to Site URL (pick your primary):')
  console.log(`   - ${redirectUrls[0] || 'https://corporateaisolutions.com'}`)
}

async function generateEnvTemplate(domains: string[]) {
  const primaryDomain = domains.find((d) => !d.includes('*')) || domains[0]
  
  const template = `# ===========================================
# Long Tail AI Studio - Environment Variables
# ===========================================
# Generated by setup-vercel-supabase.ts
# Copy to .env.local and fill in values

# Vercel (for setup scripts)
VERCEL_TOKEN=
VERCEL_PROJECT_ID=${VERCEL_PROJECT_ID}
${VERCEL_TEAM_ID ? `VERCEL_TEAM_ID=${VERCEL_TEAM_ID}` : '# VERCEL_TEAM_ID='}

# Site
NEXT_PUBLIC_SITE_URL=${primaryDomain}

# Supabase
NEXT_PUBLIC_SUPABASE_URL=${SUPABASE_URL}
NEXT_PUBLIC_SUPABASE_ANON_KEY=${SUPABASE_ANON_KEY}
SUPABASE_SERVICE_ROLE_KEY=${SUPABASE_SERVICE_KEY}

# Stripe (run: npx ts-node scripts/setup-stripe.ts)
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
# Price IDs will be generated by setup-stripe.ts

# ElevenLabs (run: npx ts-node scripts/setup-elevenlabs.ts)
ELEVENLABS_API_KEY=
# Agent IDs will be generated by setup-elevenlabs.ts

# Skool
NEXT_PUBLIC_SKOOL_URL=https://www.skool.com/the-easily-distracted-5598
`

  const envPath = path.join(process.cwd(), '.env.generated')
  fs.writeFileSync(envPath, template)
  console.log(`\n📄 Generated env template: ${envPath}`)
}

async function main() {
  console.log('🚀 Setting up Vercel ↔ Supabase Integration\n')

  // 1. Get Vercel domains
  const domains = await getProjectDomains()

  // 2. Set Vercel environment variables
  const envVars: VercelEnvVar[] = [
    {
      key: 'NEXT_PUBLIC_SUPABASE_URL',
      value: SUPABASE_URL!,
      target: ['production', 'preview', 'development'],
      type: 'plain',
    },
    {
      key: 'NEXT_PUBLIC_SUPABASE_ANON_KEY',
      value: SUPABASE_ANON_KEY!,
      target: ['production', 'preview', 'development'],
      type: 'plain',
    },
    {
      key: 'SUPABASE_SERVICE_ROLE_KEY',
      value: SUPABASE_SERVICE_KEY!,
      target: ['production', 'preview'],
      type: 'secret',
    },
    {
      key: 'NEXT_PUBLIC_SITE_URL',
      value: domains.find((d) => !d.includes('*')) || domains[0],
      target: ['production'],
      type: 'plain',
    },
  ]

  await setVercelEnvVars(envVars)

  // 3. Configure Supabase Auth (manual step)
  await configureSupabaseAuth(domains)

  // 4. Generate env template
  await generateEnvTemplate(domains)

  console.log('\n🎉 Vercel-Supabase integration setup complete!')
  console.log('\n📋 Next steps:')
  console.log('   1. Configure Supabase Auth redirect URLs (see above)')
  console.log('   2. Run: npx ts-node scripts/setup-stripe.ts')
  console.log('   3. Run: npx ts-node scripts/setup-elevenlabs.ts')
  console.log('   4. Deploy: vercel --prod')
}

main().catch(console.error)
