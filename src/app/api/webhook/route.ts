import { WebhookEvent } from '@clerk/nextjs/server'
import { headers } from 'next/headers'
import { NextResponse } from 'next/server'
import { Webhook } from 'svix'

import { createUser } from '@/lib/actions/user.actions'

export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET
  if (!WEBHOOK_SECRET) {
    console.error('❌ Error: WEBHOOK_SECRET is missing')
    return new Response('Error: Missing webhook secret', { status: 500 })
  }

  const wh = new Webhook(WEBHOOK_SECRET)
  const headerPayload = headers() // Không cần await

  const svix_id = headerPayload.get('svix-id')
  const svix_timestamp = headerPayload.get('svix-timestamp')
  const svix_signature = headerPayload.get('svix-signature')

  if (!svix_id || !svix_timestamp || !svix_signature) {
    console.error('❌ Error: Missing Svix headers')
    return new Response('Error: Missing Svix headers', { status: 400 })
  }

  const payload = await req.json()
  const body = JSON.stringify(payload)

  let evt: WebhookEvent
  try {
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature
    }) as WebhookEvent
  } catch (err) {
    console.error('❌ Error: Could not verify webhook:', err)
    return new Response('Error: Verification error', { status: 400 })
  }

  if (evt.type === 'user.created') {
    console.log('✅ User Created:', evt.data)
    const { email_addresses, id, image_url, username } = evt.data
    const user = await createUser({
      username: username!,
      name: username!,
      clerkId: id,
      email: email_addresses?.[0]?.email_address || '',
      avatar: image_url
    })
    return NextResponse.json({ message: 'OK', user })
  }

  return new Response('Webhook received', { status: 200 })
}
