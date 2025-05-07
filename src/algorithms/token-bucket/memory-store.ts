import { Client, Store, TokenBucketConfig } from './types';

class MemoryStore implements Store {
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

  //   make_request(key: string) {
  //     const now = new Date();
  //     const client = this.getClient(key);

  //     const lastRequest = client.lastRequest;
  //     const diff = Math.abs(now.getTime() - lastRequest.getTime());

  //     const minutes = Math.floor(diff / 1000 / 60);

  //     const timer = this.timer / 60000;

  //     if (minutes >= timer) {
  //       const refilledTokens = Math.floor((minutes * this.refillRate) / timer);

  //       client.tokens += Math.min(refilledTokens, this.capacity);

  //       this.set(key, client);
  //     }

  //     if (client.tokens >= 1) {
  //       client.tokens -= 1;
  //       client.lastRequest = now;

  //       this.set(key, client);
  //     } else {
  //       throw new Error('you have made too many requests');
  //     }
  //   }

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
