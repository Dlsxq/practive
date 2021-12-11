

export function call(func?:(...args) => any, ...args) {
  if (typeof func !== "function") {
    return;
  }
  return func(...args);
}