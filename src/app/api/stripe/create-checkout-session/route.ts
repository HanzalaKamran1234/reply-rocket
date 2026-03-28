import { NextResponse } from 'next/server'
import { auth, currentUser } from '@clerk/nextjs/server'
import { stripe } from '@/utils/stripe'

// Stripe Price IDs OR Product IDs — update these with your real IDs from the Stripe dashboard
const ENTITY_IDS: Record<string, string> = {
  starter: process.env.STRIPE_PRICE_STARTER || process.env.STRIPE_PRODUCT_STARTER || '',
  pro: process.env.STRIPE_PRICE_PRO || process.env.STRIPE_PRODUCT_PRO || '',
}

export async function POST(req: Request) {
  try {
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const user = await currentUser()
    const email = user?.primaryEmailAddress?.emailAddress

    const { plan } = await req.json()

    if (!plan || !ENTITY_IDS[plan]) {
      return NextResponse.json({ error: 'Invalid plan selected' }, { status: 400 })
    }

    let priceId = ENTITY_IDS[plan]?.trim()

    // If the provided ID is a Product ID, fetch its default price from the Stripe API
    if (priceId && priceId.startsWith('prod_')) {
      const product = await stripe.products.retrieve(priceId);
      if (typeof product.default_price === 'string') {
        priceId = product.default_price;
      } else if (product.default_price && typeof product.default_price === 'object') {
        priceId = product.default_price.id;
      } else {
         return NextResponse.json(
          { error: `Stripe product "${plan}" does not have a default price set.` },
          { status: 500 }
        )
      }
    }

    if (!priceId || !priceId.startsWith('price_')) {
      return NextResponse.json(
        { error: `Stripe price ID for plan "${plan}" is missing or invalid. Add STRIPE_PRODUCT_STARTER and STRIPE_PRODUCT_PRO to your environment variables.` },
        { status: 500 }
      )
    }

    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      customer_email: email ?? undefined,
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      metadata: {
        userId,
        plan,
      },
      success_url: `${process.env.NEXT_PUBLIC_APP_URL ?? req.headers.get('origin')}/dashboard?upgrade=success`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL ?? req.headers.get('origin')}/#pricing`,
    })

    return NextResponse.json({ url: session.url })
  } catch (error: any) {
    console.error('Stripe checkout error:', error)
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 })
  }
}
