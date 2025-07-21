import Store from '../../types/store';

type Client = {
  tokens: number;
  lastRequest: Date;
};

type TokenBucketConfig = {
  capacity: number;
  refillRate: number;
  timer: number; // refill timer
};

interface TokenBucketStore
  extends Store<Client, TokenBucketConfig>,
    TokenBucketConfig {}

export { TokenBucketStore, TokenBucketConfig, Client };
