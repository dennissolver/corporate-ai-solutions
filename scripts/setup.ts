#!/usr/bin/env node
/**
 * Master Setup Script for Long Tail AI Studio
 * 
 * Run: npm run setup
 * 
 * This script orchestrates the full setup:
 * 1. Vercel ↔ Supabase integration
 * 2. Stripe products & prices
 * 3. ElevenLabs voice agents
 * 4. Database migrations
 */

import { execSync } from 'child_process'
import * as readline from 'readline'
import * as fs from 'fs'
import * as path from 'path'

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

function question(prompt: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(prompt, resolve)
  })
}

function runScript(name: string, script: string) {
  console.log(`\n${'='.repeat(50)}`)
  console.log(`🚀 Running: ${name}`)
  console.log('='.repeat(50))
  
  try {
    execSync(script, { stdio: 'inherit' })
    console.log(`✅ ${name} complete\n`)
    return true
  } catch (error) {
    console.error(`❌ ${name} failed\n`)
    return false
  }
}

function checkEnvFile() {
  const envPath = path.join(process.cwd(), '.env.local')
  
  if (!fs.existsSync(envPath)) {
    console.log('\n⚠️  No .env.local found')
    console.log('   Copying from .env.example...')
    
    const examplePath = path.join(process.cwd(), '.env.example')
    if (fs.existsSync(examplePath)) {
      fs.copyFileSync(examplePath, envPath)
      console.log('   ✅ Created .env.local from .env.example')
      console.log('   📝 Please fill in your API keys before continuing\n')
      return false
    }
  }
  return true
}

async function main() {
  console.log(`
╔═══════════════════════════════════════════════════════════╗
║                                                           ║
║   🚀 Long Tail AI Studio - Automated Setup                ║
║                                                           ║
║   This will configure:                                    ║
║   • Vercel ↔ Supabase integration                        ║
║   • Stripe products, prices & webhooks                    ║
║   • ElevenLabs voice agents                               ║
║   • Database schema                                       ║
║                                                           ║
╚═══════════════════════════════════════════════════════════╝
`)

  // Check for .env.local
  if (!checkEnvFile()) {
    console.log('Please configure .env.local and run again: npm run setup')
    process.exit(1)
  }

  // Confirm
  const proceed = await question('\nProceed with setup? (y/n): ')
  if (proceed.toLowerCase() !== 'y') {
    console.log('Setup cancelled')
    process.exit(0)
  }

  const results: Record<string, boolean> = {}

  // Step 1: Vercel-Supabase
  const runVercel = await question('\n1. Setup Vercel ↔ Supabase integration? (y/n): ')
  if (runVercel.toLowerCase() === 'y') {
    results['Vercel-Supabase'] = runScript(
      'Vercel-Supabase Integration',
      'npx ts-node scripts/setup-vercel-supabase.ts'
    )
  }

  // Step 2: Stripe
  const runStripe = await question('\n2. Setup Stripe products & prices? (y/n): ')
  if (runStripe.toLowerCase() === 'y') {
    results['Stripe'] = runScript(
      'Stripe Setup',
      'npx ts-node scripts/setup-stripe.ts'
    )
  }

  // Step 3: ElevenLabs
  const runElevenLabs = await question('\n3. Setup ElevenLabs voice agents? (y/n): ')
  if (runElevenLabs.toLowerCase() === 'y') {
    results['ElevenLabs'] = runScript(
      'ElevenLabs Setup',
      'npx ts-node scripts/setup-elevenlabs.ts'
    )
  }

  // Summary
  console.log('\n' + '='.repeat(50))
  console.log('📋 Setup Summary')
  console.log('='.repeat(50))
  
  Object.entries(results).forEach(([name, success]) => {
    console.log(`   ${success ? '✅' : '❌'} ${name}`)
  })

  console.log('\n📝 Next steps:')
  console.log('   1. Review generated files in src/lib/')
  console.log('   2. Update .env.local with generated values')
  console.log('   3. Configure Supabase Auth redirect URLs (see console output)')
  console.log('   4. Run database migration in Supabase SQL Editor')
  console.log('   5. Deploy: vercel --prod')
  console.log('')

  rl.close()
}

main().catch((error) => {
  console.error('Setup failed:', error)
  rl.close()
  process.exit(1)
})
