import { NextResponse } from 'next/server';
import { z } from 'zod';

import { sendRsvpDigestEmail } from '@/lib/rsvp-email';
import { addRsvp } from '@/lib/rsvp-storage';
import type { RsvpEntry } from '@/lib/rsvp-types';

const rsvpSchema = z.object({
  name: z.string().trim().min(1, 'Name is required').max(120),
  email: z.string().trim().email('Valid email is required').max(200),
  guests: z.enum(['1', '2', '3', '4', '5']),
  attending: z.enum(['yes', 'no', 'maybe']),
});

function isMissingAccessKey(error: unknown): boolean {
  return (
    error instanceof Error &&
    error.message.includes('WEB3FORMS_ACCESS_KEY')
  );
}

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

    let allRsvps: RsvpEntry[];

    try {
      allRsvps = await addRsvp(parsed.data);
    } catch (storageError) {
      console.error('RSVP storage failed:', storageError);
      allRsvps = [
        {
          ...parsed.data,
          id: crypto.randomUUID(),
          submittedAt: new Date().toISOString(),
        },
      ];
    }

    await sendRsvpDigestEmail(allRsvps);

    return NextResponse.json({
      success: true,
      total: allRsvps.length,
    });
  } catch (error) {
    console.error('RSVP submission failed:', error);

    const message = isMissingAccessKey(error)
      ? 'RSVP email is not configured on the server yet.'
      : error instanceof Error
        ? error.message
        : 'Unable to submit RSVP right now. Please try again.';

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
