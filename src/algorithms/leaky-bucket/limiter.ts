import { MemoryStore } from './memory-store';
import { Client, LeakyBucketConfig } from './types';

const store = new MemoryStore();

function leak_bucket(key: string, data: Client) {
  const client = data;

  const now = new Date();
  const lastRequest = client.lastRequest;
  const elapsedTime = Math.abs(now.getTime() - lastRequest.getTime());
  const leakRate = store.leakRate;

  if (elapsedTime >= leakRate) {
    client.bucket -= 1;
    client.lastRequest = now;

    store.set(key, client);
  }
}

export function limiter(cfg: LeakyBucketConfig) {
  store.init(cfg);

  return {
    make_request: (key: string) => {
      const client = store.getClient(key);

      leak_bucket(key, client);

      store.set(key, {
        bucket: client.bucket + store.fillRate,
        lastRequest: new Date(),
      });

      // overflow
      if (client.bucket > store.capacity) {
        throw new Error('you have made too many requests');
      }
    },
  };
}
