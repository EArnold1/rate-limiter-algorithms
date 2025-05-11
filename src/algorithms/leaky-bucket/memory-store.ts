import { Client, LeakyBucketConfig, LeakyBucketStore } from './types';

class MemoryStore implements LeakyBucketStore {
  capacity!: number;
  leakRate!: number;
  fillRate = 1; // for each request fill by 1

  clients = new Map<string, Client>();

  init({ capacity, leakRate, fillRate }: LeakyBucketConfig) {
    this.capacity = capacity;
    this.leakRate = leakRate;

    if (fillRate) {
      this.fillRate = fillRate;
    }
  }

  set(key: string, client: Client) {
    this.clients.set(key, client);
  }

  getClient(key: string) {
    let client: Client = { bucket: 0, lastRequest: new Date() };
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
