import { Redis } from '@upstash/redis';
import { mkdir, readFile, writeFile } from 'fs/promises';
import path from 'path';

import type { RsvpEntry, RsvpFormPayload } from './rsvp-types';

const RSVPS_KEY = 'zoe-birthday-rsvps';

function getDataFile(): string {
  // Vercel serverless only allows writes under /tmp.
  if (process.env.VERCEL) {
    return path.join('/tmp', 'rsvps.json');
  }

  return path.join(process.cwd(), 'data', 'rsvps.json');
}

function getRedis(): Redis | null {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!url || !token) {
    return null;
  }

  return new Redis({ url, token });
}

async function readFromFile(): Promise<RsvpEntry[]> {
  const dataFile = getDataFile();

  try {
    const raw = await readFile(dataFile, 'utf-8');
    const parsed = JSON.parse(raw) as RsvpEntry[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

async function writeToFile(entries: RsvpEntry[]): Promise<void> {
  const dataFile = getDataFile();
  await mkdir(path.dirname(dataFile), { recursive: true });
  await writeFile(dataFile, JSON.stringify(entries, null, 2), 'utf-8');
}

export async function getAllRsvps(): Promise<RsvpEntry[]> {
  const redis = getRedis();

  if (redis) {
    const data = await redis.get<RsvpEntry[]>(RSVPS_KEY);
    return data ?? [];
  }

  return readFromFile();
}

export async function addRsvp(payload: RsvpFormPayload): Promise<RsvpEntry[]> {
  const entry: RsvpEntry = {
    ...payload,
    id: crypto.randomUUID(),
    submittedAt: new Date().toISOString(),
  };

  const all = await getAllRsvps();
  all.push(entry);

  const redis = getRedis();
  if (redis) {
    await redis.set(RSVPS_KEY, all);
    return all;
  }

  try {
    await writeToFile(all);
    return all;
  } catch (error) {
    console.error('RSVP file storage failed:', error);
    // Still return the new entry so email can be sent on serverless.
    return [entry];
  }
}
