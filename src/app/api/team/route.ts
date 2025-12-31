import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { 
      name, email, role_type, linkedin_url, portfolio_url, 
      experience_summary, why_interested, availability, location, referred_by 
    } = body

    if (!name || !email || !role_type) {
      return NextResponse.json(
        { error: 'Missing required fields: name, email, role_type' },
        { status: 400 }
      )
    }

    const supabase = supabaseAdmin()
    
    const { data, error } = await supabase
      .from('team_applications')
      .insert({
        name, email, role_type, linkedin_url, portfolio_url,
        experience_summary, why_interested, availability, location, referred_by,
        status: 'new'
      })
      .select()
      .single()

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json({ error: 'Failed to submit application' }, { status: 500 })
    }

    return NextResponse.json({ success: true, application: data })
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
