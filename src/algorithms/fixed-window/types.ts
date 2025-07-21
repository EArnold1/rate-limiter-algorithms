import Store from '../../types/store';

type FixedWindowConfig = {
  maxRequests: number;
  windowSize: number; // interval
};

type Client = {
  requests: number;
  windowStart: Date;
};

interface FixedWindowStore
  extends Store<Client, FixedWindowConfig>,
    FixedWindowConfig {}

export { FixedWindowStore, FixedWindowConfig, Client };
