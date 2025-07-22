import { Client, SlidingWindowConfig, SlidingWindowStore } from './types';

class MemoryStore implements SlidingWindowStore {
  maxRequests!: number;
  windowSize!: number; // interval (e.g n requests in 1 minute window)

  clients = new Map<string, Client>();

  init({ maxRequests, windowSize }: SlidingWindowConfig) {
    this.maxRequests = maxRequests;
    this.windowSize = windowSize;
  }

  set(key: string, client: Client) {
    this.clients.set(key, client);
  }

  getClient(key: string) {
    let client: Client = { requests: [] };
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
