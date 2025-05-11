import { Client, TokenBucketStore, TokenBucketConfig } from './types';

class MemoryStore implements TokenBucketStore {
  capacity!: number;
  timer!: number;
  refillRate!: number;

  clients = new Map<string, Client>();

  init({ capacity, refillRate, timer }: TokenBucketConfig) {
    this.capacity = capacity;
    this.refillRate = refillRate;
    this.timer = timer;
  }

  set(key: string, client: Client) {
    this.clients.set(key, client);
  }

  getClient(key: string) {
    let client = { tokens: this.capacity, lastRequest: new Date() };
    if (this.clients.has(key)) {
      //   skipcq: JS-0339
      client = this.clients.get(key)!;
    } else {
      this.set(key, client);
    }

    return client;
  }
}

export { MemoryStore };
