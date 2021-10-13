

export function read(key: string) {
  return localStorage.getItem(key)
}


export function write(key: string, val: any) {
  return localStorage.setItem(key, val)
}