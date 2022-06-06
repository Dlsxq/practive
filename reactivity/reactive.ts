import { trggire, trick } from "./effect";



export type Dict<T = unknown> = {
  [p: string | number]: T;
}



export function reactive(objects: Dict) {

  return createReactiveObjects(objects);
}



const effectProxyHandler: ProxyHandler<any> = {

  get(target, key, receire) {
    // tick
    let nextValue = Reflect.get(target, key, receire);

    nextValue = createReactiveObjects(nextValue);

    trick(target, key);
    return nextValue;
  },
  set(target, key, nextValue, receire) {
    // trggire

    let oldValue = Reflect.get(target, key);

    nextValue = createReactiveObjects(nextValue);
    Reflect.set(target, key, nextValue, receire);

    trggire(target, key, nextValue, oldValue);
    return true;
  }
};


const proxyMapInstce = new Map();

function createReactiveObjects(objects: Dict) {

  if (typeof objects !== "object") {
    return objects;
  }

  if (proxyMapInstce.has(objects)) {
    return proxyMapInstce.get(objects);
  }

  let proxyObject = new Proxy(objects, effectProxyHandler);

  proxyMapInstce.set(objects, proxyObject);

  return proxyObject;
}