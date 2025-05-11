interface Store<T, U> {
  clients: Map<string, T>;

  init: (cfg: U) => void;

  set: (key: string, client: T) => void;
  getClient: (key: string) => T;
}

export default Store;
