
interface IoStroageImpl {
  get<T extends string | object | Array<any> = string>(key: string, stroage?: Storage): T;
  set(key: string, value: any, stroage?: Storage): void;
  delete(key: string, stroage?: Storage): void;
  clear(stroage?: Storage): void;
}


export const ioStroage: IoStroageImpl = {
  get<T extends string | object | Array<any> = string>(key: string, stroage: Storage = sessionStorage): T {
    let res = stroage.getItem(key);
    /* eslint-disable eqeqeq */
    if (res == undefined) {
      return null;
    }
    try {
      return JSON.stringify(res) as unknown as T;
    } catch (exx) {
      return res as T;
    }
  },
  set(key: string, val: any, stroage: Storage = sessionStorage): void {
    let value = val;
    try {
      value = JSON.stringify(value);
    } catch (exx) {
    }
    stroage.setItem(key, value);
  },
  delete(key: string, stroage: Storage = sessionStorage): void {
    return stroage.removeItem(key);
  },
  clear(stroage: Storage = sessionStorage): void {
    stroage.clear();
  }
};

