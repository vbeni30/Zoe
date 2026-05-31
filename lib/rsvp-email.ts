import type { RsvpEntry } from './rsvp-types';

const WEB3FORMS_URL = 'https://api.web3forms.com/submit';

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
  const accessKey = process.env.WEB3FORMS_ACCESS_KEY;
  const notifyEmail = process.env.RSVP_NOTIFICATION_EMAIL;

  if (!accessKey) {
    throw new Error('Web3Forms access key is not configured (WEB3FORMS_ACCESS_KEY)');
  }

  if (!notifyEmail) {
    throw new Error('RSVP notification email is not configured (RSVP_NOTIFICATION_EMAIL)');
  }

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
    },
    body: JSON.stringify({
      access_key: accessKey,
      to: notifyEmail,
      subject: `Zoe's Birthday RSVP #${rsvps.length}: ${latest.name}`,
      from_name: "Zoe's Birthday RSVP",
      name: latest.name,
      email: latest.email,
      replyto: latest.email,
      attending: attendingLabel(latest.attending),
      guests: latest.guests,
      message,
    }),
  });

  const result = (await response.json()) as { success?: boolean; message?: string };

  if (!response.ok || !result.success) {
    throw new Error(result.message ?? 'Web3Forms submission failed');
  }
}
