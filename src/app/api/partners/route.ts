import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, industry, problem_description, why_you } = body

    if (!name || !email || !industry || !problem_description) {
      return NextResponse.json(
        { error: 'Missing required fields: name, email, industry, problem_description' },
        { status: 400 }
      )
    }

    const supabase = supabaseAdmin()
    
    const { data, error } = await supabase
      .from('partnership_applications')
      .insert({
        name, email, phone, industry, problem_description, why_you,
        status: 'new'
      })
      .select()
      .single()

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json({ error: 'Failed to submit partnership request' }, { status: 500 })
    }

    return NextResponse.json({ success: true, partnership: data })
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
