import { stripe } from '@/utils/stripe'
import { createClient } from '@/utils/supabase/server'
import { headers } from 'next/headers'
import { NextResponse } from 'next/server'
import { createClerkClient } from '@clerk/nextjs/server'
import Stripe from 'stripe'

export async function POST(req: Request) {
  const body = await req.text()
  const signature = (await headers()).get('Stripe-Signature') as string

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (error: any) {
    return NextResponse.json({ error: 'Webhook Error: ' + error.message }, { status: 400 })
  }

  const supabase = await createClient()
  const clerkClient = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY })

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session

    if (session.payment_status !== 'paid') {
      return NextResponse.json({ error: 'Payment not successful' }, { status: 400 })
    }

    // Retrieve the customer and plan details
    const customerId = session.customer as string
    const customerEmail = session.customer_details?.email

    // Find user in Supabase or Clerk to apply upgrade
    if (customerEmail) {
      // Relying on total amount (e.g., >= 1900 cents)
      const plan = (session.amount_total && session.amount_total >= 1900) ? 'pro' : 'starter'
      
      const { data: user } = await supabase
        .from('users')
        .select('id')
        .eq('email', customerEmail)
        .single()

      if (user) {
        // Upgrade existing Supabase user
        await supabase
          .from('users')
          .update({
            plan,
            stripe_customer_id: customerId,
          })
          .eq('id', user.id)
      } else {
        // User hasn't logged in to access DB yet, find their Clerk ID using email
        const clerkUsers = await clerkClient.users.getUserList({ emailAddress: [customerEmail] })
        
        if (clerkUsers.data.length > 0) {
          const clerkUserId = clerkUsers.data[0].id
          
          await supabase
            .from('users')
            .insert({
              id: clerkUserId,
              email: customerEmail,
              plan,
              usage_count: 0,
              stripe_customer_id: customerId
            })
        }
      }
    }
  }

  return NextResponse.json({ received: true })
}
