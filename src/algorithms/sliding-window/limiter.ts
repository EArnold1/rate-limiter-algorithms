import { Request } from 'express';
import { MemoryStore } from './memory-store';
import { SlidingWindowConfig } from './types';
import { getIpAddress } from '../../helpers';

const store = new MemoryStore();

function makeRequest(req: Request) {
  const key = getIpAddress(req);

  const client = store.getClient(key);

  const now = new Date();

  // filter out request timestamps outside the current window
  client.requests = client.requests.filter(
    (timestamp) =>
      timestamp.getTime() >= Math.abs(now.getTime() - store.windowSize)
  );

  store.set(key, client);

  if (client.requests.length >= store.maxRequests) {
    throw new Error('you have made too many requests');
  } else {
    client.requests.push(now);
    store.set(key, client);
  }
}

export function limiter(cfg: SlidingWindowConfig) {
  store.init(cfg);

  return { makeRequest };
}
