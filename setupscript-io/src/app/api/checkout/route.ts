import { stripe } from '@/lib/stripe'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
    const { email } = await req.json()

    const session = await stripe.checkout.sessions.create({
        mode: 'payment',
        payment_method_types: ['card'],
        customer_email: email,
        line_items: [{ price: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID!, quantity: 1 }],
        success_url: `${process.env.NEXT_PUBLIC_APP_URL}?success=true`,
        cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}?cancelled=true`,
    })

    return NextResponse.json({ url: session.url })
}
