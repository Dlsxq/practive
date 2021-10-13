

const eventMaps = new Map<string, Set<Function>>()
const eventMap = new Map<string, (...args: any) => unknown>();
export function globalEventListener(type: string, listener: (...args: any) => unknown) {

  let set = eventMaps.get(type);
  if (!set) {
    eventMaps.set(type, (set = new Set()))
  }
  set.add(listener);
  return function unListener() {
    set?.delete(listener);
    eventMaps.set(type, set as Set<Function>)
  }
}

export function globalEventListenerOne(type: string, listener: (...args: any) => unknown) {
  eventMap.set(type, listener);
}

export function globalEventGetListener(type: string) {
  return eventMaps.get(type)
}

export function globalEventGetListenerOne(type: string) {
  return eventMap.get(type)
}

export function globalEventEmit(type: string, ...args: any) {
  eventMaps.get(type)?.forEach(listener => listener(...args));
}