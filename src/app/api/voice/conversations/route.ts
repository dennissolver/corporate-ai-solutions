import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

// Save a voice conversation
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      session_id,
      agent_name,
      page_path,
      visitor_ip,
      user_agent,
      messages,
      duration_seconds,
      outcome,
      lead_captured,
      lead_email,
      lead_name,
      lead_phone,
    } = body

    // Insert conversation record
    const { data: conversation, error: convError } = await supabase
      .from('voice_conversations')
      .insert({
        session_id,
        agent_name,
        page_path,
        visitor_ip,
        user_agent,
        messages, // JSON array of {role, content, timestamp}
        duration_seconds,
        outcome, // 'completed' | 'abandoned' | 'transferred' | 'lead_captured'
        lead_captured,
      })
      .select()
      .single()

    if (convError) {
      console.error('Error saving conversation:', convError)
      return NextResponse.json({ error: 'Failed to save conversation' }, { status: 500 })
    }

    // If lead was captured, also create a lead record
    if (lead_captured && lead_email) {
      const { error: leadError } = await supabase
        .from('leads')
        .insert({
          email: lead_email,
          name: lead_name || null,
          phone: lead_phone || null,
          source: 'voice_agent',
          source_detail: `${agent_name} on ${page_path}`,
          metadata: {
            conversation_id: conversation.id,
            session_id,
            agent: agent_name,
            page: page_path,
          },
        })

      if (leadError) {
        console.error('Error saving lead:', leadError)
        // Don't fail the whole request, conversation was still saved
      }
    }

    return NextResponse.json({ 
      success: true, 
      conversation_id: conversation.id 
    })

  } catch (error) {
    console.error('Voice conversation error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// Get conversations (for admin/analytics)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const agent = searchParams.get('agent')
    const page = searchParams.get('page')
    const limit = parseInt(searchParams.get('limit') || '50')
    const offset = parseInt(searchParams.get('offset') || '0')

    let query = supabase
      .from('voice_conversations')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1)

    if (agent) {
      query = query.eq('agent_name', agent)
    }
    if (page) {
      query = query.eq('page_path', page)
    }

    const { data, error, count } = await query

    if (error) {
      console.error('Error fetching conversations:', error)
      return NextResponse.json({ error: 'Failed to fetch conversations' }, { status: 500 })
    }

    return NextResponse.json({ 
      conversations: data,
      total: count,
      limit,
      offset,
    })

  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
