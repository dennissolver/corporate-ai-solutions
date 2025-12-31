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
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    company TEXT,
    source_page TEXT NOT NULL,
    source_agent TEXT,
    intent TEXT NOT NULL,
    problem_description TEXT,
    qualified BOOLEAN DEFAULT FALSE,
    notes TEXT,
    status TEXT DEFAULT 'new'
);

CREATE INDEX idx_leads_email ON leads(email);
CREATE INDEX idx_leads_intent ON leads(intent);

-- ============================================
-- VOICE CONVERSATIONS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS voice_conversations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    session_id TEXT NOT NULL UNIQUE,
    agent_name TEXT NOT NULL,
    page TEXT NOT NULL,
    transcript JSONB,
    duration_seconds INTEGER,
    outcome TEXT,
    lead_id UUID REFERENCES leads(id)
);

CREATE INDEX idx_voice_session ON voice_conversations(session_id);

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
