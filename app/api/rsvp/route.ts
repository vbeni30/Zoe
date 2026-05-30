import { NextResponse } from 'next/server';
import { z } from 'zod';

import { sendRsvpDigestEmail } from '@/lib/rsvp-email';
import { addRsvp } from '@/lib/rsvp-storage';

const rsvpSchema = z.object({
  name: z.string().trim().min(1, 'Name is required').max(120),
  email: z.string().trim().email('Valid email is required').max(200),
  guests: z.enum(['1', '2', '3', '4', '5']),
  attending: z.enum(['yes', 'no', 'maybe']),
  dietary: z.string().trim().max(500).optional().default(''),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = rsvpSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? 'Invalid RSVP data' },
        { status: 400 },
      );
    }

    const allRsvps = await addRsvp(parsed.data);
    await sendRsvpDigestEmail(allRsvps);

    return NextResponse.json({
      success: true,
      total: allRsvps.length,
    });
  } catch (error) {
    console.error('RSVP submission failed:', error);

    const message =
      error instanceof Error && error.message.includes('Gmail credentials')
        ? 'Email is not configured on the server yet.'
        : 'Unable to submit RSVP right now. Please try again.';

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
