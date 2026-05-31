import type { RsvpEntry } from './rsvp-types';

const WEB3FORMS_URL = 'https://api.web3forms.com/submit';

// Public client-side key from Web3Forms (safe to embed; tied to abigiya.gulelat@gmail.com).
const DEFAULT_WEB3FORMS_ACCESS_KEY = 'c35b1299-513f-4b9b-90f1-3a579365f603';

function getAccessKey(): string {
  return process.env.WEB3FORMS_ACCESS_KEY?.trim() || DEFAULT_WEB3FORMS_ACCESS_KEY;
}

function attendingLabel(attending: RsvpEntry['attending']): string {
  if (attending === 'yes') return 'Yes';
  if (attending === 'no') return 'No';
  return 'Maybe';
}

function buildGuestListText(rsvps: RsvpEntry[]): string {
  return rsvps
    .map(
      (rsvp, index) =>
        `${index + 1}. ${rsvp.name} | ${rsvp.email} | ${rsvp.guests} guest(s) | ${attendingLabel(rsvp.attending)} | ${new Date(rsvp.submittedAt).toLocaleString()}`,
    )
    .join('\n');
}

export async function sendRsvpDigestEmail(rsvps: RsvpEntry[]): Promise<void> {
  const accessKey = getAccessKey();
  const latest = rsvps[rsvps.length - 1];

  const message = [
    `New RSVP from ${latest.name}`,
    '',
    'Latest response',
    `Name: ${latest.name}`,
    `Email: ${latest.email}`,
    `Attending: ${attendingLabel(latest.attending)}`,
    `Guests: ${latest.guests}`,
    '',
    `All RSVPs (${rsvps.length} total):`,
    buildGuestListText(rsvps),
  ].join('\n');

  const response = await fetch(WEB3FORMS_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'User-Agent': 'ZoeBirthdayRSVP/1.0',
    },
    body: JSON.stringify({
      access_key: accessKey,
      subject: `Zoe's Birthday RSVP #${rsvps.length}: ${latest.name}`,
      from_name: "Zoe's Birthday RSVP",
      name: latest.name,
      email: latest.email,
      replyto: latest.email,
      attending: attendingLabel(latest.attending),
      guests: latest.guests,
      botcheck: false,
      message,
    }),
  });

  const raw = await response.text();

  let result: { success?: boolean; message?: string } = {};
  try {
    result = JSON.parse(raw) as { success?: boolean; message?: string };
  } catch {
    console.error('Web3Forms non-JSON response:', raw.slice(0, 200));
    throw new Error('Email service returned an unexpected response. Please try again.');
  }

  if (!response.ok || !result.success) {
    throw new Error(result.message ?? 'Email service rejected the submission');
  }
}
