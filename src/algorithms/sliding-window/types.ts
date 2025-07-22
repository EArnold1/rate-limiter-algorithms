import Store from '../../types/store';

type SlidingWindowConfig = {
  maxRequests: number;
  windowSize: number; // interval
};

type Client = {
  requests: Array<Date>;
};

interface SlidingWindowStore
  extends Store<Client, SlidingWindowConfig>,
    SlidingWindowConfig {}

export { SlidingWindowStore, SlidingWindowConfig, Client };
