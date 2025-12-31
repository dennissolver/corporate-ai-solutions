import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, platform, source } = body

    if (!email || !platform) {
      return NextResponse.json(
        { error: 'Missing required fields: email, platform' },
        { status: 400 }
      )
    }

    const supabase = supabaseAdmin()
    
    // Check if already on waitlist
    const { data: existing } = await supabase
      .from('waitlist')
      .select('id')
      .eq('email', email)
      .eq('platform', platform)
      .single()

    if (existing) {
      return NextResponse.json({ success: true, message: 'Already on waitlist' })
    }

    const { data, error } = await supabase
      .from('waitlist')
      .insert({ email, platform, source })
      .select()
      .single()

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json({ error: 'Failed to join waitlist' }, { status: 500 })
    }

    return NextResponse.json({ success: true, entry: data })
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
