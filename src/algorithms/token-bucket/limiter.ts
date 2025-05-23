import { MemoryStore } from './memory-store';
import { Client, TokenBucketConfig } from './types';

const store = new MemoryStore();

function refill(key: string, data: Client) {
  const client = data;

  const now = new Date();
  const lastRequest = client.lastRequest;
  const elapsedTime = Math.abs(now.getTime() - lastRequest.getTime());
  const timer = store.timer;

  if (elapsedTime >= timer) {
    const refilledTokens = Math.floor((elapsedTime * store.refillRate) / timer);
    client.tokens = Math.min(refilledTokens, store.capacity);
    store.set(key, client);
  }
}

export function limiter(cfg: TokenBucketConfig) {
  store.init(cfg);

  return {
    make_request: (key: string) => {
      const client = store.getClient(key);
      refill(key, client);

      if (client.tokens >= 1) {
        client.tokens -= 1;
        client.lastRequest = new Date();
        store.set(key, client);
      } else {
        throw new Error('you have made too many requests');
      }
    },
  };
}
