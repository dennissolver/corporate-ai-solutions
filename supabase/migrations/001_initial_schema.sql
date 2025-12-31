-- Long Tail AI Studio Database Schema
-- Run this in your Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- LEADS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS leads (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    name TEXT,
    email TEXT NOT NULL,
    phone TEXT,
    company TEXT,
    source TEXT NOT NULL, -- 'voice_agent' | 'contact_form' | 'partner_form' | 'waitlist' etc
    source_detail TEXT, -- e.g. 'Alex on /pricing'
    source_page TEXT,
    source_agent TEXT,
    intent TEXT,
    problem_description TEXT,
    qualified BOOLEAN DEFAULT FALSE,
    notes TEXT,
    status TEXT DEFAULT 'new',
    metadata JSONB
);

CREATE INDEX idx_leads_email ON leads(email);
CREATE INDEX idx_leads_source ON leads(source);
CREATE INDEX idx_leads_status ON leads(status);

-- ============================================
-- VOICE CONVERSATIONS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS voice_conversations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    session_id TEXT NOT NULL UNIQUE,
    agent_name TEXT NOT NULL,
    page_path TEXT NOT NULL,
    visitor_ip TEXT,
    user_agent TEXT,
    messages JSONB, -- Array of {role, content, timestamp}
    duration_seconds INTEGER,
    outcome TEXT, -- 'completed' | 'abandoned' | 'transferred' | 'lead_captured'
    lead_captured BOOLEAN DEFAULT FALSE,
    metadata JSONB
);

CREATE INDEX idx_voice_session ON voice_conversations(session_id);
CREATE INDEX idx_voice_agent ON voice_conversations(agent_name);
CREATE INDEX idx_voice_outcome ON voice_conversations(outcome);
CREATE INDEX idx_voice_lead_captured ON voice_conversations(lead_captured);

-- ============================================
-- WAITLIST TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS waitlist (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    email TEXT NOT NULL,
    platform TEXT NOT NULL,
    source TEXT,
    UNIQUE(email, platform)
);

-- ============================================
-- TEAM APPLICATIONS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS team_applications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    role_type TEXT NOT NULL,
    linkedin_url TEXT,
    portfolio_url TEXT,
    experience_summary TEXT,
    why_interested TEXT,
    availability TEXT,
    location TEXT,
    referred_by TEXT,
    status TEXT DEFAULT 'new'
);

-- ============================================
-- INVESTOR LEADS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS investor_leads (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    company TEXT,
    investor_type TEXT,
    check_size_range TEXT,
    interest_areas TEXT[],
    how_heard TEXT,
    notes TEXT,
    status TEXT DEFAULT 'new'
);

-- ============================================
-- PARTNERSHIP APPLICATIONS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS partnership_applications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    industry TEXT NOT NULL,
    problem_description TEXT NOT NULL,
    why_you TEXT,
    status TEXT DEFAULT 'new'
);

-- ============================================
-- REFERRALS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS referrals (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    referrer_email TEXT NOT NULL,
    referrer_name TEXT,
    referred_email TEXT NOT NULL,
    referred_name TEXT,
    referral_type TEXT NOT NULL,
    status TEXT DEFAULT 'pending',
    reward_status TEXT DEFAULT 'pending'
);

-- ============================================
-- PAGE EVENTS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS page_events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    session_id TEXT NOT NULL,
    page TEXT NOT NULL,
    event_type TEXT NOT NULL,
    metadata JSONB
);

-- ============================================
-- SUBSCRIPTIONS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS subscriptions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    user_email TEXT NOT NULL,
    user_name TEXT,
    stripe_customer_id TEXT,
    stripe_subscription_id TEXT,
    plan TEXT NOT NULL,
    status TEXT DEFAULT 'active',
    selected_platforms TEXT[],
    current_period_start TIMESTAMPTZ,
    current_period_end TIMESTAMPTZ
);

-- Enable RLS
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE voice_conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE investor_leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE partnership_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE referrals ENABLE ROW LEVEL SECURITY;
ALTER TABLE page_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;

-- ============================================
-- RLS POLICIES
-- ============================================
-- Note: Service role (used by API routes) bypasses RLS
-- These policies allow anonymous users to INSERT (submit forms)
-- but not READ other users' data

-- LEADS: Allow anonymous insert, service role full access
CREATE POLICY "Allow anonymous insert" ON leads
    FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "Allow service role full access" ON leads
    FOR ALL TO service_role USING (true) WITH CHECK (true);

-- VOICE CONVERSATIONS: Allow anonymous insert (capture conversations)
CREATE POLICY "Allow anonymous insert" ON voice_conversations
    FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "Allow service role full access" ON voice_conversations
    FOR ALL TO service_role USING (true) WITH CHECK (true);

-- WAITLIST: Allow anonymous insert
CREATE POLICY "Allow anonymous insert" ON waitlist
    FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "Allow service role full access" ON waitlist
    FOR ALL TO service_role USING (true) WITH CHECK (true);

-- TEAM APPLICATIONS: Allow anonymous insert
CREATE POLICY "Allow anonymous insert" ON team_applications
    FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "Allow service role full access" ON team_applications
    FOR ALL TO service_role USING (true) WITH CHECK (true);

-- INVESTOR LEADS: Allow anonymous insert
CREATE POLICY "Allow anonymous insert" ON investor_leads
    FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "Allow service role full access" ON investor_leads
    FOR ALL TO service_role USING (true) WITH CHECK (true);

-- PARTNERSHIP APPLICATIONS: Allow anonymous insert
CREATE POLICY "Allow anonymous insert" ON partnership_applications
    FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "Allow service role full access" ON partnership_applications
    FOR ALL TO service_role USING (true) WITH CHECK (true);

-- REFERRALS: Allow anonymous insert
CREATE POLICY "Allow anonymous insert" ON referrals
    FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "Allow service role full access" ON referrals
    FOR ALL TO service_role USING (true) WITH CHECK (true);

-- PAGE EVENTS: Allow anonymous insert (analytics)
CREATE POLICY "Allow anonymous insert" ON page_events
    FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "Allow service role full access" ON page_events
    FOR ALL TO service_role USING (true) WITH CHECK (true);

-- SUBSCRIPTIONS: Service role only (managed by Stripe webhooks)
CREATE POLICY "Allow service role full access" ON subscriptions
    FOR ALL TO service_role USING (true) WITH CHECK (true);

-- ============================================
-- HELPER FUNCTIONS
-- ============================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply to tables with updated_at
CREATE TRIGGER update_leads_updated_at
    BEFORE UPDATE ON leads
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_subscriptions_updated_at
    BEFORE UPDATE ON subscriptions
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- VIEWS FOR ANALYTICS (optional)
-- ============================================

-- Daily conversation summary
CREATE OR REPLACE VIEW daily_conversation_stats AS
SELECT 
    DATE(created_at) as date,
    agent_name,
    COUNT(*) as total_conversations,
    COUNT(*) FILTER (WHERE outcome = 'completed') as completed,
    COUNT(*) FILTER (WHERE outcome = 'abandoned') as abandoned,
    COUNT(*) FILTER (WHERE lead_captured = true) as leads_captured,
    AVG(duration_seconds) as avg_duration_seconds
FROM voice_conversations
GROUP BY DATE(created_at), agent_name
ORDER BY date DESC;

-- Lead source breakdown
CREATE OR REPLACE VIEW lead_sources AS
SELECT 
    source,
    source_agent,
    COUNT(*) as total_leads,
    COUNT(*) FILTER (WHERE qualified = true) as qualified_leads,
    DATE(MIN(created_at)) as first_lead,
    DATE(MAX(created_at)) as latest_lead
FROM leads
GROUP BY source, source_agent
ORDER BY total_leads DESC;
