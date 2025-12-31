import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { supabaseAdmin } from '@/lib/supabase'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
})

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!

export async function POST(request: NextRequest) {
  const body = await request.text()
  const signature = request.headers.get('stripe-signature')!

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
  } catch (err: any) {
    console.error('Webhook signature verification failed:', err.message)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  const supabase = supabaseAdmin()

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session
        
        if (session.mode === 'subscription') {
          // Create or update subscription record
          await supabase.from('subscriptions').upsert({
            stripe_customer_id: session.customer as string,
            stripe_subscription_id: session.subscription as string,
            user_email: session.customer_email!,
            plan: session.metadata?.tier || 'starter',
            status: 'active',
            selected_platforms: session.metadata?.platforms?.split(',') || [],
          }, {
            onConflict: 'stripe_customer_id',
          })

          // Create lead record if new customer
          await supabase.from('leads').upsert({
            email: session.customer_email!,
            name: session.customer_details?.name || '',
            source_page: '/checkout',
            intent: 'subscribe',
            qualified: true,
            status: 'converted',
          }, {
            onConflict: 'email',
          })
        }
        break
      }

      case 'customer.subscription.created':
      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription
        const customer = await stripe.customers.retrieve(subscription.customer as string) as Stripe.Customer

        await supabase.from('subscriptions').upsert({
          stripe_customer_id: subscription.customer as string,
          stripe_subscription_id: subscription.id,
          user_email: customer.email!,
          plan: subscription.metadata?.tier || 'starter',
          status: subscription.status === 'active' ? 'active' : 
                  subscription.status === 'past_due' ? 'past_due' :
                  subscription.status === 'canceled' ? 'canceled' : 'active',
          current_period_start: new Date(subscription.current_period_start * 1000).toISOString(),
          current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
        }, {
          onConflict: 'stripe_subscription_id',
        })
        break
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription
        
        await supabase.from('subscriptions')
          .update({ status: 'canceled' })
          .eq('stripe_subscription_id', subscription.id)
        break
      }

      case 'invoice.paid': {
        const invoice = event.data.object as Stripe.Invoice
        console.log(`Invoice paid: ${invoice.id} for ${invoice.customer_email}`)
        // Could add invoice tracking here
        break
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice
        console.error(`Payment failed: ${invoice.id} for ${invoice.customer_email}`)
        
        // Update subscription status
        if (invoice.subscription) {
          await supabase.from('subscriptions')
            .update({ status: 'past_due' })
            .eq('stripe_subscription_id', invoice.subscription as string)
        }
        break
      }
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Webhook handler error:', error)
    return NextResponse.json({ error: 'Webhook handler failed' }, { status: 500 })
  }
}
