type LeakyBucketConfig = {
  capacity: number; // bucket max
  leakRate: number; // units per second
  fillRate?: number; // units per second
};

type Client = {
  bucket: number;
  lastRequest: Date;
};

interface Store {
  capacity: number;
  leakRate: number;
  fillRate?: number;

  clients: Map<string, Client>;

  init: (cfg: LeakyBucketConfig) => void;

  set: (key: string, client: Client) => void;
  getClient: (key: string) => Client;
}

export { Client, LeakyBucketConfig, Store };
