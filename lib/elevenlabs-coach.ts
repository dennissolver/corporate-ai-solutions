// lib/elevenlabs-coach.ts
'use client';

import { Conversation } from '@elevenlabs/client';
import { createClient } from '@/lib/supabase/client';
import type {
  VoiceSessionInsert,
  VoiceMessageInsert,
  VoiceCoachConfig,
  VoiceSessionResult,
} from '@/types/voice-coaching';

export class ElevenLabsVoiceCoach {
  private conversation: Conversation | null = null;
  private sessionId: string | null = null;
  private supabase = createClient();
  private config: VoiceCoachConfig;
  private messageBuffer: VoiceMessageInsert[] = [];
  private saveInterval: NodeJS.Timeout | null = null;

  constructor(config: VoiceCoachConfig) {
    this.config = config;
  }

  /**
   * Initialize and start voice coaching session
   */
  async initialize(): Promise<string> {
    try {
      // Create session in database
      const session: VoiceSessionInsert = {
        user_id: this.config.userId,
        project_id: this.config.projectId,
        coaching_mode: this.config.mode,
        investor_persona: this.config.persona || null,
        status: 'active',
        started_at: new Date().toISOString()
      };

      const { data: sessionData, error: sessionError } = await this.supabase
        .from('voice_sessions')
        .insert(session)
        .select()
        .single();

      if (sessionError) throw sessionError;

      this.sessionId = sessionData.id;
      console.log('✅ Session created:', this.sessionId);

      // Build context for agent
      const sdgString = this.config.projectData.sdgs
        .map(num => `SDG ${num}`)
        .join(', ');

      // Get signed URL from our API (keeps API key server-side)
      const signedUrlResponse = await fetch('/api/voice-coach/signed-url', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });

      if (!signedUrlResponse.ok) {
        const errorData = await signedUrlResponse.json();
        throw new Error(`Failed to get signed URL: ${errorData.error}`);
      }

      const { signed_url } = await signedUrlResponse.json();

      // Start conversation with ElevenLabs
      this.conversation = await Conversation.startSession({
        signedUrl: signed_url,

        onConnect: () => {
          console.log('✅ Connected to voice coach');
          this.handleConnect();
        },

        onDisconnect: () => {
          console.log('❌ Disconnected');
          this.handleDisconnect();
        },

        onMessage: (message: any) => {
          console.log('💬 Message:', message);
          this.handleMessage(message);
        },

        onError: (error: any) => {
          console.error('❌ Error:', error);
          this.handleError(error);
        },
      });

      // Log session context
      console.log('✅ Session started with context:', {
        founder_name: this.config.userId,
        project_name: this.config.projectData.name,
        sdg_focus: sdgString,
        coaching_mode: this.config.mode,
        investor_persona: this.config.persona || 'none'
      });

      // Start auto-save interval
      this.startAutoSave();

      return this.sessionId;

    } catch (error) {
      console.error('Failed to initialize voice coach:', error);
      throw error;
    }
  }

  /**
   * Handle connection established
   */
  private handleConnect(): void {
    if (this.sessionId) {
      this.supabase
        .from('voice_sessions')
        .update({
          status: 'connected',
          metadata: { connected_at: new Date().toISOString() }
        })
        .eq('id', this.sessionId)
        .then(() => console.log('✅ Session status: connected'));
    }
  }

  /**
   * Handle disconnection
   */
  private handleDisconnect(): void {
    this.stopAutoSave();
    this.flushMessageBuffer();

    if (this.sessionId) {
      this.supabase
        .from('voice_sessions')
        .update({
          status: 'disconnected',
          ended_at: new Date().toISOString()
        })
        .eq('id', this.sessionId)
        .then(() => console.log('✅ Session status: disconnected'));
    }
  }

  /**
   * Handle incoming message from agent
   */
  private handleMessage(message: any): void {
    if (!this.sessionId) return;

    const role = message.source === 'user' || message.role === 'user'
      ? 'user'
      : 'assistant';

    const content = message.message || message.text || message.content || '';

    const voiceMessage: VoiceMessageInsert = {
      session_id: this.sessionId,
      role: role,
      content: content,
      audio_url: message.audio_url || null,
      timestamp: new Date().toISOString()
    };

    this.messageBuffer.push(voiceMessage);
    console.log(`📝 Message buffered (${this.messageBuffer.length} in buffer)`);
  }

  /**
   * Start auto-save interval
   */
  private startAutoSave(): void {
    this.saveInterval = setInterval(() => {
      if (this.messageBuffer.length > 0) {
        this.flushMessageBuffer();
      }
    }, 10000);
  }

  /**
   * Stop auto-save interval
   */
  private stopAutoSave(): void {
    if (this.saveInterval) {
      clearInterval(this.saveInterval);
      this.saveInterval = null;
    }
  }

  /**
   * Flush message buffer to database
   */
  private async flushMessageBuffer(): Promise<void> {
    if (this.messageBuffer.length === 0) return;

    const messages = [...this.messageBuffer];
    this.messageBuffer = [];

    try {
      const { error } = await this.supabase
        .from('voice_messages')
        .insert(messages);

      if (error) {
        console.error('❌ Failed to save messages:', error);
        this.messageBuffer.unshift(...messages);
      } else {
        console.log(`✅ Saved ${messages.length} messages`);
      }
    } catch (error) {
      console.error('❌ Error flushing messages:', error);
      this.messageBuffer.unshift(...messages);
    }
  }

  /**
   * Handle error
   */
  private handleError(error: any): void {
    console.error('❌ ElevenLabs error:', error);

    if (this.sessionId) {
      this.supabase
        .from('voice_sessions')
        .update({
          status: 'error',
          metadata: {
            error: error.message || error.toString(),
            error_time: new Date().toISOString()
          }
        })
        .eq('id', this.sessionId);
    }
  }

  /**
   * End the coaching session
   */
  async endSession(): Promise<VoiceSessionResult> {
    if (!this.sessionId) {
      throw new Error('No active session');
    }

    try {
      this.stopAutoSave();
      await this.flushMessageBuffer();

      // End ElevenLabs conversation
      if (this.conversation) {
        await this.conversation.endSession();
      }

      const { data: session, error: sessionError } = await this.supabase
        .from('voice_sessions')
        .select('*')
        .eq('id', this.sessionId)
        .single();

      if (sessionError) throw sessionError;

      const { data: messages, error: messagesError } = await this.supabase
        .from('voice_messages')
        .select('*')
        .eq('session_id', this.sessionId)
        .order('timestamp', { ascending: true });

      if (messagesError) throw messagesError;

      const startTime = new Date(session.started_at).getTime();
      const endTime = Date.now();
      const duration = Math.floor((endTime - startTime) / 1000);

      await this.supabase
        .from('voice_sessions')
        .update({
          status: 'completed',
          ended_at: new Date().toISOString(),
          metadata: {
            ...(session.metadata as Record<string, any> || {}),
            duration_seconds: duration,
            message_count: messages?.length || 0
          }
        })
        .eq('id', this.sessionId);

      console.log('✅ Session ended:', {
        sessionId: this.sessionId,
        duration,
        messageCount: messages?.length || 0
      });

      // Generate feedback in background
      this.generateFeedback(messages || []).catch(err =>
        console.error('Failed to generate feedback:', err)
      );

      return {
        sessionId: this.sessionId,
        messageCount: messages?.length || 0,
        duration
      };

    } catch (error) {
      console.error('Failed to end session:', error);
      throw error;
    }
  }

  /**
   * Generate coaching feedback from transcript
   */
  private async generateFeedback(messages: any[]): Promise<void> {
    if (!this.sessionId) return;

    try {
      const transcript = messages
        .map(m => `${m.role === 'user' ? 'Founder' : 'Coach'}: ${m.content}`)
        .join('\n\n');

      const response = await fetch('/api/voice-coach/generate-feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId: this.sessionId,
          transcript,
          mode: this.config.mode,
          persona: this.config.persona,
          projectData: this.config.projectData
        })
      });

      if (!response.ok) {
        throw new Error('Failed to generate feedback');
      }

      console.log('✅ Feedback generated');

    } catch (error) {
      console.error('❌ Failed to generate feedback:', error);
    }
  }

  getSessionId(): string | null {
    return this.sessionId;
  }

  isActive(): boolean {
    return this.conversation !== null && this.sessionId !== null;
  }
}