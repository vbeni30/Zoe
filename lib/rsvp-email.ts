import nodemailer from 'nodemailer';

import type { RsvpEntry } from './rsvp-types';

const NOTIFY_EMAIL = process.env.RSVP_NOTIFY_EMAIL ?? 'abenidemiss300@gmail.com';

function escapeHtml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function attendingLabel(attending: RsvpEntry['attending']): string {
  if (attending === 'yes') return 'Yes';
  if (attending === 'no') return 'No';
  return 'Maybe';
}

function buildEmailHtml(rsvps: RsvpEntry[]): string {
  const rows = rsvps
    .map(
      (rsvp, index) => `
        <tr>
          <td style="padding:10px 12px;border-bottom:1px solid #fce7f3;text-align:center;">${index + 1}</td>
          <td style="padding:10px 12px;border-bottom:1px solid #fce7f3;">${escapeHtml(rsvp.name)}</td>
          <td style="padding:10px 12px;border-bottom:1px solid #fce7f3;">${escapeHtml(rsvp.email)}</td>
          <td style="padding:10px 12px;border-bottom:1px solid #fce7f3;text-align:center;">${escapeHtml(rsvp.guests)}</td>
          <td style="padding:10px 12px;border-bottom:1px solid #fce7f3;">${attendingLabel(rsvp.attending)}</td>
          <td style="padding:10px 12px;border-bottom:1px solid #fce7f3;">${escapeHtml(rsvp.dietary || '—')}</td>
          <td style="padding:10px 12px;border-bottom:1px solid #fce7f3;white-space:nowrap;">${new Date(rsvp.submittedAt).toLocaleString()}</td>
        </tr>
      `,
    )
    .join('');

  const latest = rsvps[rsvps.length - 1];

  return `
    <div style="font-family:Georgia,serif;color:#334155;max-width:900px;margin:0 auto;">
      <h1 style="color:#be185d;font-weight:400;margin-bottom:8px;">Zoe's First Birthday RSVPs</h1>
      <p style="margin-top:0;color:#64748b;">
        New response from <strong>${escapeHtml(latest.name)}</strong>.
        Full guest list below (${rsvps.length} total).
      </p>
      <table style="width:100%;border-collapse:collapse;background:#fff;border:1px solid #fbcfe8;border-radius:12px;overflow:hidden;">
        <thead>
          <tr style="background:#fdf2f8;">
            <th style="padding:12px;text-align:left;font-size:12px;letter-spacing:0.08em;text-transform:uppercase;color:#be185d;">#</th>
            <th style="padding:12px;text-align:left;font-size:12px;letter-spacing:0.08em;text-transform:uppercase;color:#be185d;">Name</th>
            <th style="padding:12px;text-align:left;font-size:12px;letter-spacing:0.08em;text-transform:uppercase;color:#be185d;">Email</th>
            <th style="padding:12px;text-align:left;font-size:12px;letter-spacing:0.08em;text-transform:uppercase;color:#be185d;">Guests</th>
            <th style="padding:12px;text-align:left;font-size:12px;letter-spacing:0.08em;text-transform:uppercase;color:#be185d;">Attending</th>
            <th style="padding:12px;text-align:left;font-size:12px;letter-spacing:0.08em;text-transform:uppercase;color:#be185d;">Dietary</th>
            <th style="padding:12px;text-align:left;font-size:12px;letter-spacing:0.08em;text-transform:uppercase;color:#be185d;">Submitted</th>
          </tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
    </div>
  `;
}

export async function sendRsvpDigestEmail(rsvps: RsvpEntry[]): Promise<void> {
  const gmailUser = process.env.GMAIL_USER;
  const gmailAppPassword = process.env.GMAIL_APP_PASSWORD;

  if (!gmailUser || !gmailAppPassword) {
    throw new Error('Gmail credentials are not configured');
  }

  const latest = rsvps[rsvps.length - 1];
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: gmailUser,
      pass: gmailAppPassword,
    },
  });

  await transporter.sendMail({
    from: `"Zoe Birthday RSVP" <${gmailUser}>`,
    to: NOTIFY_EMAIL,
    subject: `Zoe's Birthday RSVP #${rsvps.length}: ${latest.name} (${rsvps.length} on the list)`,
    html: buildEmailHtml(rsvps),
  });
}
