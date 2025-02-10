import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { WebhookEvent } from '@clerk/nextjs/server'
import { createUser } from '@/lib/actions/user.actions'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET
  console.log('------WEBHOOK_SECRET: ', WEBHOOK_SECRET);

  if (!WEBHOOK_SECRET) {
    throw new Error('Error: Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local')
  }

  // Create new Svix instance with secret
  const wh = new Webhook(WEBHOOK_SECRET)

  // Get headers
  const headerPayload = await headers()
  console.log('------headerPayload: ', headerPayload);
  const svix_id = headerPayload.get('svix-id')
  const svix_timestamp = headerPayload.get('svix-timestamp')
  const svix_signature = headerPayload.get('svix-signature')

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error: Missing Svix headers', {
      status: 400,
    })
  }

  // Get body
  const payload = await req.json()
  const body = JSON.stringify(payload)

  let evt: WebhookEvent

  // Verify payload with headers
  try {
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    }) as WebhookEvent
  } catch (err) {
    console.error('Error: Could not verify webhook:', err)
    return new Response('Error: Verification error', {
      status: 400,
    })
  }
  
  // Do something with payload
  if (evt.type === 'user.created') {
    console.log('--------Event type: ', evt.type)
    const {
      email_addresses: emailAddress,
      id,
      image_url: imageURL,
      username,
    } = evt.data
    const user = await createUser({
      username: username!,
      name: username!,
      clerkId: id,
      email: emailAddress[0].email_address || '',
      avatar: imageURL
    })
    console.log('--------User created: ', user)
    return NextResponse.json({ 
      message: "OK",
      user
    })
  }

  return new Response('Webhook received', { status: 200 })
}