type Client = {
  tokens: number;
  lastRequest: Date;
};

type TokenBucketConfig = {
  capacity: number;
  refillRate: number;
  timer: number;
};

interface Store {
  capacity: number;
  timer: number;
  refillRate: number;

  clients: Map<string, Client>;

  init: (cfg: TokenBucketConfig) => void;

  set: (key: string, client: Client) => void;
  getClient: (key: string) => Client;
}

export { Store, TokenBucketConfig, Client };
