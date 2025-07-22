import { Request } from 'express';
import { MemoryStore } from './memory-store';
import { SlidingWindowConfig } from './types';
import { getIpAddress } from '../../helpers';

const store = new MemoryStore();

function makeRequest(req: Request) {
  const key = getIpAddress(req);

  const client = store.getClient(key);

  const now = new Date();

  // remove from request list
  // when the current time - the windowSize
  // is greater than the request timestamp
  while (
    client.requests.length &&
    client.requests[0].getTime() <= Math.abs(now.getTime() - store.windowSize)
  ) {
    client.requests.shift();
    store.set(key, client);
  }

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
