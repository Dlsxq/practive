


export function push(key: string, value: unknown) {
  globalThis.sessionStorage.setItem(key, JSON.stringify(value));
}

export function remove(key: string) {
  globalThis.sessionStorage.removeItem(key);
}

export function getSession(key: string) {
  try {
    let r = globalThis.sessionStorage.getItem(key);

    if (r !== null || r !== "null") {
      return JSON.parse(r);
    }
    return null;
  } catch (err) {
    return globalThis.sessionStorage.getItem(key);
  }
}