import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { session_id, agent_name, page, transcript, duration_seconds, outcome, lead_id } = body

    if (!session_id || !agent_name || !page) {
      return NextResponse.json(
        { error: 'Missing required fields: session_id, agent_name, page' },
        { status: 400 }
      )
    }

    const supabase = supabaseAdmin()
    
    const { data, error } = await supabase
      .from('voice_conversations')
      .insert({
        session_id,
        agent_name,
        page,
        transcript,
        duration_seconds,
        outcome,
        lead_id,
      })
      .select()
      .single()

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json({ error: 'Failed to save conversation' }, { status: 500 })
    }

    return NextResponse.json({ success: true, conversation: data })
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// Update conversation (e.g., when it ends)
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json()
    const { session_id, transcript, duration_seconds, outcome, lead_id } = body

    if (!session_id) {
      return NextResponse.json({ error: 'Missing session_id' }, { status: 400 })
    }

    const supabase = supabaseAdmin()
    
    const { data, error } = await supabase
      .from('voice_conversations')
      .update({
        transcript,
        duration_seconds,
        outcome,
        lead_id,
      })
      .eq('session_id', session_id)
      .select()
      .single()

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json({ error: 'Failed to update conversation' }, { status: 500 })
    }

    return NextResponse.json({ success: true, conversation: data })
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
