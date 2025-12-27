// app/api/voice-coach/signed-url/route.ts
import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST() {
  try {
    // Verify user is authenticated
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Get credentials from environment
    const agentId = process.env.NEXT_PUBLIC_ELEVENLABS_AGENT_ID;
    const apiKey = process.env.ELEVENLABS_API_KEY;

    if (!agentId) {
      console.error('[signed-url] Missing NEXT_PUBLIC_ELEVENLABS_AGENT_ID');
      return NextResponse.json(
        { error: 'Voice coach not configured: missing agent ID' },
        { status: 500 }
      );
    }

    if (!apiKey) {
      console.error('[signed-url] Missing ELEVENLABS_API_KEY');
      return NextResponse.json(
        { error: 'Voice coach not configured: missing API key' },
        { status: 500 }
      );
    }

    // Request signed URL from ElevenLabs
    const response = await fetch(
      `https://api.elevenlabs.io/v1/convai/conversation/get_signed_url?agent_id=${agentId}`,
      {
        method: 'GET',
        headers: {
          'xi-api-key': apiKey
        }
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('[signed-url] ElevenLabs error:', response.status, errorText);
      return NextResponse.json(
        { error: `ElevenLabs API error: ${response.status}` },
        { status: response.status }
      );
    }

    const data = await response.json();

    if (!data.signed_url) {
      console.error('[signed-url] No signed_url in response:', data);
      return NextResponse.json(
        { error: 'Invalid response from ElevenLabs' },
        { status: 500 }
      );
    }

    console.log('[signed-url] Success for user:', user.id);

    return NextResponse.json({
      signed_url: data.signed_url
    });

  } catch (error: any) {
    console.error('[signed-url] Error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to get signed URL' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    service: 'voice-coach/signed-url',
    description: 'Returns a signed URL for ElevenLabs voice conversations',
    method: 'POST',
    auth: 'Required'
  });
}