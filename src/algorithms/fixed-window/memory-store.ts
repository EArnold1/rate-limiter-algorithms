import { Client, FixedWindowConfig, FixedWindowStore } from './types';

class MemoryStore implements FixedWindowStore {
  maxRequests!: number;
  windowSize!: number; // interval (e.g n requests in 1 minute window)

  clients = new Map<string, Client>();

  init({ maxRequests, windowSize }: FixedWindowConfig) {
    this.maxRequests = maxRequests;
    this.windowSize = windowSize;
  }

  set(key: string, client: Client) {
    this.clients.set(key, client);
  }

  getClient(key: string) {
    let client: Client = { requests: 0, windowStart: new Date() };
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
