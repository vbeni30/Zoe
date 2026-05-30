import { Redis } from '@upstash/redis';
import { mkdir, readFile, writeFile } from 'fs/promises';
import path from 'path';

import type { RsvpEntry, RsvpFormPayload } from './rsvp-types';

const RSVPS_KEY = 'zoe-birthday-rsvps';
const DATA_FILE = path.join(process.cwd(), 'data', 'rsvps.json');

function getRedis(): Redis | null {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!url || !token) {
    return null;
  }

  return new Redis({ url, token });
}

async function readFromFile(): Promise<RsvpEntry[]> {
  try {
    const raw = await readFile(DATA_FILE, 'utf-8');
    const parsed = JSON.parse(raw) as RsvpEntry[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

async function writeToFile(entries: RsvpEntry[]): Promise<void> {
  await mkdir(path.dirname(DATA_FILE), { recursive: true });
  await writeFile(DATA_FILE, JSON.stringify(entries, null, 2), 'utf-8');
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
  } else {
    await writeToFile(all);
  }

  return all;
}
