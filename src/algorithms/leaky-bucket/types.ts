import Store from '../../types/store';

type LeakyBucketConfig = {
  capacity: number; // bucket max
  leakRate: number; // units per second
  fillRate?: number; // units per second
};

type Client = {
  bucket: number;
  lastRequest: Date;
};

interface LeakyBucketStore
  extends Store<Client, LeakyBucketConfig>,
    LeakyBucketConfig {}

export { Client, LeakyBucketConfig, LeakyBucketStore };
