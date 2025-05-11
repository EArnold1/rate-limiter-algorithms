import Store from '../../types/store';

type Client = {
  tokens: number;
  lastRequest: Date;
};

type TokenBucketConfig = {
  capacity: number;
  refillRate: number;
  timer: number;
};

interface TokenBucketStore extends Store<Client, TokenBucketConfig> {
  capacity: number;
  timer: number;
  refillRate: number;
}

export { TokenBucketStore, TokenBucketConfig, Client };
