

interface StorageItfe {

}


const s = {
  f1: "afdasfasf",
  f2: {

  }
};

interface StateField {
  parent: StateField;
  // [], {} Map, Set,
  // key => subKeys;
  state: Map<unknown, StateField>;
  stateType: unknown;
  prevValue: unknown;
  listeners: Set<Function>;
  originalKey: unknown;
  subKeys:Set<unknown>;

  deleteSub();
  delete();
  has();
  findKey();
  subscribe();
  clear();
  get();
  set();
  toJson();
}



interface StateControll {
  subscribe();
  append();
  clear();
  put();
  delete();
  get();
  request(): Promise<unknown>;
  has();
  forEach();
  initialize();
}


interface StreamChannel {
  pip();
  read();
  write();
}