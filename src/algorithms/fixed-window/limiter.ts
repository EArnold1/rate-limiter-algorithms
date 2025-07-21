import { Request } from 'express';
import { MemoryStore } from './memory-store';
import { FixedWindowConfig } from './types';
import { getIpAddress } from '../../helpers';

const store = new MemoryStore();

function makeRequest(req: Request) {
  const key = getIpAddress(req);

  const client = store.getClient(key);

  const now = new Date();

  const isWithinWindowInterval =
    Math.abs(now.getTime() - client.windowStart.getTime()) <= store.windowSize;

  if (!isWithinWindowInterval) {
    client.requests = 0;
    client.windowStart = now;
    store.set(key, client);
  }

  if (client.requests >= store.maxRequests)
    throw new Error('you have made too many requests');

  client.requests += 1;
  store.set(key, client);
}

export function limiter(cfg: FixedWindowConfig) {
  store.init(cfg);

  return { makeRequest };
}
